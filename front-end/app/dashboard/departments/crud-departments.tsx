"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import clienteAxios from "@/lib/axios-config"
import FormDepartamentos from "@/app/dashboard/departments/form-departments"
import Alerta from "@/components/alert"
import {
  FileUp,
  Plus,
  Loader2,
  AlertTriangle,
  Pencil,
  Trash,
  X,
  Building,
  Database,
  FileSpreadsheet,
  FileJson,
  FileIcon as FilePdf,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Interfaces
interface Departamento {
  Id_Departamento: string
  Nom_Departamento: string
}

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
    status?: number
  }
  message?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export default function CrudDepartamentos() {
  // Estados
  const [departamentoList, setDepartamentoList] = useState<Departamento[]>([])
  const [filteredList, setFilteredList] = useState<Departamento[]>([])
  const [buttonForm, setButtonForm] = useState("Enviar")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [alerta, setAlerta] = useState<{
    msg: string
    error: boolean
    action?: () => void
    actionText?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [stateButton, setStateButton] = useState(true)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [departamentoToDelete, setDepartamentoToDelete] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Estado para el departamento seleccionado
  const [departamento, setDepartamento] = useState<Departamento>({
    Id_Departamento: "",
    Nom_Departamento: "",
  })

  // Obtener token para autenticación
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || ""
    }
    return ""
  }

  // Configuración para las peticiones
  const getConfig = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  }

  // Resetear el formulario
  const resetForm = () => {
    setDepartamento({
      Id_Departamento: "",
      Nom_Departamento: "",
    })
  }

  // Filtrar departamentos
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredList(departamentoList)
    } else {
      const filtered = departamentoList.filter(
        (dept) =>
          dept.Id_Departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.Nom_Departamento.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredList(filtered)
    }
    setCurrentPage(1)
  }, [searchTerm, departamentoList])

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredList.length / itemsPerPage)

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Obtener todos los departamentos
  const getAllDepartamentos = async () => {
    setIsLoading(true)
    const config = getConfig()

    try {
      const response = await clienteAxios.get<Departamento[]>("/departamento", config)

      if (response.status === 200 || response.status === 204) {
        setDepartamentoList(response.data || [])
        setFilteredList(response.data || [])
      } else {
        setAlerta({
          msg: "Error al cargar los registros",
          error: true,
          action: getAllDepartamentos,
          actionText: "Reintentar",
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar los registros",
        error: true,
        action: getAllDepartamentos,
        actionText: "Reintentar",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener un departamento específico
  const getDepartamento = async (Id_Departamento: string) => {
    setButtonForm("Actualizar")
    const config = getConfig()

    try {
      const response = await clienteAxios.get<Departamento>(`/departamento/${Id_Departamento}`, config)

      if (response.status === 200) {
        setDepartamento(response.data)
        setIsDialogOpen(true)
        setStateButton(false)
      } else {
        setAlerta({
          msg: "Error al cargar el registro",
          error: true,
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar el registro",
        error: true,
      })
    }
  }

  // Confirmar eliminación
  const confirmDelete = (Id_Departamento: string) => {
    setDepartamentoToDelete(Id_Departamento)
    setDeleteConfirmOpen(true)
  }

  // Eliminar un departamento
  const deleteDepartamento = async () => {
    if (!departamentoToDelete) return

    setIsDeleting(true)
    const config = getConfig()

    try {
      const response = await clienteAxios.delete(`/departamento/${departamentoToDelete}`, config)

      if (response.status === 200) {
        await getAllDepartamentos()
        setAlerta({
          msg: "Registro eliminado correctamente",
          error: false,
        })
      } else {
        setAlerta({
          msg: "Error al eliminar el registro",
          error: true,
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg:
          error.response?.data?.message || "No se puede eliminar este registro porque está asociado a otros registros",
        error: true,
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmOpen(false)
      setDepartamentoToDelete(null)
    }
  }

  // Importar CSV
  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    const formData = new FormData()
    formData.append("file", file)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    }

    try {
      await clienteAxios.post(`${API_URL}/departamento/import-csv`, formData, config)

      setAlerta({
        msg: "Datos importados correctamente",
        error: false,
      })
      await getAllDepartamentos()
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al importar los datos",
        error: true,
      })
    } finally {
      setIsImporting(false)
      if (event.target) {
        event.target.value = ""
      }
    }
  }

  // Exportar a diferentes formatos
  const exportData = async (format: string) => {
    setIsExporting(true)
    try {
      let endpoint = ""
      let filename = ""
      let mimeType = ""

      switch (format) {
        case "excel":
          endpoint = "/departamento/export-excel"
          filename = "Departamentos.xlsx"
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          break
        case "csv":
          endpoint = "/departamento/export-csv"
          filename = "Departamentos.csv"
          mimeType = "text/csv"
          break
        case "pdf":
          endpoint = "/departamento/export-pdf"
          filename = "Departamentos.pdf"
          mimeType = "application/pdf"
          break
        case "sql":
          endpoint = "/departamento/export-sql"
          filename = "Departamentos.sql"
          mimeType = "application/sql"
          break
        default:
          throw new Error("Formato no soportado")
      }

      const response = await clienteAxios.get(endpoint, { ...getConfig(), responseType: 'blob' })
      const blob = new Blob([response.data], { type: mimeType })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setAlerta({
        msg: `Datos exportados correctamente en formato ${format.toUpperCase()}`,
        error: false,
      })
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || `Error al exportar los datos en formato ${format}`,
        error: true,
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Actualizar el texto del botón
  const updateTextButton = (text: string) => {
    setButtonForm(text)
  }

  // Cargar los departamentos al montar el componente
  useEffect(() => {
    getAllDepartamentos()
  }, [])

  // Enfocar el campo de búsqueda cuando se presiona Ctrl+F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#4D7C0F] to-[#65a30d] p-6 rounded-2xl shadow-sm mb-8 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-3">
          <Building size={32} className="text-white" />
          <h1 className="font-semibold text-4xl md:text-4xl text-center text-white">
            Gestionar <span className="text-lime-200">Departamentos</span>
          </h1>
        </div>
      </motion.div>

      {alerta && <Alerta alerta={alerta} setAlerta={setAlerta} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm"
      >
        <div className="w-full md:w-auto">
          <h2 className="font-medium text-lg text-gray-700 mb-3 flex items-center">
            <FileUp className="mr-2 text-lime-700" size={20} />
            Subir Archivo CSV
          </h2>
          <div className="flex items-center gap-2">
            <label
              htmlFor="csvFileInput"
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-5 rounded-full cursor-pointer flex items-center transition-all ${
                isImporting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <FileUp className="mr-2 h-4 w-4" />
                  Seleccionar archivo
                </>
              )}
            </label>
            <input
              id="csvFileInput"
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
              disabled={isImporting}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-700 text-white px-5 py-3 rounded-full hover:bg-lime-800 font-medium flex items-center justify-center transition-all shadow-sm"
            onClick={() => {
              resetForm()
              setButtonForm("Enviar")
              setStateButton(true)
              setIsDialogOpen(true)
            }}
          >
            <Plus className="mr-2 h-5 w-5" />
            Nuevo Departamento
          </motion.button>

          <TooltipProvider>
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 text-gray-800 px-5 py-3 rounded-full hover:bg-gray-300 font-medium flex items-center justify-center transition-all shadow-sm"
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Exportando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Exportar
                    </>
                  )}
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="grid gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => exportData("excel")}
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                        <span>Excel</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exportar a Excel (.xlsx)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => exportData("csv")}
                      >
                        <FileText className="mr-2 h-4 w-4 text-blue-600" />
                        <span>CSV</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exportar a CSV (.csv)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => exportData("pdf")}
                      >
                        <FilePdf className="mr-2 h-4 w-4 text-red-600" />
                        <span>PDF</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exportar a PDF (.pdf)</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start font-normal"
                        onClick={() => exportData("sql")}
                      >
                        <FileJson className="mr-2 h-4 w-4 text-amber-600" />
                        <span>SQL</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exportar a SQL (.sql)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </PopoverContent>
            </Popover>
          </TooltipProvider>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 rounded-full border-gray-200"
          />
          {searchTerm && (
            <button
              type="button"
              title="Limpiar búsqueda"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 italic">
          Presiona <kbd className="px-2 py-1 bg-gray-100 rounded-md">Ctrl</kbd> +{" "}
          <kbd className="px-2 py-1 bg-gray-100 rounded-md">F</kbd> para buscar
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="overflow-hidden bg-white rounded-2xl shadow-sm"
      >
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-lime-700 to-lime-600 text-white">
              <th className="py-4 px-6 text-left rounded-tl-2xl font-medium">Código</th>
              <th className="py-4 px-6 text-left font-medium">Nombre</th>
              <th className="py-4 px-6 text-left rounded-tr-2xl font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-12">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-lime-600" />
                    <span className="text-gray-600 font-medium">Cargando departamentos...</span>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                    <span className="text-gray-600 font-medium">
                      {searchTerm
                        ? "No se encontraron resultados para la búsqueda"
                        : "No hay departamentos registrados"}
                    </span>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="mt-2 text-lime-700 hover:text-lime-800 underline"
                      >
                        Limpiar búsqueda
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map((departamento) => (
                <motion.tr
                  key={departamento.Id_Departamento}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 border-b transition-colors"
                >
                  <td className="py-4 px-6 text-gray-700">{departamento.Id_Departamento}</td>
                  <td className="py-4 px-6 text-gray-700">{departamento.Nom_Departamento}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => getDepartamento(departamento.Id_Departamento)}
                              className="bg-lime-50 text-lime-700 p-2 rounded-full hover:bg-lime-100 transition-colors"
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar departamento</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => confirmDelete(departamento.Id_Departamento)}
                              className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors"
                              title="Eliminar"
                              disabled={isDeleting}
                            >
                              {isDeleting ? <Loader2 className="animate-spin" size={18} /> : <Trash size={18} />}
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar departamento</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        {!isLoading && filteredList.length > itemsPerPage && (
          <div className="flex justify-between items-center px-6 py-4 border-t">
            <div className="text-sm text-gray-500">
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredList.length)} de{" "}
              {filteredList.length} registros
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Mostrar primera, última y páginas cercanas a la actual
                  return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
                })
                .map((page, index, array) => {
                  // Agregar puntos suspensivos si hay saltos
                  const showEllipsis = index > 0 && array[index - 1] !== page - 1

                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && <span className="flex items-center justify-center h-8 w-8">...</span>}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(page)}
                        className={`h-8 w-8 p-0 rounded-full ${
                          currentPage === page ? "bg-lime-700 hover:bg-lime-800" : ""
                        }`}
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  )
                })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal de confirmación de eliminación */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
              <p className="text-gray-600">
                ¿Estás seguro de que deseas eliminar este departamento? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-full font-medium"
              >
                Cancelar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={deleteDepartamento}
                className="px-5 py-2 bg-red-600 text-white rounded-full font-medium flex items-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Eliminar
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de formulario */}
      <AnimatePresence>
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in duration-300"
            >
              <div className="bg-gradient-to-r from-lime-700 to-lime-600 text-white p-5 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-xl font-medium flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  {buttonForm === "Enviar" ? "Registrar Departamento" : "Actualizar Departamento"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDialogOpen(false)}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className="p-6">
                <FormDepartamentos
                  buttonForm={buttonForm}
                  departamento={departamento}
                  updateTextButton={updateTextButton}
                  getAllDepartamentos={getAllDepartamentos}
                  stateButton={stateButton}
                  setStateButton={setStateButton}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
