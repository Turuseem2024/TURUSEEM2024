"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import EntityCard from "./entity-card"

interface EntityConfig {
  name: string
  endpoint: string
  fields: {
    name: string
    label: string
    type: string
    disabled?: boolean
    hidden?: boolean
  }[]
  idField: string
  nameField: string
  icon?: React.ReactNode
}

interface EntityGridProps {
  config: EntityConfig
  entities: any[]
  isLoading: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSelectEntity: (entity: any) => void
  customCard?: (entity: any, index: number) => React.ReactNode
  itemsPerPage?: number
}

const EntityGrid = ({
  config,
  entities,
  isLoading,
  searchTerm,
  setSearchTerm,
  onSelectEntity,
  customCard,
  itemsPerPage = 8,
}: EntityGridProps) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar entidades
  const filteredList = entities.filter((entity) => {
    return config.fields.some((field) => {
      if (field.hidden) return false
      const fieldValue = String(entity[field.name] || "").toLowerCase()
      return fieldValue.includes(searchTerm.toLowerCase())
    })
  })

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
          <span className="text-gray-600 font-medium">Cargando {config.name.toLowerCase()}s...</span>
        </div>
      ) : currentItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 py-12">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          <span className="text-gray-600 font-medium">
            {searchTerm
              ? "No se encontraron resultados para la búsqueda"
              : `No hay ${config.name.toLowerCase()}s registrados`}
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
          {currentItems.map((entity, index) => (
            <div key={entity[config.idField]} onClick={() => onSelectEntity(entity)} className="cursor-pointer">
              {customCard ? (
                customCard(entity, index)
              ) : (
                <EntityCard config={config} entity={entity} index={index} onClick={() => onSelectEntity(entity)} />
              )}
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

export default EntityGrid
