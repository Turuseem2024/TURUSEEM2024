"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Define el schema de validación
const formSchema = z.object({
  Id_Municipio: z.string().min(1, { message: "El ID del municipio es requerido" }),
  Nom_Municipio: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  Id_Departamento: z.string().min(1, { message: "Debe seleccionar un departamento" }),
})

// Tipos de datos
interface Departamento {
  Id_Departamento: string
  Nom_Departamento: string
}

interface Municipio {
  Id_Municipio?: string
  Nom_Municipio?: string
  Id_Departamento?: string
}

interface FormMunicipiosProps {
  buttonForm: string
  municipio: Municipio
  updateTextButton: (text: string) => void
  getAllMunicipios: () => void
  stateButton: boolean
  // Removed setStateButton as it is unused
}

interface AlertaProps {
  msg: string
  error: boolean
}

const FormMunicipios = ({
  buttonForm = "Enviar",
  municipio = {},
  updateTextButton = () => {},
  getAllMunicipios = () => {},
  stateButton = false,
}: Omit<FormMunicipiosProps, "setStateButton">) => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [alerta, setAlerta] = useState<AlertaProps | null>(null)

  // Inicializar formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Id_Municipio: "",
      Nom_Municipio: "",
      Id_Departamento: "",
    },
  })

  // Obtener departamentos al montar el componente
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        // Datos de ejemplo - Reemplazar con API real
        const sampleData = [
          { Id_Departamento: "1", Nom_Departamento: "Antioquia" },
          { Id_Departamento: "2", Nom_Departamento: "Cundinamarca" },
          { Id_Departamento: "3", Nom_Departamento: "Santander" },
        ]
        setDepartamentos(sampleData)
      } catch (error) {
        console.error("Error obteniendo departamentos:", error)
      }
    }
    fetchDepartamentos()
  }, [])

  // Establecer datos cuando cambia el prop municipio
  useEffect(() => {
    if (municipio && Object.keys(municipio).length > 0) {
      form.reset({
        Id_Municipio: municipio.Id_Municipio || "",
        Nom_Municipio: municipio.Nom_Municipio || "",
        Id_Departamento: municipio.Id_Departamento || "",
      })
    }
  }, [municipio, form])

  // Manejar envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let mensajeCRUD = ""
      
      // Simular llamada API
      if (buttonForm === "Actualizar") {
        console.log("Actualizando municipio:", values)
        mensajeCRUD = "Municipio actualizado exitosamente"
      } else {
        console.log("Creando municipio:", values)
        mensajeCRUD = "Municipio creado exitosamente"
      }

      setAlerta({ msg: mensajeCRUD, error: false })
      clearForm()
      getAllMunicipios()
      updateTextButton("Enviar")

    } catch {
      setAlerta({
        msg: "Error al procesar la solicitud",
        error: true,
      })
    }
  }

  // Limpiar formulario
  const clearForm = () => {
    form.reset({
      Id_Municipio: "",
      Nom_Municipio: "",
      Id_Departamento: "",
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
                name="Id_Municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Municipio:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="ID único del municipio"
                        {...field}
                        disabled={buttonForm === "Actualizar"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Nom_Municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Municipio:</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ej: Medellín"
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
                    <FormLabel>Departamento:</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || undefined}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departamentos.map((departamento) => (
                          <SelectItem 
                            key={departamento.Id_Departamento} 
                            value={departamento.Id_Departamento}
                          >
                            {departamento.Nom_Departamento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      clearForm()
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

export default FormMunicipios