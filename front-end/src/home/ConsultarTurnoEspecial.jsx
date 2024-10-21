import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const URI = "/turnoespecial/consulta";

const ConsultarTurnoEspecial = () => {
  const [alerta, setAlerta] = useState({});
  const [Id_Ficha, setId_Ficha] = useState("");
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);

  const sendForm = async (e) => {
    e.preventDefault();
    if (Id_Ficha.trim() === "") {
      setAlerta({
        msg: "El número de ficha no puede estar vacío",
        error: true
      });
      return;
    }
    if (Id_Ficha.length < 5 ) {
      setAlerta({
        msg: "El número de Ficha Debe Tener Minimo 5 Digitos",
        error: true
      });
      return;
    }
    try {
      const respuestaApi = await clienteAxios(`${URI}/${Id_Ficha}`);
      if (respuestaApi.status === 200) {
        const turnosEspeciales = respuestaApi.data;
        setTurnoEspecialList(turnosEspeciales);

        // // Verifica si hay algún turno especial con una fecha válida
        // const tieneTurnoValido = turnosEspeciales.some(turno => mostrarTurnoSiEsActual(turno.Fec_TurnoEspecial));

        // if (tieneTurnoValido) {
        //   setAlerta({
        //     msg: "Ficha Con Turno Programado",
        //     error: false
        //   });
        // } else {
        //   setAlerta({
        //     msg: "No hay turnos programados vigentes",
        //     error: true
        //   });
        // }
        
        clearForm();
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) { 
      setTurnoEspecialList([]);
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };




  const clearForm = () => {
    setId_Ficha("");
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
            Consultar <span className="text-blue-600">Turnos Especiales</span>
          </h1>
          <div className="mb-3">
            <label className="text-gray-700 uppercase font-bold">
              Ingrese Numero de Ficha
            </label>
            <input
              type="number"
              id="document"
              value={Id_Ficha}
              onChange={(e) => {
                const {value} = e.target;
                if (value.length <= 7) {
                  setId_Ficha(value);
                }
              }}
              className="w-full p-2 border rounded"
              maxLength={8}
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
      {turnoEspecialList.length > 0 ? (
        <div className="px-4 sm:px-10 md:px-20">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-center text-sm">
              <thead className="text-white bg-botones">
                <tr>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Ficha
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Fecha Turno
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Hora Inicio
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Hora Fin
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Documento de Instructor
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Nombre Instructor
                  </th>
                  <th className="py-2 px-4 border-x-2 border-white">
                    Unidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {turnoEspecialList.map((turnoEspecial) => (
                    <tr
                      key={turnoEspecial.Id_TurnoEspecial}
                      className="odd:bg-white even:bg-gray-100"
                    >
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.Id_Ficha}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.Fec_TurnoEspecial}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.Hor_Inicio}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.Hor_Fin}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.Id_Funcionario}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {`${turnoEspecial.funcionario.Nom_Funcionario} `+ turnoEspecial.funcionario.Ape_Funcionario}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {turnoEspecial.unidad?.Nom_Unidad}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConsultarTurnoEspecial;