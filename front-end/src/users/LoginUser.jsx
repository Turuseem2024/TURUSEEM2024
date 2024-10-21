/* eslint-disable no-debugger */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import { ReactSession } from "react-client-session";
import { FaEye } from "react-icons/fa";

const LoginForm = () => {
  const [Cor_User, setCor_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // Efecto para mostrar el mensaje basado en la hora del día
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setMessage('¡Despierta, héroe! Es hora de la aventura');
    } else if (currentHour < 18) {
      setMessage('¡Buenas tardes, valiente! Tus Turnos te esperan');
    } else {
      setMessage('¡Saludos, defensor de la noche! Tu vigilia comienza');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([Cor_User, password].includes("")) {
      setAlerta({
        msg: "Todos los campos no deben de ir vacíos!",
        error: true,
      });
      return;
    }

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200); // Simula la recarga de energía

    try {
      const url = `/api/user/login`;
      const { data } = await clienteAxios.post(url, {
        Cor_User: Cor_User,
        password: password,
      });

      // Almacenamiento del token en la sesión del cliente
      ReactSession.set("token", data.token);

      // Maneja el estado de la verificación del usuario
      setAuth(data);

      // Redirigir al usuario a la página principal
      navigate("/admin");
    } catch (error) {
      ReactSession.remove("token");
      localStorage.clear();

      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { msg } = alerta;

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            INICIA SESIÓN Y GESTIONA {""}
            <span className="text-botones">TUS TURNOS</span>
          </h1>
          <p className="mt-5 text-xl">{message}</p>
        </div>
        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-stone-600 font-bold block text-xl">
                Correo:
              </label>
              <input
                type="email"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Aquí su Correo"
                value={Cor_User}
                onChange={(e) => setCor_User(e.target.value)}
              />
            </div>
            <div className="my-5 relative">
              <label className="uppercase text-stone-600 font-bold block text-xl">
                Contraseña:
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl pr-10"
                placeholder="Aquí su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-12 transform"
              >
                <FaEye />
              </button>
            </div>

            <input
              type="submit"
              value={loading ? "Recargando..." : "Iniciar Sesión"}
              className="bg-botones w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-blue-800 md:w-auto"
              disabled={loading}
            />

            {loading && (
              <div className="progress-bar bg-gray-200 rounded-full h-2 mt-5">
                <div
                  className="progress-bar-fill bg-green-700 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </form>
          <nav className="mt-8 lg:flex lg:justify-between">
            <Link
              to="/olvide-password"
              className="block text-center my-5 text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
            >
              Olvidé mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
