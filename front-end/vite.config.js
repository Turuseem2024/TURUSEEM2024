import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // Importamos 'path' para poder resolver rutas absolutas

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agregamos la sección 'resolve' para definir alias
  resolve: {
    alias: {
      // Se configura el alias '@' para apuntar a la carpeta 'src'
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
