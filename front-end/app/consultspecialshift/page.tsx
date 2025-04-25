// Importación del tipo Metadata desde Next.js, usado para definir metadatos de la página
import type { Metadata } from "next"

// Importación del componente que permite consultar un turno especial mediante número de cédula
import SpecialAppointmentChecker from "@/components/special-appointment-checker"

// Definición de los metadatos de la página para mejorar el SEO y la accesibilidad
export const metadata: Metadata = {
  // Título que se mostrará en la pestaña del navegador y será usado por motores de búsqueda
  title: "Consulta de Turno Especial | Sistema de Gestión de Turnos",

  // Descripción de la página, también útil para motores de búsqueda
  description: "Consulte el estado de su turno especial ingresando su número de cédula",
}

// Componente principal que representa la página de consulta de turno especial
export default function ConsultaEspecialPage() {
  return (
    <>
      {/* Contenedor principal con márgenes automáticos y espaciado vertical */}
      <div className="container mx-auto py-10">

        {/* Sección centrada con título y descripción */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* Título principal de la página */}
          <h1 className="text-3xl font-bold tracking-tight">Consulta de Turno Especial</h1>

          {/* Descripción de ayuda para el usuario con estilo y ancho máximo */}
          <p className="text-muted-foreground max-w-[600px]">
            Ingrese su número de cédula para verificar el estado de su turno médico especial. Los turnos especiales tienen
            prioridad y atención diferenciada.
          </p>
        </div>

        {/* Componente que maneja la lógica de consulta del turno especial */}
        <div className="mt-10">
          <SpecialAppointmentChecker />
        </div>

        {/* Sección de contacto para soporte adicional, con espaciado y texto centrado */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Si necesita ayuda adicional con su turno especial, comuníquese con nuestra línea prioritaria.</p>
          <p className="mt-2">Teléfono: (01) 234-5678 ext. 123 | Email: prioritaria@ejemplo.com</p>
        </div>

      </div>
    </>
  )
}
