// Importación de componentes desde las rutas relativas de la aplicación
import { PublicNavbar } from "@/components/public-navbar" // Barra de navegación pública
import { HomeShowcase } from "@/components/home-showcase" // Sección principal de exhibición de la página de inicio
import { HomeContent } from "@/components/home-content" // Contenido adicional que se muestra en la página de inicio

// Definición de la función principal que renderiza la página
export default function YourPage() {
  return (
    <>
      {/* Renderiza la barra de navegación pública en la parte superior de la página */}
      <PublicNavbar />

      {/* Contenido principal de la página, con un margen superior (pt-24) */}
      <main className="pt-24">
        {/* Sección de exhibición principal, que generalmente contiene imágenes, llamadas a la acción o información destacada */}
        <HomeShowcase />

        {/* Contenido adicional de la página, que puede incluir información relevante o interactiva */}
        <HomeContent />
      </main>
    </>
  )
}
