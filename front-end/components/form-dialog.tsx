"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { X, Database } from "lucide-react"
import EntityForm from "./entity-form"

interface EntityConfig {
  name: string
  endpoint: string
  fields: {
    name: string
    label: string
    type: "number" | "select" | "textarea" | "text" | "hidden" | "date" | "checkbox" | "radio"
    disabled?: boolean
    hidden?: boolean
    required?: boolean
    minLength?: number
    options?: { value: string; label: string }[]
    icon?: React.ReactNode
    placeholder?: string
  }[]
  idField: string
  nameField: string
}

interface FormDialogProps {
  config: EntityConfig
  isOpen: boolean
  onClose: () => void
  buttonForm: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any
  updateTextButton: (text: string) => void
  getAllEntities: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedEntities?: Record<string, any[]>
  customTitle?: string
  customIcon?: React.ReactNode
  customFields?: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeSubmit?: (values: any) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterSubmit?: (response: any) => void
}

const FormDialog = ({
  config,
  isOpen,
  onClose,
  buttonForm,
  entity,
  updateTextButton,
  getAllEntities,
  stateButton,
  setStateButton,
  relatedEntities,
  customTitle,
  customIcon,
  customFields,
  beforeSubmit,
  afterSubmit,
}: FormDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gray-50 p-5 rounded-t-xl flex justify-between items-center border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center text-gray-800">
                {customIcon || <Database className="mr-2 h-5 w-5 text-gray-500" />}
                {customTitle || (buttonForm === "Enviar" ? `Registrar ${config.name}` : `Actualizar ${config.name}`)}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-100 rounded-lg p-2 transition-all"
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="p-6">
              <EntityForm
                config={config}
                buttonForm={buttonForm}
                entity={entity}
                updateTextButton={updateTextButton}
                getAllEntities={getAllEntities}
                stateButton={stateButton}
                setStateButton={setStateButton}
                onClose={onClose}
                relatedEntities={relatedEntities}
                customFields={customFields}
                beforeSubmit={beforeSubmit}
                afterSubmit={afterSubmit}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default FormDialog
