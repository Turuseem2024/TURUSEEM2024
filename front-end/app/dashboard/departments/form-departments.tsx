"use client"

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
import { Building2, Save, RefreshCw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

import clienteAxios from "@/lib/axios-config"

// Define el esquema de validación
const formSchema = z.object({
  Nom_Departamento: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
})

// Define los tipos
export interface Departamento {
  Id_Departamento: string
  Nom_Departamento: string
}

interface EntityConfig {
  name: string
  endpoint: string
  fields: {
    name: string
    label: string
    type: string
    disabled?: boolean
  }[]
  idField: string
  nameField: string
}

interface DepartmentFormProps {
  config: EntityConfig
  buttonForm: string
  departamento: Departamento
  updateTextButton: (text: string) => void
  getAllDepartamentos: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
  onClose?: () => void
}

interface AlertaProps {
  msg: string
  error: boolean
}

const DepartmentForm = ({
  config,
  buttonForm = "Enviar",
  departamento = { Id_Departamento: "", Nom_Departamento: "" },
  updateTextButton = () => {},
  getAllDepartamentos = () => {},
  stateButton = false,
  setStateButton = () => {},
  onClose,
}: DepartmentFormProps) => {
  const [alerta, setAlerta] = useState<AlertaProps | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Inicializa el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Nom_Departamento: "",
    },
  })

  // Actualiza el formulario cuando cambia el prop departamento
  useEffect(() => {
    if (departamento && Object.keys(departamento).length > 0) {
      form.reset({
        Nom_Departamento: departamento.Nom_Departamento || "",
      })
    }
  }, [departamento, form])

  // Maneja el envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const apiConfig = getConfig()
      let response
      let mensajeCRUD = ""

      if (buttonForm === "Actualizar") {
        // Para actualizar, usamos el ID que ya tenemos en el objeto departamento
        const dataToUpdate = {
          Id_Departamento: departamento.Id_Departamento,
          Nom_Departamento: values.Nom_Departamento,
        }
        response = await clienteAxios.put(`${config.endpoint}/${departamento.Id_Departamento}`, dataToUpdate, apiConfig)
        mensajeCRUD = `${config.name} actualizado exitosamente`
        setStateButton(true)
      } else {
        // Para crear, el backend generará el ID automáticamente
        response = await clienteAxios.post(config.endpoint, { Nom_Departamento: values.Nom_Departamento }, apiConfig)
        mensajeCRUD = `${config.name} creado exitosamente`
      }

      if (response.status === 200 || response.status === 201) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        })

        limpiarFormulario()
        getAllDepartamentos()
        updateTextButton("Enviar")

        // Cerrar el modal después de 1.5 segundos si la operación fue exitosa
        if (onClose) {
          setTimeout(() => {
            onClose()
          }, 1500)
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    form.reset({
      Nom_Departamento: "",
    })
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
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="Nom_Departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700 font-medium text-base">
                        <Building2 className="mr-2 h-5 w-5 text-gray-500" />
                        Nombre del Departamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el nombre del departamento"
                          className="rounded-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 py-2 px-4 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Mostramos el ID solo en modo de actualización y como texto informativo */}
              {buttonForm === "Actualizar" && departamento.Id_Departamento && (
                <motion.div variants={itemVariants} className="text-sm text-gray-500">
                  ID del departamento: {departamento.Id_Departamento}
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

export default DepartmentForm
