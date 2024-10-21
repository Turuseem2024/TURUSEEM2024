/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    ".node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: "#F3F4F6",
        sidebar: "#000000",
        botones: "#2b23ff",
        botoneshover: "#2318ea",
        stone: {
          400: "#000000",
        },
        gray: {
          500: "#000000",
          800: "#455d88", //Boton modulos Seleccionar Archivo
          600: "#000000",
        },
      },
      textColor: {
        link: "#2b23ff",
        black: "#000000",
        gray: "#ffffff",
        
        
      },
      borderColor: {
        green: "#ffffff"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
