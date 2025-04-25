// Importamos la librería axios, que permite realizar solicitudes HTTP
import axios from "axios";

/**
 * Creamos una instancia personalizada de Axios llamada 'clienteAxios'.
 * Esta instancia se utiliza para realizar solicitudes HTTP hacia un servidor backend.
 * 
 * - `axios.create()` permite configurar parámetros globales como la URL base, 
 *   encabezados, tiempo de espera, interceptores, etc.
 * 
 * - `baseURL`: define la URL base que se antepondrá a todas las rutas utilizadas con esta instancia.
 *   Se obtiene desde las variables de entorno del proyecto (`import.meta.env.NEXT_PUBLIC_BACKEND_URL`),
 *   lo que permite mantener el código flexible y adaptable a distintos entornos (desarrollo, producción, etc.).
 */
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.NEXT_PUBLIC_BACKEND_URL}` // URL base del backend definida en variables de entorno
});

// Exportamos la instancia clienteAxios para que pueda ser utilizada en otros archivos del proyecto
export default clienteAxios;
