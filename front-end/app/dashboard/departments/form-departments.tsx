"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// Removed unused imports from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Define el esquema de validación
const formSchema = z.object({
  Id_Departamento: z.string().min(1, { message: "Debe seleccionar un departamento" }),
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
    try {
      let mensajeCRUD = ""

      if (buttonForm === "Actualizar") {
        console.log("Actualizando departamento:", values)
        setStateButton(true)
        mensajeCRUD = "Departamento actualizado exitosamente"
      } else {
        console.log("Creando departamento:", values)
        mensajeCRUD = "Departamento creado exitosamente"
      }

      setAlerta({
        msg: mensajeCRUD,
        error: false,
      })
      
      limpiarFormulario()
      getAllDepartamentos()
      updateTextButton("Enviar")

    } catch {
      setAlerta({
        msg: "Error al procesar la solicitud",
        error: true,
      })
    }
  }

  // Limpia el formulario
  const limpiarFormulario = () => {
    form.reset({
      Id_Departamento: "",
      Nom_Departamento: "",
    })
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-4xl">
        <CardContent className="pt-6">
          {alerta && (
            <Alert variant={alerta.error ? "destructive" : "default"} className="mb-4">
              {alerta.error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{alerta.msg}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Nom_Departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Departamento:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre del departamento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Id_Departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código del Departamento:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el código único"
                        {...field}
                        disabled={buttonForm === "Actualizar"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-around gap-2 pt-4">
                <Button type="submit" className="w-full sm:w-auto">
                  {buttonForm}
                </Button>
                {stateButton && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => {
                      limpiarFormulario()
                      updateTextButton("Enviar")
                    }}
                  >
                    Limpiar
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormDepartamentos