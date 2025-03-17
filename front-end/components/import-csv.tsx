"use client"

import type React from "react"

import { useState } from "react"
import clienteAxios from "@/lib/axios-config"

interface ImportCSVProps {
  onImportSuccess?: () => void
  apiEndpoint?: string
}

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

export default function ImportCSV({ onImportSuccess, apiEndpoint = "/api/aprendiz/import-csv" }: ImportCSVProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [alert, setAlert] = useState<{ message: string; error: boolean } | null>(null)

  // Obtener token para autenticación
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || ""
    }
    return ""
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setAlert(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      await clienteAxios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      })

      setAlert({
        message: "Archivo importado correctamente",
        error: false,
      })

      if (onImportSuccess) {
        onImportSuccess()
      }
    } catch (error) {
      const apiError = error as ApiError
      setAlert({
        message: apiError.response?.data?.message || "Error al importar el archivo",
        error: true,
      })
    } finally {
      setIsImporting(false)
      // Limpiar el input file
      if (event.target) {
        event.target.value = ""
      }
    }
  }

  return (
    <div className="space-y-4">
      {alert && (
        <div className={`p-4 rounded ${alert.error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {alert.message}
        </div>
      )}

      <button
        className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded relative ${isImporting ? "opacity-70 cursor-not-allowed" : ""}`}
        disabled={isImporting}
      >
        {isImporting ? (
          <>
            <span className="animate-spin inline-block mr-2">⟳</span>
            Importando...
          </>
        ) : (
          <>
            Seleccionar archivo CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </>
        )}
      </button>
    </div>
  )
}

