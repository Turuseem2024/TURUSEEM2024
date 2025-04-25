// Importación de componentes necesarios
import Image from "next/image" // Importación del componente Image de Next.js para optimizar la carga de imágenes
import { AppSidebar } from "@/components/app-sidebar" // Sidebar personalizado que se muestra en la aplicación
import { Button } from "@/components/ui/button" // Componente de botón reutilizable
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Componentes para crear tarjetas
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar" // Componentes para configurar y mostrar el sidebar
import { ArrowRight, BookOpen, Layers, Target, Users } from "lucide-react" // Iconos para las tarjetas usando lucide-react

// Función principal que define la estructura de la página del Dashboard
export default function DashboardPage() {
  return (
    // SidebarProvider envuelve todo el contenido para proporcionar el contexto necesario para el Sidebar
    <SidebarProvider>
      {/* Componente Sidebar con su configuración */}
      <AppSidebar />
      {/* Componente SidebarInset que ajusta el contenido principal según el Sidebar */}
      <SidebarInset>
        {/* Main contiene el contenido principal de la página */}
        <main className="flex-1 p-6">
          {/* Contenedor principal con separación entre los elementos */}
          <div className="flex flex-col gap-6">

            {/* Sección de bienvenida al panel */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Bienvenido al Panel de Administración</h1>
              <p className="text-muted-foreground">Gestiona tu aplicación de manera eficiente desde un solo lugar</p>
            </div>

            {/* Logo e introducción de la aplicación */}
            <Card className="overflow-hidden">
              {/* Grid que ajusta el contenido según el tamaño de la pantalla */}
              <div className="md:grid md:grid-cols-2">
                {/* Sección izquierda con el logo y nombre de la plataforma */}
                <div className="flex items-center justify-center bg-primary/5 p-6 md:p-10">
                  <div className="flex flex-col items-center text-center">
                    {/* Componente Image para cargar la imagen del logo */}
                    <Image
                      src="/IMG/LOGOTURUSEEM.webp"
                      alt="Logo de la aplicación"
                      width={80}
                      height={80}
                      priority
                      className="h-20 w-20"
                    />
                    <h2 className="text-2xl font-bold">TURUSEEM</h2>
                    <p className="text-sm text-muted-foreground mt-1">Sistema de Gestión Integral</p>
                  </div>
                </div>

                {/* Sección derecha con contenido acerca de la plataforma */}
                <CardContent className="p-6 md:p-10">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Acerca de la Plataforma</h3>
                    <p>
                      TURUSEEM es una plataforma integral diseñada para optimizar la gestión de recursos, mejorar la
                      eficiencia operativa y proporcionar análisis detallados para la toma de decisiones.
                    </p>
                    <p>
                      Como administrador, tienes acceso completo a todas las funcionalidades y módulos del sistema,
                      permitiéndote configurar, monitorear y gestionar cada aspecto de la aplicación.
                    </p>
                    {/* Botón para explorar la documentación */}
                    <Button className="w-fit mt-2">
                      Explorar Documentación
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Sección con información sobre los módulos */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Tarjeta de módulos disponibles */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Módulos Disponibles</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">Gestión completa del sistema</p>
                </CardContent>
              </Card>
              {/* Tarjeta de usuarios registrados */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">Activos en la plataforma</p>
                </CardContent>
              </Card>
              {/* Tarjeta de objetivos cumplidos */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Objetivos Cumplidos</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">De las metas trimestrales</p>
                </CardContent>
              </Card>
              {/* Tarjeta de recursos disponibles */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recursos Disponibles</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">Guías y documentación</p>
                </CardContent>
              </Card>
            </div>

            {/* Descripción de los módulos */}
            <Card>
              <CardHeader>
                <CardTitle>Módulos del Sistema</CardTitle>
                <CardDescription>Descripción de los principales módulos disponibles en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Módulos del sistema: se genera dinámicamente un listado de módulos con su título, descripción e icono */}
                  {[
                    {
                      title: "Gestión de Usuarios",
                      description: "Administra usuarios, roles y permisos dentro del sistema.",
                      icon: Users,
                    },
                    {
                      title: "Gestión de Productos",
                      description: "Catálogo completo, inventario y configuración de productos.",
                      icon: Layers,
                    },
                    {
                      title: "Reportes y Análisis",
                      description: "Visualización de datos y generación de informes personalizados.",
                      icon: BookOpen,
                    },
                    {
                      title: "Configuración del Sistema",
                      description: "Personalización y ajustes generales de la plataforma.",
                      icon: Target,
                    },
                    {
                      title: "Gestión de Clientes",
                      description: "Base de datos de clientes y gestión de relaciones.",
                      icon: Users,
                    },
                    {
                      title: "Herramientas Administrativas",
                      description: "Utilidades avanzadas para administradores del sistema.",
                      icon: Layers,
                    },
                  ].map((module, index) => (
                    <div key={index} className="flex flex-col gap-2 rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          <module.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-medium">{module.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sección de objetivos de la aplicación */}
            <Card>
              <CardHeader>
                <CardTitle>Objetivos de la Aplicación</CardTitle>
                <CardDescription>Propósitos principales que busca cumplir la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Se generan dinámicamente los objetivos */}
                  {[
                    {
                      title: "Optimización de Procesos",
                      description:
                        "Automatizar y mejorar la eficiencia de los procesos operativos, reduciendo tiempos y costos asociados.",
                    },
                    {
                      title: "Centralización de Información",
                      description:
                        "Unificar todos los datos relevantes en un solo sistema, facilitando el acceso y la gestión de la información.",
                    },
                    {
                      title: "Mejora en la Toma de Decisiones",
                      description:
                        "Proporcionar análisis detallados y en tiempo real para fundamentar decisiones estratégicas.",
                    },
                    {
                      title: "Experiencia de Usuario Mejorada",
                      description:
                        "Ofrecer una interfaz intuitiva y accesible que facilite la interacción con el sistema.",
                    },
                  ].map((objective, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">{objective.title}</h3>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
