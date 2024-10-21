import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

//ICONO DE INASISTENCIAS
import { GiNotebook } from "react-icons/gi";
//ICONO DE TALENTO HUMANO
import { GiHumanPyramid } from "react-icons/gi";

//Icons
import { BsFillPeopleFill } from "react-icons/bs";
import { IoDocumentText, IoLogOut,IoHome  } from "react-icons/io5";
import { PiNotebookFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaClipboardCheck, FaPeopleGroup } from "react-icons/fa6";
import { MdAssignmentTurnedIn } from "react-icons/md";
import clienteAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Alerta from "./Alerta.jsx";

import { TbUsersPlus } from "react-icons/tb";

const VerticalNav = () => {
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null); // Inicializa el estado del usuario como null
  const { cerrarSesion } = useAuth() // Uso el contexto para acceder a la función cerrarSesion
  const [ alerta, setAlerta] = useState({})

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = ReactSession.get("token");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login.");
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const url = `/api/user/perfil`;
        const responseApi = await clienteAxios.get(url, config);

        if (responseApi.status === 200) {
          setUser(responseApi.data);
        } else {
          setAlerta({
            msg: responseApi.data.message || "Error en la solicitud",
            error: true,
          });
        }
      } catch (error) {
        console.error(
          "Error al obtener el perfil de usuario:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserProfile();
  }, []);

  // Renderiza un loader o un mensaje de carga mientras `user` es null
  if (!user) {
    return <div>Cargando...</div>;
  }
  const { msg } = alerta;
  return (
    <div className="min-h-screen">
      <div className="bg-sidebar xl:hidden flex justify-between w-full p-6 items-center">
      <div className="flex justify-between items-center space-x-3">
      {/* Imagen que se muestra en pantallas grandes y se oculta en pantallas pequeñas */}
      <img
        src="/IMG/LOGOTURUSEEM.png"
        className="hidden sm:block w-12 drop-shadow-2xl"
      />
      <p className="text-2xl leading-6 text-black font-bold">TURUSEEM</p>
    </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            onClick={() => setShow(true)}
            className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="close"
            id="close"
            onClick={() => setShow(false)}
            className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="Main"
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-center items-start h-full w-full sm:w-64 bg-sidebar flex-col`}
      >
        <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
          <img src="/IMG/LOGOTURUSEEM.png" className="w-12 drop-shadow-2xl" />
          <p className="text-3xl leading-6 text-white font-bold">TURUSEEM</p>
        </div>
        <div className="flex flex-col justify-end items-center pl-4 w-full border-white border-b space-y-3 py-5 active:text-white hover:text-white">
          {[
            { to: "/admin", label: "Inicio", Icon: IoHome },
            { to: "aprendices", label: "Aprendiz", Icon: BsFillPeopleFill },
            { to: "turnos-especiales", label: "Turno Especial", Icon: MdAssignmentTurnedIn },
            { to: "turnos-rutinarios", label: "Turno Rutinario", Icon: MdAssignmentTurnedIn },
            { to: "memorandos", label: "Memorando", Icon: IoDocumentText },
            { to: "programa-formacion", label: "Programa", Icon: PiNotebookFill },
            { to: "unidades", label: "Unidad", Icon: SiHomeassistantcommunitystore },
            { to: "fichas", label: "Ficha", Icon: FaClipboardCheck },
            { to: "funcionarios", label: "Funcionario", Icon: FaPeopleGroup },
            { to: "talentohumano", label: "Talento Humano", Icon: GiHumanPyramid },
            { to: "inasistencias", label: "Inasistencia", Icon: GiNotebook },
            { to: "registrar", label: "Registrar Usuario", Icon:TbUsersPlus },
          ].map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="w-full">
              <button className="flex  items-center w-full pl-3 py-2 focus:bg-botoneshover text-white hover:bg-botones rounded border-y border-white active:text-white hover:text-white font-bold uppercase focus:text-white">
                <Icon size={22} className="mr-2" />
                {label}
                {/* <span className="text-black text-sm uppercase font-bold"></span> */}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-end items-center pl-4 w-full border-white border-b space-y-3 py-5 active:text-white hover:text-white">
          {/* Botón de Cerrar Sesión */}
          <br />
          <button
            onClick={cerrarSesion}
            className="flex justify-start items-center w-full space-x-4 pl-3 py-2 focus:outline-none text-white focus:bg-botoneshover hover:bg-botones rounded border-y border-white active:text-white hover:text-white focus:text-white font-bold uppercase"
          >
                    {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
            <IoLogOut size={22} className="mr-2"/> Cerrar Sesión
            {/* <span className="text-black text-sm uppercase font-bold active:text-white hover:text-white focus:text-white">Cerrar Sesión</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalNav;