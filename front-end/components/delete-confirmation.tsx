"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertTriangle, Loader2, Trash } from "lucide-react"

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
}

interface DeleteConfirmationProps {
  config: EntityConfig
  isOpen: boolean
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
  customMessage?: string
  customTitle?: string
  customIcon?: React.ReactNode
}

const DeleteConfirmation = ({
  config,
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
  customMessage,
  customTitle,
  customIcon,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            {customIcon || <AlertTriangle className="h-8 w-8 text-red-600" />}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{customTitle || "Confirmar eliminación"}</h3>
          <p className="text-gray-600">
            {customMessage ||
              `¿Estás seguro de que deseas eliminar este ${config.name.toLowerCase()}? Esta acción no se puede deshacer.`}
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium"
          >
            Cancelar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium flex items-center"
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
  )
}

export default DeleteConfirmation
