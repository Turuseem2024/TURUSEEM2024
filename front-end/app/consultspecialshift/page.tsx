import type { Metadata } from "next"
import SpecialAppointmentChecker from "@/components/special-appointment-checker"
import { PublicNavbar } from "@/components/public-navbar"

export const metadata: Metadata = {
  title: "Consulta de Turno Especial | Sistema de Gestión de Turnos",
  description: "Consulte el estado de su turno especial ingresando su número de cédula",
}

export default function ConsultaEspecialPage() {
  return (
    <>
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Consulta de Turno Especial</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Ingrese su número de cédula para verificar el estado de su turno médico especial. Los turnos especiales tienen
          prioridad y atención diferenciada.
        </p>
      </div>

      <div className="mt-10">
        <SpecialAppointmentChecker />
      </div>

      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Si necesita ayuda adicional con su turno especial, comuníquese con nuestra línea prioritaria.</p>
        <p className="mt-2">Teléfono: (01) 234-5678 ext. 123 | Email: prioritaria@ejemplo.com</p>
      </div>
    </div>
  </>
  )
}

