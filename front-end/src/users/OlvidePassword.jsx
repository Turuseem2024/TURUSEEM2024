import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

const OlvidePassword = () => {
  const [Cor_User, setCor_User] = useState("");
  const [alerta, setAlerta] = useState({});
  const [isDisabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Cor_User == " " || Cor_User.length < 7) {
      setAlerta({
        msg: "El Correo es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const url = `/api/user/olvide-password`;
      const { data } = await clienteAxios.post(url, {
        Cor_User: Cor_User,
      });
      setAlerta({
        msg: data.msg,
      });
      setDisabled(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            Recupera tu Contraseña y Gestiona{" "}
            <span className="text-botones">tus Turnos</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-stone-600 font-bold block text-xl">
                Correo:{" "}
              </label>
              <input
                type="email"
                value={Cor_User}
                onChange={(e) => setCor_User(e.target.value)}
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Aquí su Correo"
              />
            </div>
            <input
              type="submit"
              value="Recuperar Contraseña"
              className={isDisabled ? "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed uppercase" : "bg-botones w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-botoneshover md:w-auto" }
              disabled={isDisabled}
            />
          </form>
          <nav className="mt-8 lg:flex lg:justify-between">
            <Link to="/login" className="block text-center my-5 text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md">
              ¿Tienes una Cuenta? Inicia Sesion
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default OlvidePassword;
