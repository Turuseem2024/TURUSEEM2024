// Importación del tipo Metadata desde Next.js para definir los metadatos de la página
import type { Metadata } from "next"

// Importación del componente de navegación pública (barra de navegación visible para usuarios sin autenticación)
import { PublicNavbar } from "@/components/public-navbar"

// Importación del componente que permite al usuario consultar su turno con base en su número de cédula
import AppointmentChecker from "@/components/appointment-checker"

// Definición de los metadatos para esta página en particular, útiles para SEO y etiquetas de la pestaña del navegador
export const metadata: Metadata = {
  title: "Consulta de Turno | Sistema de Gestión de Turnos", // Título que aparecerá en la pestaña del navegador
  description: "Consulte el estado de su turno ingresando su número de cédula", // Descripción corta que resume la funcionalidad de la página
}

// Componente principal que representa la página de consulta de turno
export default function ConsultaTurnoPage() {
  return (
    <>
      {/* Barra de navegación pública */}
      <PublicNavbar />

      {/* Contenido principal de la página */}
      <main className="pt-24 container mx-auto py-10">
        
        {/* Encabezado y descripción centrados */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Consulta de Turno</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Ingrese su número de cédula para verificar el estado de su turno médico. 
            Podrá consultar la fecha, hora y profesional asignado.
          </p>
        </div>

        {/* Componente de consulta de turno */}
        <div className="mt-10">
          <AppointmentChecker />
        </div>

        {/* Sección de ayuda o contacto, en caso de requerir asistencia adicional */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Si necesita ayuda adicional, comuníquese con nuestro centro de atención al cliente.</p>
          <p className="mt-2">Teléfono: (01) 234-5678 | Email: atencion@ejemplo.com</p>
        </div>
      </main>
    </>
  )
}
