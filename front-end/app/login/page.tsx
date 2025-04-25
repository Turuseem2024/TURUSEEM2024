// Importamos el componente LoginForm desde la carpeta de componentes, 
// el cual contiene el formulario de inicio de sesión.
import { LoginForm } from "@/components/login-form"

// Importamos el componente PublicNavbar que representa la barra de navegación pública 
// que se mostrará en la parte superior de la página.
import { PublicNavbar } from "@/components/public-navbar"

// Definimos la función LoginPage que representa la página de inicio de sesión.
// Esta función se exporta como componente por defecto para que pueda ser utilizado en otras partes de la aplicación.
export default function LoginPage() {
  return (
    <>
      {/* Componente PublicNavbar que renderiza la barra de navegación pública */}
      <PublicNavbar />

      {/* Contenedor principal de la página con fondo atenuado (bg-muted),
          con un diseño flexible que asegura que el contenido se alinee
          en el centro y se distribuya correctamente en pantallas pequeñas y grandes. */}
      <div className="bg-muted flex min-h-screen flex-col items-center justify-start pt-32 p-6 md:p-10">
        
        {/* Contenedor específico para el formulario de inicio de sesión. 
            Limita el ancho máximo del formulario para que se vea adecuado en pantallas grandes y pequeñas. */}
        <div className="w-full max-w-sm md:max-w-3xl">
          
          {/* Componente LoginForm que contiene el formulario de inicio de sesión.
              Este formulario es donde los usuarios pueden ingresar sus credenciales para acceder a la aplicación. */}
          <LoginForm />
        </div>
      </div>
    </>
  )
}
