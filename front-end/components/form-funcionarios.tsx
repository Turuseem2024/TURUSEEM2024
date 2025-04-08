"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Define the form schema with validation
const formSchema = z.object({
  Id_Funcionario: z
    .string()
    .min(7, { message: "El Documento No Puede Tener Menos de 7 Digitos" })
    .max(10, { message: "El Documento No Puede Tener Más de 10 Digitos" })
    .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números" }),
  Nom_Funcionario: z
    .string()
    .min(1, { message: "El Nombre Es Obligatorio" })
    .refine((val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val), { message: "El campo de Nombre solo debe contener letras" }),
  Ape_Funcionario: z
    .string()
    .min(1, { message: "El Apellido Es Obligatorio" })
    .refine((val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val), { message: "El campo de Apellido solo debe contener letras" }),
  Genero: z.string().min(1, { message: "El Género Es Obligatorio" }),
  Tel_Funcionario: z
    .string()
    .min(9, { message: "El Teléfono No puede tener menos de 9 Digitos" })
    .max(10, { message: "El Teléfono No puede tener más de 10 Digitos" })
    .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números" }),
  Estado: z.string().min(1, { message: "El Estado Es Obligatorio" }),
  Cargo: z.string().min(1, { message: "El Cargo Es Obligatorio" }),
})

type FormValues = z.infer<typeof formSchema>

interface Funcionario {
  Id_Funcionario: string
  Nom_Funcionario: string
  Ape_Funcionario: string
  Genero: string
  Tel_Funcionario: string
  Estado: string
  Cargo: string
}

interface FormFuncionariosProps {
  buttonForm: string
  funcionario: Partial<Funcionario>
  updateTextButton: (text: string) => void
  getAllFuncionarios: () => void
  stateButton: boolean
  setStateButton: (state: boolean) => void
}

export default function FormFuncionarios({
  buttonForm = "Enviar",
  funcionario = {},
  updateTextButton,
  getAllFuncionarios,
  stateButton = false,
  setStateButton,
}: FormFuncionariosProps) {
  const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(null)

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id_Funcionario: "",
      Nom_Funcionario: "",
      Ape_Funcionario: "",
      Genero: "",
      Tel_Funcionario: "",
      Estado: "",
      Cargo: "",
    },
  })

  // Set form data when funcionario changes
  useEffect(() => {
    if (funcionario && Object.keys(funcionario).length > 0) {
      form.reset({
        Id_Funcionario: funcionario.Id_Funcionario || "",
        Nom_Funcionario: funcionario.Nom_Funcionario || "",
        Ape_Funcionario: funcionario.Ape_Funcionario || "",
        Genero: funcionario.Genero || "",
        Tel_Funcionario: funcionario.Tel_Funcionario || "",
        Estado: funcionario.Estado || "",
        Cargo: funcionario.Cargo || "",
      })
    }
  }, [funcionario, form])

  // Clear form fields
  const clearForm = () => {
    form.reset({
      Id_Funcionario: "",
      Nom_Funcionario: "",
      Ape_Funcionario: "",
      Genero: "",
      Tel_Funcionario: "",
      Estado: "",
      Cargo: "",
    })
    setAlerta(null)
  }

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      const token = sessionStorage.getItem("token") // Using sessionStorage instead of ReactSession
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      let mensajeCRUD = ""
      let respuestApi

      if (buttonForm === "Actualizar") {
        respuestApi = await axios.put(`/api/funcionarios/${funcionario.Id_Funcionario}`, data, config)
        setStateButton(true)
        mensajeCRUD = "Funcionario actualizado correctamente!"
      } else if (buttonForm === "Enviar") {
        respuestApi = await axios.post(`/api/funcionarios`, data, config)
        mensajeCRUD = "Funcionario Registrado correctamente!"
      }

      if (respuestApi && (respuestApi.status === 201 || respuestApi.status === 200)) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        })
        clearForm()
        getAllFuncionarios()
        updateTextButton("Enviar")
      } else {
        setAlerta({
          msg: "Ha ocurrido un error!",
          error: true,
        })
      }
    } catch (error) {
      setAlerta({
        msg: "Ha ocurrido un error al procesar la solicitud",
        error: true,
      })
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-2xl px-8 pb-6 w-full max-w-4xl">
        {alerta && (
          <Alert className={`mb-4 ${alerta.error ? "bg-destructive/15" : "bg-green-100"}`}>
            {alerta.error ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={alerta.error ? "text-destructive" : "text-green-600"}>
              {alerta.msg}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form id="funcionarioForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Id_Funcionario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Documento Funcionario"
                      {...field}
                      disabled={buttonForm === "Actualizar"}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
                          field.onChange(value)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Nom_Funcionario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Ape_Funcionario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Apellidos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un Género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Tel_Funcionario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Teléfono"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
                          field.onChange(value)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un Estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un Cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Planta">Planta</SelectItem>
                        <SelectItem value="Contratista">Contratista</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <hr className="my-4" />

            <div className="flex flex-col sm:flex-row justify-around gap-2">
              <Button type="submit" className="w-full sm:w-auto">
                {buttonForm}
              </Button>

              {stateButton && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={clearForm}
                  className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-white"
                >
                  Limpiar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

