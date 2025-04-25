// Importamos React, que es necesario para trabajar con hooks como useState y useEffect.
import * as React from "react"

// Definimos un valor constante para el punto de ruptura de dispositivos móviles. 
// Si el ancho de la ventana es menor a este valor, se considera un dispositivo móvil.
const MOBILE_BREAKPOINT = 768

// Definimos el hook personalizado useIsMobile que se encarga de determinar si el dispositivo actual es móvil.
export function useIsMobile() {
  // Creamos un estado llamado 'isMobile' que almacenará un valor booleano que indica si el dispositivo es móvil o no.
  // Inicializamos 'isMobile' como undefined para esperar el primer cálculo de la condición.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Usamos useEffect para ejecutar el código que determina si el dispositivo es móvil.
  React.useEffect(() => {
    // Utilizamos window.matchMedia para crear un objeto MediaQueryList 
    // que escucha los cambios en el ancho de la ventana, específicamente cuando es menor que el valor del MOBILE_BREAKPOINT.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Definimos una función 'onChange' que actualizará el estado de 'isMobile' cada vez que cambie el tamaño de la ventana.
    const onChange = () => {
      // Verificamos el ancho de la ventana usando window.innerWidth y lo comparamos con el MOBILE_BREAKPOINT.
      // Si el ancho de la ventana es menor que el punto de ruptura, consideramos que es un dispositivo móvil.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Agregamos un escuchador de eventos que ejecuta la función 'onChange' cada vez que cambie el ancho de la ventana.
    mql.addEventListener("change", onChange)

    // Establecemos el estado de 'isMobile' al realizar el primer cálculo en el momento en que el componente se monta.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Retornamos una función de limpieza que elimina el escuchador de eventos cuando el componente se desmonta.
    return () => mql.removeEventListener("change", onChange)
  }, []) // La dependencia vacía [] asegura que useEffect se ejecute solo una vez, cuando el componente se monte.

  // Devolvemos un valor booleano que indica si el dispositivo es móvil.
  // La doble negación (!!) convierte el valor de 'isMobile' en un booleano explícito (true o false).
  return !!isMobile
}
