"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import DepartmentCard from "./department-card"
import type { Departamento } from "@/app/dashboard/departments/form-departments"

interface DepartmentGridProps {
  departamentos: Departamento[]
  isLoading: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSelectDepartment: (departamento: Departamento) => void
}

const DepartmentGrid = ({
  departamentos,
  isLoading,
  searchTerm,
  setSearchTerm,
  onSelectDepartment,
}: DepartmentGridProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filtrar departamentos
  const filteredList = departamentos.filter(
    (dept) =>
      dept.Id_Departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.Nom_Departamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredList.length / itemsPerPage)

  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-600" />
          <span className="text-gray-600 font-medium">Cargando departamentos...</span>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 py-12">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          <span className="text-gray-600 font-medium">
            {searchTerm ? "No se encontraron resultados para la búsqueda" : "No hay departamentos registrados"}
          </span>
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="mt-2 text-gray-600 hover:text-gray-900 underline">
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {currentItems.map((departamento, index) => (
            <div
              key={departamento.Id_Departamento}
              onClick={() => onSelectDepartment(departamento)}
              className="cursor-pointer"
            >
              <DepartmentCard departamento={departamento} index={index} />
            </div>
          ))}
        </motion.div>
      )}

      {/* Paginación */}
      {!isLoading && filteredList.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 rounded-lg"
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
              })
              .map((page, index, array) => {
                const showEllipsis = index > 0 && array[index - 1] !== page - 1

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="flex items-center justify-center h-8 w-8">...</span>}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(page)}
                      className={`h-8 w-8 p-0 rounded-lg ${
                        currentPage === page ? "bg-black hover:bg-gray-800 text-white" : ""
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
              className="h-8 w-8 p-0 rounded-lg"
            >
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentGrid
