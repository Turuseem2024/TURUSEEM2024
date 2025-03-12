import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // Importamos 'path' para poder resolver rutas absolutas

// ------------------------
import tailwindcss from "@tailwindcss/vite"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Agregamos la sección 'resolve' para definir alias
  resolve: {
    alias: {
      // Se configura el alias '@' para apuntar a la carpeta 'src'
      '@': path.resolve(__dirname, 'src'), //en shadcn ui aparece doble comilla, aca la tengo com comilla simple
    },
  },
})
