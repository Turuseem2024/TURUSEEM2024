"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import clienteAxios from "@/lib/axios-config"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Building2, Hash, Save, RefreshCw, Loader2 } from "lucide-react"

// Define el esquema de validación
const formSchema = z.object({
  Id_Departamento: z.string().min(1, { message: "Debe ingresar un código de departamento" }),
  Nom_Departamento: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
})

// Define los tipos
interface Departamento {
  Id_Departamento: string
  Nom_Departamento: string
}

interface FormDepartamentosProps {
  buttonForm: string
  departamento: Departamento
  updateTextButton: (text: string) => void
  getAllDepartamentos: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
}

interface AlertaProps {
  msg: string
  error: boolean
}

const FormDepartamentos = ({
  buttonForm = "Enviar",
  departamento = { Id_Departamento: "", Nom_Departamento: "" },
  updateTextButton = () => {},
  getAllDepartamentos = () => {},
  stateButton = false,
  setStateButton = () => {},
}: FormDepartamentosProps) => {
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
      Id_Departamento: "",
      Nom_Departamento: "",
    },
  })

  // Actualiza el formulario cuando cambia el prop departamento
  useEffect(() => {
    if (departamento && Object.keys(departamento).length > 0) {
      form.reset({
        Id_Departamento: departamento.Id_Departamento || "",
        Nom_Departamento: departamento.Nom_Departamento || "",
      })
    }
  }, [departamento, form])

  // Maneja el envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const config = getConfig()
      let response
      let mensajeCRUD = ""

      if (buttonForm === "Actualizar") {
        response = await clienteAxios.put(`/departamento/${values.Id_Departamento}`, values, config)
        mensajeCRUD = "Departamento actualizado exitosamente"
        setStateButton(true)
      } else {
        response = await clienteAxios.post("/departamento", values, config)
        mensajeCRUD = "Departamento creado exitosamente"
      }

      if (response.status === 200 || response.status === 201) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        })

        limpiarFormulario()
        getAllDepartamentos()
        updateTextButton("Enviar")
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
    form.reset({
      Id_Departamento: "",
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
                  alerta.error ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"
                }`}
              >
                {alerta.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                <AlertDescription
                  className={`text-base font-medium ${alerta.error ? "text-red-700" : "text-green-700"}`}
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
                        <Building2 className="mr-2 h-5 w-5 text-lime-700" />
                        Nombre del Departamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el nombre del departamento"
                          className="rounded-xl border-gray-200 focus:border-lime-600 focus:ring-lime-600 py-6 px-4 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="Id_Departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700 font-medium text-base">
                        <Hash className="mr-2 h-5 w-5 text-lime-700" />
                        Código del Departamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el código único"
                          className="rounded-xl border-gray-200 focus:border-lime-600 focus:ring-lime-600 py-6 px-4 text-base"
                          {...field}
                          disabled={buttonForm === "Actualizar"}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 font-medium mt-1" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-around gap-3 pt-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-lime-700 hover:bg-lime-800 text-white flex items-center justify-center py-6 px-8 rounded-full transition-all shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        {buttonForm}
                      </>
                    )}
                  </Button>
                </motion.div>

                {stateButton && (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 py-6 px-8 rounded-full transition-all"
                      onClick={() => {
                        limpiarFormulario()
                        updateTextButton("Enviar")
                      }}
                    >
                      <RefreshCw className="mr-2 h-5 w-5" />
                      Limpiar
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormDepartamentos
