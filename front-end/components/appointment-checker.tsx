"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner" // Se importa el toast de sonner

// Define el esquema del formulario con validaciones
const formSchema = z.object({
  cedula: z
    .string()
    .min(6, { message: "La cédula debe tener al menos 6 caracteres" })
    .max(12, { message: "La cédula no puede tener más de 12 caracteres" })
    .regex(/^\d+$/, { message: "La cédula debe contener solo números" })
    .nonempty({ message: "La cédula es requerida" }),
})

// Define el tipo de turno
type Appointment = {
  id: string
  date: string
  time: string
  doctor: string
  specialty: string
  status: "pending" | "confirmed" | "cancelled"
}

export default function AppointmentChecker() {
  const [isLoading, setIsLoading] = useState(false)
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [notFound, setNotFound] = useState(false)

  // Inicializa el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cedula: "",
    },
  })

  // Función que maneja el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setAppointment(null)
    setNotFound(false)

    try {
      // Simula una llamada a una API con un retardo
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí iría la llamada real a la API para consultar el turno
      // const response = await fetch(`/api/appointments?cedula=${values.cedula}`)
      // const data = await response.json()

      // Para efectos del demo, se simula una respuesta según la cédula
      if (values.cedula === "123456789") {
        setAppointment({
          id: "APT-2023-001",
          date: "2023-12-15",
          time: "10:30 AM",
          doctor: "Dr. García Martínez",
          specialty: "Medicina General",
          status: "confirmed",
        })
      } else {
        setNotFound(true)
        toast.error("No se encontraron turnos", {
          description: "No hay turnos registrados para la cédula ingresada.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Ocurrió un error al consultar el turno. Intente nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Consulta de Turno</CardTitle>
        <CardDescription>Ingrese su número de cédula para consultar su turno</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su número de cédula" {...field} />
                  </FormControl>
                  <FormDescription>Ingrese solo números, sin puntos ni guiones.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Consultando...
                </>
              ) : (
                "Consultar Turno"
              )}
            </Button>
          </form>
        </Form>

        {appointment && (
          <div className="mt-6 p-4 border rounded-md bg-muted">
            <h3 className="font-medium text-lg mb-2">Información del Turno</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Número de turno:</span> {appointment.id}
              </p>
              <p>
                <span className="font-medium">Fecha:</span> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Hora:</span> {appointment.time}
              </p>
              <p>
                <span className="font-medium">Doctor:</span> {appointment.doctor}
              </p>
              <p>
                <span className="font-medium">Especialidad:</span> {appointment.specialty}
              </p>
              <p>
                <span className="font-medium">Estado:</span>{" "}
                <span
                  className={`font-medium ${
                    appointment.status === "confirmed"
                      ? "text-green-600"
                      : appointment.status === "cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {appointment.status === "confirmed"
                    ? "Confirmado"
                    : appointment.status === "cancelled"
                      ? "Cancelado"
                      : "Pendiente"}
                </span>
              </p>
            </div>
          </div>
        )}

        {notFound && (
          <div className="mt-6 p-4 border rounded-md bg-muted">
            <p className="text-center text-muted-foreground">No se encontraron turnos para la cédula ingresada.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Para más información, comuníquese con nuestro centro de atención.
      </CardFooter>
    </Card>
  )
}
