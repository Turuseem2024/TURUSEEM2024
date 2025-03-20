import type { Metadata } from "next"
import { PublicNavbar } from "@/components/public-navbar"
import AppointmentChecker from "@/components/appointment-checker"

export const metadata: Metadata = {
  title: "Consulta de Turno | Sistema de Gestión de Turnos",
  description: "Consulte el estado de su turno ingresando su número de cédula",
}

export default function ConsultaTurnoPage() {
  return (
    <>
      <PublicNavbar />
      <main className="pt-24 container mx-auto py-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Consulta de Turno</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Ingrese su número de cédula para verificar el estado de su turno médico. Podrá consultar la fecha, hora y profesional asignado.
          </p>
        </div>
        <div className="mt-10">
          <AppointmentChecker />
        </div>
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Si necesita ayuda adicional, comuníquese con nuestro centro de atención al cliente.</p>
          <p className="mt-2">Teléfono: (01) 234-5678 | Email: atencion@ejemplo.com</p>
        </div>
      </main>
    </>
  )
}
