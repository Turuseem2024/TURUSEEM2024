"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, AlertTriangle, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import type { Departamento } from "@/app/dashboard/departments/form-departments"

interface DepartmentListProps {
  departamentos: Departamento[]
  isLoading: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

const DepartmentList = ({
  departamentos,
  isLoading,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
  isDeleting,
}: DepartmentListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="py-3 px-6 text-left rounded-tl-xl font-medium text-sm">Código</th>
              <th className="py-3 px-6 text-left font-medium text-sm">Nombre</th>
              <th className="py-3 px-6 text-right rounded-tr-xl font-medium text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-12">
                  <div className="flex justify-center items-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin text-gray-600" />
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
                        className="mt-2 text-gray-600 hover:text-gray-900 underline"
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
                  className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-700">{departamento.Id_Departamento}</td>
                  <td className="py-4 px-6 text-gray-700">{departamento.Nom_Departamento}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex space-x-3 justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onEdit(departamento.Id_Departamento)}
                              className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                              title="Editar"
                            >
                              <Pencil size={16} />
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
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => onDelete(departamento.Id_Departamento)}
                              className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors"
                              title="Eliminar"
                              disabled={isDeleting}
                            >
                              {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash size={16} />}
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
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
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
                className="h-8 w-8 p-0 rounded-lg"
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
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default DepartmentList
