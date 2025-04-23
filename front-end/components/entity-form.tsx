/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, RefreshCw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import clienteAxios from "@/lib/axios-config"

// Tipos genéricos para entidades
export interface EntityField {
  name: string
  label: string
  type: "text" | "select" | "number" | "date" | "hidden" | "textarea" | "checkbox" | "radio"
  required?: boolean
  minLength?: number
  options?: { value: string; label: string }[]
  icon?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  hidden?: boolean
}

export interface EntityConfig {
  name: string
  endpoint: string
  fields: EntityField[]
  idField: string
  nameField: string
}

interface EntityFormProps {
  config: EntityConfig
  buttonForm: string
  entity: any
  updateTextButton: (text: string) => void
  getAllEntities: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
  onClose?: () => void
  relatedEntities?: Record<string, any[]>
  customFields?: React.ReactNode
  beforeSubmit?: (values: any) => any
  afterSubmit?: (response: any) => void
}

interface AlertaProps {
  msg: string
  error: boolean
}

const EntityForm = ({
  config,
  buttonForm = "Enviar",
  entity = {},
  updateTextButton = () => {},
  getAllEntities = () => {},
  stateButton = false,
  setStateButton = () => {},
  onClose,
  relatedEntities = {},
  customFields,
  beforeSubmit,
  afterSubmit,
}: EntityFormProps) => {
  const [alerta, setAlerta] = useState<AlertaProps | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Crear esquema de validación dinámico basado en la configuración
  const createValidationSchema = () => {
    const schema: Record<string, z.ZodTypeAny> = {}

    config.fields.forEach((field) => {
      if (field.type === "hidden" || field.hidden) return

      let fieldSchema: z.ZodTypeAny = z.string()

      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodString).min(1, { message: `${field.label} es requerido` })
      } else {
        fieldSchema = fieldSchema.optional()
      }

      if (field.minLength && field.type === "text") {
        fieldSchema = (fieldSchema as z.ZodString).min(field.minLength, {
          message: `${field.label} debe tener al menos ${field.minLength} caracteres`,
        })
      }

      if (field.type === "number") {
        fieldSchema = z.preprocess((val) => (val === "" ? undefined : Number(val)), z.number().optional())
      }

      if (field.type === "checkbox") {
        fieldSchema = z.boolean().optional()
      }

      schema[field.name] = fieldSchema
    })

    return z.object(schema)
  }

  const formSchema = createValidationSchema()

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

  // Crear valores por defecto para el formulario
  const createDefaultValues = () => {
    const defaultValues: Record<string, any> = {}

    config.fields.forEach((field) => {
      if (field.type !== "hidden" && !field.hidden) {
        if (field.type === "checkbox") {
          defaultValues[field.name] = false
        } else if (field.type === "number") {
          defaultValues[field.name] = ""
        } else {
          defaultValues[field.name] = ""
        }
      }
    })

    return defaultValues
  }

  // Inicializa el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: createDefaultValues(),
  })

  // Actualiza el formulario cuando cambia la entidad
  useEffect(() => {
    if (entity && Object.keys(entity).length > 0) {
      const values: Record<string, any> = {}

      config.fields.forEach((field) => {
        if (field.type !== "hidden" && !field.hidden && entity[field.name] !== undefined) {
          values[field.name] = entity[field.name]
        }
      })

      form.reset(values)
    }
  }, [entity, form, config.fields])

  // Maneja el envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const apiConfig = getConfig()
      let response
      let mensajeCRUD = ""

      // Preparar datos para enviar
      let dataToSend = { ...values }

      // Aplicar transformaciones personalizadas si existen
      if (beforeSubmit) {
        dataToSend = beforeSubmit(dataToSend)
      }

      if (buttonForm === "Actualizar") {
        // Para actualizar, incluimos el ID
        dataToSend[config.idField] = entity[config.idField]

        response = await clienteAxios.put(`${config.endpoint}/${entity[config.idField]}`, dataToSend, apiConfig)
        mensajeCRUD = `${config.name} actualizado exitosamente`
        setStateButton(true)
      } else {
        // Para crear, el backend generará el ID autoincremental
        response = await clienteAxios.post(config.endpoint, dataToSend, apiConfig)
        mensajeCRUD = `${config.name} creado exitosamente`
      }

      if (response.status === 200 || response.status === 201) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        })

        form.reset(createDefaultValues())
        getAllEntities()
        updateTextButton("Enviar")

        // Ejecutar callback después del envío si existe
        if (afterSubmit) {
          afterSubmit(response)
        }

        // Cerrar el modal después de 1.5 segundos si la operación fue exitosa
        if (onClose) {
          setTimeout(() => {
            onClose()
          }, 1500)
        }
      }
    } catch (error: any) {
      setAlerta({
        msg: error.response?.data?.message || "Error al procesar la solicitud",
        error: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Limpia el formulario
  const limpiarFormulario = () => {
    form.reset(createDefaultValues())
  }

  // Animaciones para los campos del formulario
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Renderizar campo según su tipo
  const renderField = (field: EntityField) => {
    if (field.type === "hidden" || field.hidden) return null

    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel className="flex items-center text-gray-700 font-medium text-base">
              {field.icon}
              {field.label}
            </FormLabel>
            <FormControl>
              {field.type === "select" ? (
                <Select onValueChange={formField.onChange} defaultValue={formField.value} value={formField.value}>
                  <SelectTrigger className="rounded-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 py-2 px-4 text-base">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {relatedEntities[field.name]?.map((option: any) => (
                      <SelectItem key={option[config.idField]} value={option[config.idField]}>
                        {option[config.nameField]}
                      </SelectItem>
                    ))}
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <textarea
                  className="rounded-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 py-2 px-4 text-base w-full"
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  {...formField}
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  className="rounded border-gray-200 text-black focus:ring-gray-300"
                  disabled={field.disabled}
                  checked={formField.value}
                  onChange={(e) => formField.onChange(e.target.checked)}
                />
              ) : field.type === "number" ? (
                <Input
                  type="number"
                  placeholder={field.placeholder}
                  className="rounded-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 py-2 px-4 text-base"
                  disabled={field.disabled}
                  {...formField}
                />
              ) : (
                <Input
                  placeholder={field.placeholder}
                  className="rounded-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 py-2 px-4 text-base"
                  disabled={field.disabled}
                  {...formField}
                />
              )}
            </FormControl>
            <FormMessage className="text-red-500 font-medium mt-1" />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl shadow-sm border-0 overflow-hidden">
        <CardContent className="pt-6">
          {alerta && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                variant={alerta.error ? "destructive" : "default"}
                className={`mb-6 rounded-xl ${
                  alerta.error ? "bg-red-50 border border-red-100" : "bg-emerald-50 border border-emerald-100"
                }`}
              >
                {alerta.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
                <AlertDescription
                  className={`text-base font-medium ${alerta.error ? "text-red-700" : "text-emerald-700"}`}
                >
                  {alerta.msg}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              {config.fields.map((field) => (
                <motion.div key={field.name} variants={itemVariants}>
                  {renderField(field)}
                </motion.div>
              ))}

              {customFields && <motion.div variants={itemVariants}>{customFields}</motion.div>}

              {/* Mostramos el ID solo en modo de actualización y como texto informativo */}
              {buttonForm === "Actualizar" && entity[config.idField] && (
                <motion.div variants={itemVariants} className="text-sm text-gray-500">
                  ID: {entity[config.idField]}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                {stateButton && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 py-2 px-4 rounded-lg transition-all"
                      onClick={() => {
                        limpiarFormulario()
                        updateTextButton("Enviar")
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Limpiar
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white flex items-center justify-center py-2 px-4 rounded-lg transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {buttonForm}
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EntityForm
