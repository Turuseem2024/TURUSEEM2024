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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User2, Save, RefreshCw, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

import clienteAxios from "@/lib/axios-config"

// Esquema de validación
const formSchema = z.object({
  Tipo_Usuario: z.enum(['Talento Humano', 'Usuario Normal']),
  Nom_User: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  Ape_User: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  Genero_User: z.enum(['Masculino', 'Femenino']),
  Email_User: z.string().email({ message: "Correo electrónico inválido" }),
  Tel_User: z.string().min(8, { message: "El teléfono debe tener al menos 8 dígitos" }),
  Password_User: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).optional(),
  confirmado: z.boolean(),
  Est_User: z.enum(['ACTIVO', 'INACTIVO'])
})

// Tipos
export interface User {
  Id_User: string
  Tipo_Usuario: 'Talento Humano' | 'Usuario Normal'
  Nom_User: string
  Ape_User: string
  Genero_User: 'Masculino' | 'Femenino'
  Email_User: string
  Tel_User: string
  Password_User?: string
  confirmado: boolean
  Est_User: 'ACTIVO' | 'INACTIVO'
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

interface UserFormProps {
  config: EntityConfig
  buttonForm: string
  user: User
  updateTextButton: (text: string) => void
  getAllUsers: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
  onClose?: () => void
}

interface AlertaProps {
  msg: string
  error: boolean
}

const UserForm = ({
  config,
  buttonForm = "Enviar",
  user = {
    Id_User: "",
    Tipo_Usuario: 'Usuario Normal',
    Nom_User: "",
    Ape_User: "",
    Genero_User: 'Masculino',
    Email_User: "",
    Tel_User: "",
    Password_User: "",
    confirmado: false,
    Est_User: 'ACTIVO'
  },
  updateTextButton = () => {},
  getAllUsers = () => {},
  stateButton = false,
  setStateButton = () => {},
  onClose,
}: UserFormProps) => {
  const [alerta, setAlerta] = useState<AlertaProps | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || ""
    }
    return ""
  }

  const getConfig = () => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Tipo_Usuario: 'Usuario Normal',
      Nom_User: "",
      Ape_User: "",
      Genero_User: 'Masculino',
      Email_User: "",
      Tel_User: "",
      Password_User: "",
      confirmado: false,
      Est_User: 'ACTIVO'
    }
  })

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      form.reset({
        ...user,
        Password_User: "" // No mostrar contraseña existente
      })
    }
  }, [user, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const apiConfig = getConfig()
      let response
      const userData = {
        ...values,
        // Solo enviar contraseña si está en modo creación o si se modificó
        Password_User: buttonForm === "Actualizar" && !values.Password_User 
          ? undefined 
          : values.Password_User
      }

      if (buttonForm === "Actualizar") {
        response = await clienteAxios.put(
          `${config.endpoint}/${user.Id_User}`,
          userData,
          apiConfig
        )
        setStateButton(true)
      } else {
        response = await clienteAxios.post(
          config.endpoint,
          userData,
          apiConfig
        )
      }

      if (response.status === 200 || response.status === 201) {
        setAlerta({
          msg: `Usuario ${buttonForm === "Actualizar" ? 'actualizado' : 'creado'} exitosamente`,
          error: false
        })

        form.reset()
        getAllUsers()
        updateTextButton("Enviar")

        if (onClose) {
          setTimeout(() => onClose(), 1500)
        }
      }
    } catch (error: any) {
      setAlerta({
        msg: error.response?.data?.message || "Error al procesar la solicitud",
        error: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const limpiarFormulario = () => {
    form.reset({
      Tipo_Usuario: 'Usuario Normal',
      Nom_User: "",
      Ape_User: "",
      Genero_User: 'Masculino',
      Email_User: "",
      Tel_User: "",
      Password_User: "",
      confirmado: false,
      Est_User: 'ACTIVO'
    })
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl shadow-sm border-0 overflow-hidden">
        <CardContent className="pt-6">
          {alerta && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                variant={alerta.error ? "destructive" : "default"}
                className={`mb-6 rounded-xl ${
                  alerta.error ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
                }`}
              >
                {alerta.error ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
                <AlertDescription className={`text-base font-medium ${
                  alerta.error ? "text-red-700" : "text-emerald-700"
                }`}>
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
              {/* Campos del formulario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Tipo_Usuario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700 font-medium">
                          <User2 className="mr-2 h-5 w-5 text-gray-500" />
                          Tipo de Usuario
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Talento Humano">Talento Humano</SelectItem>
                            <SelectItem value="Usuario Normal">Usuario Normal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Nom_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Ape_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido del usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Genero_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Género</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione género" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Femenino">Femenino</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Email_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Tel_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="Número de teléfono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Password_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={buttonForm === "Actualizar" ? "Dejar en blanco para no cambiar" : ""}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="Est_User"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ACTIVO">Activo</SelectItem>
                            <SelectItem value="INACTIVO">Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="confirmado"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0 pt-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-700">
                          Cuenta confirmada
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              {buttonForm === "Actualizar" && user.Id_User && (
                <motion.div variants={itemVariants} className="text-sm text-gray-500">
                  ID de usuario: {user.Id_User}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex gap-3 pt-4">
                {stateButton && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      variant="outline"
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
                    disabled={isSubmitting}
                    className="bg-black hover:bg-gray-800 text-white"
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

export default UserForm