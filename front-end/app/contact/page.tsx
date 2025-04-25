// Importamos el componente ContactoPage desde la ruta "@/components/contact".
// Este componente es el que se va a renderizar en esta página específica.
import ContactoPage from "@/components/contact"

// Exportamos por defecto una función llamada 'Page'.
// Esta función representa una página dentro del enrutamiento del framework (por ejemplo, Next.js).
export default function Page() {
  // Retornamos el componente ContactoPage que será mostrado cuando se acceda a esta ruta.
  return <ContactoPage />
}
