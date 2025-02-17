"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ReactSession } from "react-client-session"
import { motion, AnimatePresence } from "framer-motion"

// ICONOS
import { GiNotebook, GiHumanPyramid } from "react-icons/gi"
import { BsFillPeopleFill } from "react-icons/bs"
import { IoDocumentText, IoLogOut, IoHome } from "react-icons/io5"
import { PiNotebookFill } from "react-icons/pi"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { FaClipboardCheck, FaPeopleGroup } from "react-icons/fa6"
import { MdAssignmentTurnedIn } from "react-icons/md"
import { TbUsersPlus } from "react-icons/tb"
import { HiMenuAlt2 } from "react-icons/hi"

import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"
import Alerta from "./Alerta"

const VerticalNav = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [user, setUser] = useState(null)
  const { cerrarSesion } = useAuth()
  const [alerta, setAlerta] = useState({})
  const location = useLocation()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = ReactSession.get("token")
        if (!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        const responseApi = await clienteAxios.get("/api/user/perfil", config)
        if (responseApi.status === 200) {
          setUser(responseApi.data)
        } else {
          setAlerta({ msg: "Error en la solicitud", error: true })
        }
      } catch (error) {
        console.error("Error al obtener el perfil de usuario:", error)
      }
    }

    fetchUserProfile()
  }, [])

  if (!user) return <div className="text-white text-center mt-10">Cargando...</div>

  const { msg } = alerta

  const navItems = [
    { to: "/admin", label: "Inicio", Icon: IoHome },
    { to: "aprendices", label: "Aprendiz", Icon: BsFillPeopleFill },
    { to: "turnos-especiales", label: "Turno Especial", Icon: MdAssignmentTurnedIn },
    { to: "memorandos", label: "Memorando", Icon: IoDocumentText },
    { to: "programa-formacion", label: "Programa", Icon: PiNotebookFill },
    { to: "unidades", label: "Unidad", Icon: SiHomeassistantcommunitystore },
    { to: "fichas", label: "Ficha", Icon: FaClipboardCheck },
    { to: "funcionarios", label: "Funcionario", Icon: FaPeopleGroup },
    { to: "talentohumano", label: "Talento Humano", Icon: GiHumanPyramid },
    { to: "inasistencias", label: "Inasistencia", Icon: GiNotebook },
    { to: "registrar", label: "Registrar Usuario", Icon: TbUsersPlus },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "240px" : "64px",
        }}
        className="fixed left-0 h-screen bg-[#1a237e] flex flex-col shadow-lg z-10"
        style={{ transition: "width 0.3s ease" }}
      >
        {/* Header con botón de toggle */}
        <div className="flex items-center h-16 px-2 border-b border-blue-800">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiMenuAlt2 className="text-white text-2xl" />
          </motion.button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2 flex items-center"
              >
                <motion.img
                  src="/IMG/LOGOTURUSEEM.png"
                  className="w-8 h-8"
                  alt="Logo"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="ml-2 text-white font-medium truncate">TURUSEEM</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-2 overflow-hidden">
          {navItems.map(({ to, label, Icon }) => (
            <Link key={to} to={to}>
              <motion.div
                className={`flex items-center px-3 py-2.5 mx-1.5 rounded-lg text-gray-100 hover:bg-blue-800 transition-colors ${
                  location.pathname === to ? "bg-blue-800" : ""
                }`}
                whileHover={{ x: 4, backgroundColor: "rgba(30, 64, 175, 0.6)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 200 }}>
                  <Icon className={`text-xl ${!isExpanded ? "mx-auto" : ""}`} />
                </motion.div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 text-sm whitespace-nowrap"
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Footer con botón de cerrar sesión */}
        <div className="border-t border-blue-800 p-2">
          <motion.button
            onClick={cerrarSesion}
            className={`flex items-center text-white hover:bg-red-600 rounded-lg p-2 w-full transition-colors ${
              !isExpanded ? "justify-center" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div whileHover={{ rotate: 10 }}>
              <IoLogOut className="text-xl" />
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 text-sm whitespace-nowrap"
                >
                  Cerrar Sesión
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        animate={{
          marginLeft: isExpanded ? "240px" : "64px",
        }}
        className="flex-1 p-6 transition-all duration-300"
      >
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        {/* Aquí va el contenido principal */}
      </motion.div>
    </div>
  )
}

export default VerticalNav

