import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const URI = "/turnorutinario/consulta";

const ConsultarTurno = () => {
  const [alerta, setAlerta] = useState({});
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [turnoRutinarioList, setTurnoRutinarioList] = useState([]);

  const sendForm = async (e) => {
    e.preventDefault();
    if (Id_Aprendiz.trim() === "" ) {
      setAlerta({
        msg: "El número de Documento No Puede Estar Vacio",
        error: true
      });
      return
    }
    if (Id_Aprendiz.length < 7 ) {
      setAlerta({
        msg: "El número de Documento Debe Tener Minimo 9 Digitos",
        error: true
      });
      return;
    }
   
    try {
      const respuestaApi = await clienteAxios(`${URI}/${Id_Aprendiz}`);
      if (respuestaApi.status === 200) {
        if (respuestaApi.data.length > 0) {
          setTurnoRutinarioList(respuestaApi.data);
          clearForm();
        } else {
          setAlerta({
            msg: "No hay turnos para este Aprendiz.",
            error: true,
          });
          setTurnoRutinarioList([]);
        }
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) { 
      setTurnoRutinarioList([]);
      setAlerta({
        msg: error.response?.data?.message || "Error al consultar los turnos",
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_Aprendiz("");
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center mb-7 content-center w-full px-4 md:px-0">
        <form
          id="turnoRutinarioForm"
          onSubmit={sendForm}
          className="bg-white shadow-lg rounded-2xl px-6 pt-6 pb-8 mb-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mt-10"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <h1 className="font-bold text-stone-900 text-2xl sm:text-4xl uppercase text-center my-5">
            Consultar <span className="text-botones">Turnos Rutinarios</span>
          </h1>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Ingrese Numero de Documento
            </label>
            <input
              type="number"
              id="document"
              value={Id_Aprendiz}
              onChange={(e) => {
                const {value} = e.target;
                if (value.length <= 10) {
                  if (value === '' || (Number(value) > 0 && value.length <= 10)) {
                    setId_Aprendiz(value);
                  }
                }
              }}
              className="w-full p-2 border rounded"
              maxLength={10}
            />
          </div>
          <div className="flex justify-around">
            <input
              type="submit"
              id="button"
              value="Buscar"
              className="bg-botones w-full py-2 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-botoneshover md:w-auto"
            />
          </div>
        </form>
      </div>
      {turnoRutinarioList.length > 0 && (
        <div className="px-4 sm:px-10 md:px-20">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-center text-sm">
              <thead className="text-white bg-botones">
                <tr>
                  <th className="py-2 px-4 border-x-2 border-white">Documento</th>
                  <th className="py-2 px-4 border-x-2 border-white">Nombres</th>
                  <th className="py-2 px-4 border-x-2 border-white">Apellidos</th>
                  <th className="py-2 px-4 border-x-2 border-white">Fecha Inicio</th>
                  <th className="py-2 px-4 border-x-2 border-white">Fecha Fin</th>
                  <th className="py-2 px-4 border-x-2 border-white">Hora Inicio</th>
                  <th className="py-2 px-4 border-x-2 border-white">Hora Fin</th>
                  <th className="py-2 px-4 border-x-2 border-white">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {turnoRutinarioList.map((turnoRutinario) => (
                  <tr
                    key={turnoRutinario.Id_TurnoRutinario}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    <td className="py-2 px-4 border-b">{turnoRutinario.Id_Aprendiz}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.aprendiz?.Nom_Aprendiz}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.aprendiz?.Ape_Aprendiz}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.Fec_InicioTurno}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.Fec_FinTurno}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.Hor_InicioTurno}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.Hor_FinTurno}</td>
                    <td className="py-2 px-4 border-b">{turnoRutinario.unidad?.Nom_Unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultarTurno;