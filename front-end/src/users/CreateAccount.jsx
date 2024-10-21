import { useState } from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
const UserForm = () => {
  const [Id_User, setId_User] = useState("");
  const [Nom_User, setNom_User] = useState("");
  const [Cor_User, setCor_User] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([Id_User, Nom_User, Cor_User, password, passwordRepeat].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }
    if (password !== passwordRepeat) {
      setAlerta({ msg: "Las contraseñas deben coincidir", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, agrega minimo 6 caracteres.",
        error: true,
      });
      return;
    }
    setAlerta({});
    // Crear el usuario en la Api
    try {
      const url = `/api/user/create`;
      await clienteAxios.post(url, { Id_User, Nom_User, Cor_User, password });
      setAlerta({
        msg: "Cuenta Creada Correctamente, Revisa tu correo!",
        error: false,
      });
      clearForm();
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };
  const { msg } = alerta;
  const clearForm = () => {
    setId_User("");
    setNom_User("");
    setCor_User("");
    setPassword("");
    setPasswordRepeat("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl text-center">
            Crea una Cuenta Y Gestiona{" "}
            <span className="text-botones">tus Turnos</span>
          </h1>
        </div>
        <div className="bg-white p-2 md:p-8 rounded-lg w-full max-w-md md:max-w-2xl">
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Documento:
              </label>
              <input
                type="text"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Su Documento"
                value={Id_User}
                onChange={(e) => setId_User(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Nombre:
              </label>
              <input
                type="text"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Su Nombre"
                value={Nom_User}
                onChange={(e) => setNom_User(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Correo:
              </label>
              <input
                type="email"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Su Correo Ej: example@gmail.com"
                value={Cor_User}
                onChange={(e) => setCor_User(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Contraseña:
              </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Repetir Contraseña:
              </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Repita Su Contraseña"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-botones w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-blue-700 md:w-auto"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default UserForm;
