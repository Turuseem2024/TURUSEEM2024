/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { ReactSession } from "react-client-session";

const ModalTurnoEspeciales = ({
  isOpenTurnos,
  toggleModalTurnos,
  turnoEspecialAprendiz,
}) => {
  const [alerta, setAlerta] = useState({});
  const [asistencia, setAsistencia] = useState([]);

  // Inicializamos el estado de asistencia basado en los turnos recibidos
  useEffect(() => {
    const asistenciaInicial = turnoEspecialAprendiz.map((turno) => ({
      Id_TurnoEspecial: turno.turnoEspecial?.Id_TurnoEspecial,
      Id_Aprendiz: turno.Id_Aprendiz,
      asistio: turno.Ind_Asistencia === "Si" ? "Sí" : "No",
    }));
    setAsistencia(asistenciaInicial);
  }, [turnoEspecialAprendiz]);

  // Manejar el evento cuando cambia el estado del toggle
  const handleToggle = (e, Id_TurnoEspecial, Id_Aprendiz) => {
    const { checked } = e.target;
    const updatedAsistencia = asistencia.map((item) =>
      item.Id_TurnoEspecial === Id_TurnoEspecial &&
      item.Id_Aprendiz === Id_Aprendiz
        ? { ...item, asistio: checked ? "Sí" : "No" }
        : item
    );
    setAsistencia(updatedAsistencia);
  };

  const handleGuardarCambios = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      for (const item of asistencia) {
        const response = await clienteAxios.put(
          `/turEspAprendiz/${item.Id_TurnoEspecial}`,
          {
            asistio: item.asistio,
            Id_Aprendiz: item.Id_Aprendiz,
          },
          config
        );

        if (response.status === 200 || response.status === 204) {
          setAlerta({
            msg: "Cambios guardados correctamente",
            error: false,
          });

          if (item.asistio === "Sí") {
            await clienteAxios.put(
              `/aprendiz/actualizar-inasistencia/${item.Id_Aprendiz}`,
              {
                Ind_Asistencia: item.asistio,
                Turno_Id: item.Id_Aprendiz,
                Fec_Inasistencia:
                  turnoEspecialAprendiz[0].turnoEspecial?.Fec_TurnoEspecial,
                Motivo: "no asistir a turno especial",
                Tipo_Inasistencia: "turno_especial",
              },
              config
            );
          } else if (item.asistio === "No") {
            await clienteAxios.put(
              `/aprendiz/actualizar-inasistencia/${item.Id_Aprendiz}`,
              {
                Ind_Asistencia: item.asistio,
                Turno_Id: item.Id_Aprendiz,
                Fec_Inasistencia:
                  turnoEspecialAprendiz[0].turnoEspecial?.Fec_TurnoEspecial,
                Motivo: "no asistir a turno especial",
                Tipo_Inasistencia: "turno_especial",
              },
              config
            );
          }

          // Si la asistencia es "No", crear un registro de inasistencia
          // if (item.asistio === "No") {
          //   await clienteAxios.put(
          //     `/aprendiz/actualizar-inasistencia/${item.Id_Aprendiz}`,
          //     {
          //       Ind_Asistencia: item.asistio,
          //       Turno_Id: item.Id_Aprendiz,
          //       Fec_Inasistencia: turnoEspecialAprendiz[0].turnoEspecial?.Fec_TurnoEspecial,
          //       Motivo: "no asistir a turno especial",
          //       Tipo_Inasistencia: "turno_especial"
          //     },
          //     config
          //   );
          // }
        } else {
          setAlerta({
            msg: "Hubo un error al guardar los cambios",
            error: true,
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setAlerta({ msg: "Hubo un error al guardar los cambios", error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {isOpenTurnos && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-4xl h-auto min-h-[200px] max-h-[94vh]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Asistencia a Turnos Especiales
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => toggleModalTurnos()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-6 mt-3">
                {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              </div>

              <div className="px-4 md:p-5 space-y-2">
                <div className="overflow-auto max-h-[60vh]">
                  <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 border-b border-black">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black sticky top-0 z-10">
                      <tr>
                        <th className="py-2 px-4">Documento Aprendiz</th>
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Apellido</th>
                        <th className="py-2 px-4">Ficha</th>
                        <th className="py-2 px-4">Unidad</th>
                        <th className="py-2 px-4">Funcionario Responsable</th>
                        <th className="py-2 px-4">Fecha Turno Especial</th>
                        <th className="py-2 px-4">Asistencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnoEspecialAprendiz.map((turno, rowIndex) => {
                        const asistio =
                          asistencia.find(
                            (item) =>
                              item.Id_TurnoEspecial ===
                                turno.turnoEspecial?.Id_TurnoEspecial &&
                              item.Id_Aprendiz === turno.Id_Aprendiz
                          )?.asistio === "Sí";

                        return (
                          <tr key={rowIndex} className="border-b border-black">
                            <td className="py-2 px-4">{turno.Id_Aprendiz}</td>
                            <td className="py-2 px-4">
                              {turno.aprendiz?.Nom_Aprendiz}
                            </td>
                            <td className="py-2 px-4">
                              {turno.aprendiz?.Ape_Aprendiz}
                            </td>
                            <td className="py-2 px-4">
                              {turno.turnoEspecial?.Id_Ficha}
                            </td>
                            <td className="py-2 px-4">
                              {turno.turnoEspecial?.unidad?.Nom_Unidad}
                            </td>
                            <td className="py-2 px-4">
                              {
                                turno.turnoEspecial?.funcionario
                                  ?.Nom_Funcionario
                              }
                            </td>
                            <td className="py-2 px-4">
                              {turno.turnoEspecial?.Fec_TurnoEspecial}
                            </td>
                            <td className="py-2 px-4">
                              <label className="inline-flex relative items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={asistio}
                                  onChange={(e) =>
                                    handleToggle(
                                      e,
                                      turno.turnoEspecial?.Id_TurnoEspecial,
                                      turno.Id_Aprendiz
                                    )
                                  }
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  {asistio ? "Asistió" : "No Asistió"}
                                </span>
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => toggleModalTurnos()}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleGuardarCambios}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTurnoEspeciales;