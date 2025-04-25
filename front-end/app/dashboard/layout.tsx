// Importamos los componentes necesarios desde diferentes módulos del proyecto.
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

// Definimos el componente `DashboarLayaout` que actúa como un layout general para el dashboard.
// Este componente recibe `children` como una propiedad, lo que permite anidar otros componentes dentro de él.

export default function DashboarLayaout({ children }: { children: ReactNode }) {
  return (
    // `SidebarProvider` provee el contexto para manejar el estado de la barra lateral en la aplicación.
    <SidebarProvider>
      {/* `AppSidebar` es el componente que representa la barra lateral de la aplicación. */}
      <AppSidebar />

      {/* `SidebarInset` es un contenedor que aloja el contenido principal del dashboard. */}
      <SidebarInset>
        {/* Header del dashboard, con estilos responsivos y elementos interactivos */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {/* `SidebarTrigger` es el botón que permite alternar la visibilidad de la barra lateral. */}
            <SidebarTrigger className="-ml-1" />

            {/* Separador vertical que ayuda a organizar visualmente los elementos del header. */}
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* Breadcrumbs (migajas de pan) para mostrar la navegación actual dentro del dashboard. */}
            <Breadcrumb>
              <BreadcrumbList>
                {/* Primer breadcrumb, oculto en pantallas pequeñas (se muestra a partir de `md`). */}
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Separador entre los breadcrumbs, también oculto en pantallas pequeñas. */}
                <BreadcrumbSeparator className="hidden md:block" />

                {/* Página actual dentro del breadcrumb. */}
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Contenedor principal del contenido del dashboard. */}
        <main className="min-h-screen bg-gray-50">
          {/* `children` representa el contenido dinámico que será renderizado dentro del layout. */}
          {children}
        </main>

        {/* Sección adicional con tarjetas de contenido y una caja expandible */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Contenedor con tarjetas dispuestas en un grid de tres columnas en pantallas medianas en adelante */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Tres tarjetas de aspecto visual, utilizadas para representar contenido gráfico o información */}
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>

          {/* Caja expandible que ocupa toda la altura disponible en pantallas pequeñas 
          y un tamaño mínimo en pantallas medianas en adelante */}
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
