// Importa la librería axios para realizar peticiones HTTP
import axios from "axios"

// Configura una instancia personalizada de axios para reutilizar la configuración en varias peticiones
const clienteAxios = axios.create({
  // Define la URL base para todas las peticiones HTTP. Si no se encuentra la variable de entorno, se utiliza la URL predeterminada.
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  
  // Establece los encabezados comunes para todas las peticiones. En este caso, se especifica que los datos enviados están en formato JSON.
  headers: {
    "Content-Type": "application/json", // Especifica el tipo de contenido de la solicitud
  },
})

// Añade un interceptor a las peticiones para incluir el token de autorización
clienteAxios.interceptors.request.use(
  (config) => {
    // Verifica si se está ejecutando en el navegador (no en el servidor) y obtiene el token almacenado en el localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    
    // Si se encuentra el token, lo agrega a los encabezados de la petición como un token Bearer
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Retorna la configuración modificada para que la petición continúe con los cambios
    return config
  },
  
  // Maneja los errores que puedan ocurrir al configurar la petición
  (error) => {
    // Si ocurre un error, lo rechaza y lo pasa al siguiente manejador de errores
    return Promise.reject(error)
  },
)

// Exporta la instancia de axios configurada para su uso en otras partes de la aplicación
export default clienteAxios
