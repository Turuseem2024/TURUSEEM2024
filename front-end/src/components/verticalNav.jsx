import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { motion } from "framer-motion";

// ICONOS
import { GiNotebook, GiHumanPyramid } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoDocumentText, IoLogOut, IoHome } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaClipboardCheck, FaPeopleGroup } from "react-icons/fa6";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";

import clienteAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Alerta from "./Alerta.jsx";

const VerticalNav = () => {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null);
  const { cerrarSesion } = useAuth();
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = ReactSession.get("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        
        const responseApi = await clienteAxios.get("/api/user/perfil", config);
        if (responseApi.status === 200) {
          setUser(responseApi.data);
        } else {
          setAlerta({ msg: "Error en la solicitud", error: true });
        }
      } catch (error) {
        console.error("Error al obtener el perfil de usuario:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div className="text-white text-center mt-10">Cargando...</div>;

  const { msg } = alerta;

  return (
    <motion.div className="min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* NAVBAR SUPERIOR */}
      <div className="bg-gray-800 xl:hidden flex justify-between w-full p-6 items-center shadow-lg">
        <motion.img
          src="/IMG/LOGOTURUSEEM.png"
          className="hidden sm:block w-12 drop-shadow-2xl"
          alt="Logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ rotate: 360, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.8)" }}
        />
        <p className="text-2xl leading-6 text-white font-bold">TURUSEEM</p>
      </div>

      {/* SIDEBAR */}
      <motion.div
        className={`$ {show ? "translate-x-0" : "-translate-x-full"} transform xl:translate-x-0 ease-in-out transition-all duration-500 flex justify-center items-start h-full w-full sm:w-64 bg-gray-900 flex-col shadow-2xl`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LOGO ANIMADO */}
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <motion.img
            src="/IMG/LOGOTURUSEEM.png"
            className="w-12 drop-shadow-2xl"
            alt="Logo"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ rotate: 360, boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.9)" }}
          />
          <p className="text-3xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>

        {/* LINKS DE NAVEGACIÓN */}
        <div className="flex flex-col items-center w-full border-b border-gray-700 py-5 space-y-3">
          {[
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
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="w-full">
              <motion.button
                whileHover={{ scale: 1.1, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center w-full pl-3 py-2 text-white hover:bg-blue-600 rounded border-b border-gray-700 font-bold uppercase"
              >
                <Icon size={22} className="mr-2" />
                {label}
              </motion.button>
            </Link>
          ))}
        </div>

        {/* BOTÓN DE CERRAR SESIÓN */}
        <div className="flex flex-col items-center w-full border-b border-gray-700 py-5">
          <motion.button
            onClick={cerrarSesion}
            whileHover={{ scale: 1.1, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center w-full pl-3 py-2 text-white hover:bg-red-600 rounded border-b border-gray-700 font-bold uppercase"
          >
            {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
            <IoLogOut size={22} className="mr-2" /> Cerrar Sesión
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VerticalNav;
