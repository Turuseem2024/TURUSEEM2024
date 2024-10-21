/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";

const FormTurnoRutinario = ({
  buttonForm,
  turnoRutinario,
  updateTextButton,
  getAllTurnosRutinarios,
  stateButton,
  setStateButton,
  CerrarModal,
}) => {
  // Estados del formulario
  const [Id_TurnoRutinario, setId_TurnoRutinario] = useState("");
  const [Fec_InicioTurno, setFec_InicioTurno] = useState("");
  const [Fec_FinTurno, setFec_FinTurno] = useState("");
  const [Hor_InicioTurno, setHor_InicioTurno] = useState("");
  const [Hor_FinTurno, setHor_FinTurno] = useState("");
  const [Obs_TurnoRutinario, setObs_TurnoRutinario] = useState("");
  const [Ind_Asistencia, setInd_Asistencia] = useState("");
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [Id_Unidad, setId_Unidad] = useState("");
  const [Motivo, setMotivo] = useState("");

  //dependientes
  const [areas, setAreas] = useState([]); // Lista de áreas
  const [unidades, setUnidades] = useState([]); // Lista de unidades filtradas por área
  const [aprendices, setAprendices] = useState([]); // Lista de aprendices filtrados por unidad
  const [Id_Area, setId_Area] = useState(""); // Área seleccionada

  // Estados para datos adicionales
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const [Aprendiz, setAprendiz] = useState([]);
  const [Unidad, setUnidad] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [Id_Inasistencia, setId_Inasistencia] = useState("");

  const getAreaByUnidad = async (unidadId) => {
    try {
      const token = ReactSession.get("token");
      const response = await clienteAxios(`/unidades/${unidadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const areaId = response.data.Id_Area;
        setId_Area(areaId);
      }
    } catch (error) {
      console.error("Error fetching Area by Unidad:", error);
    }
  };

  // Obtener áreas
  useEffect(() => {
    const getAllAreas = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios("/areas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching Areas:", error);
      }
    };

    getAllAreas();
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  // Obtener aprendices por área seleccionada
  // Obtener unidades por área seleccionada
  useEffect(() => {
    if (!Id_Area) {
      setUnidades([]);
      return;
    }

    const getUnidadesByArea = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios(`/areas/${Id_Area}/unidades`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUnidades(response.data);
        }
      } catch (error) {
        console.error("Error fetching Unidades by Area:", error);
      }
    };

    getUnidadesByArea();
  }, [Id_Area]);

  // Obtener aprendices por área seleccionada
  useEffect(() => {
    if (!Id_Area) {
      setAprendices([]);
      return;
    }

    const getAprendicesByArea = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios(`/areas/${Id_Area}/aprendices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAprendices(response.data);
        }
      } catch (error) {
        console.error("Error Al Buscar Aprendices por Area: ", error);
      }
    };

    getAprendicesByArea();
  }, [Id_Area]); // Este efecto se ejecuta cuando cambian `turnoRutinario` o `Id_Area`

  // Enviar formulario
  const sendForm = async (e) => {
    e.preventDefault();
    if (!Fec_InicioTurno) {
      setAlerta({
        msg: "La Fecha de Inicio No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Fec_FinTurno) {
      setAlerta({
        msg: "La Fecha de Fin No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Hor_InicioTurno) {
      setAlerta({
        msg: "La Hora de Inicio No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Hor_FinTurno) {
      setAlerta({
        msg: "La Hora de Fin No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Ind_Asistencia) {
      setAlerta({
        msg: "El Indicador No Puede Estar Vacio",
        error: true,
      });
      return;
    }
    if (!Id_Aprendiz) {
      setAlerta({
        msg: "El Nombre Del Aprendiz No puede Estar Vacio",
        error: true,
      });
      return;
    }
    if (!Id_Unidad) {
      setAlerta({
        msg: "La Unidad No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let mensajeCRUD = "";
      let respuestApi;

      // Validar los datos antes de enviar la solicitud
      if (
        !Fec_InicioTurno ||
        !Fec_FinTurno ||
        !Hor_InicioTurno ||
        !Hor_FinTurno ||
        !Id_Aprendiz ||
        !Id_Unidad
      ) {
        setAlerta({
          msg: "Todos los campos son obligatorios.",
          error: true,
        });
        return;
      }

      // Determinar si es actualización o creación
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/turnoRutinario/${Id_TurnoRutinario}`,
          {
            Fec_InicioTurno,
            Fec_FinTurno,
            Hor_InicioTurno,
            Hor_FinTurno,
            Obs_TurnoRutinario,
            Ind_Asistencia,
            Id_Aprendiz,
            Id_Unidad,
            Motivo,
          },
          config
        );
        setStateButton(true);
        mensajeCRUD = "Turno Rutinario Actualizado Exitosamente";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/turnoRutinario`,
          {
            Fec_InicioTurno,
            Fec_FinTurno,
            Hor_InicioTurno,
            Hor_FinTurno,
            Obs_TurnoRutinario,
            Ind_Asistencia,
            Id_Aprendiz,
            Id_Unidad,
            Motivo,
          },
          config
        );
        mensajeCRUD = "Turno Rutinario Registrado Exitosamente";
        getAllTurnosRutinarios(); // Actualiza la lista de turnos rutinarios
      }

      // Manejo de respuesta exitosa
      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });

        if (Ind_Asistencia === "Si") {
          // Eliminar inasistencia y memorandos del aprendiz si ya existen
          await clienteAxios.put(
            `/aprendiz/actualizar-inasistencia/${Id_Aprendiz}`,
            {
              Ind_Asistencia,
              Turno_Id: respuestApi.data.Id_TurnoRutinario || Id_TurnoRutinario,
              Fec_Inasistencia: Fec_InicioTurno,
              Motivo,
              Tipo_Inasistencia: "turno_rutinario"
            }, // Este es el cuerpo de la solicitud
            config // Aquí está la configuración
          );
        } else if (Ind_Asistencia === "No") {
          // Mantener la lógica actual para registrar inasistencias cuando no hay asistencia
          await clienteAxios.put(
            `/aprendiz/actualizar-inasistencia/${Id_Aprendiz}`,
            {
              Ind_Asistencia,
              Turno_Id: respuestApi.data.Id_TurnoRutinario || Id_TurnoRutinario,
              Fec_Inasistencia: Fec_InicioTurno,
              Motivo,
              Tipo_Inasistencia: "turno_rutinario"
            },
            config
          );
        }
        

        getAllTurnosRutinarios();
        clearForm();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: respuestApi.error.message || "Error al crear el Turno!",
          error: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlerta({
        msg: "Error al procesar la solicitud. Verifica los datos.",
        error: true,
      });
    }
  };

  // Limpiar formulario
  const clearForm = () => {
    setId_TurnoRutinario("");
    setFec_InicioTurno("");
    setFec_FinTurno("");
    setHor_InicioTurno("");
    setHor_FinTurno("");
    setObs_TurnoRutinario("");
    setInd_Asistencia("");
    setId_Aprendiz("");
    setId_Unidad("");
    setMotivo("");
    // Resetear los estados relacionados con los datos de aprendizaje y unidad, si es necesario
    setSelectedAprendiz(null);
    setSelectedUnidad(null);
  };

  // Establecer datos en el formulario para edición
  const setData = () => {
    if (turnoRutinario) {
      setId_TurnoRutinario(turnoRutinario.Id_TurnoRutinario);
      setFec_InicioTurno(turnoRutinario.Fec_InicioTurno);
      setFec_FinTurno(turnoRutinario.Fec_FinTurno);
      setHor_InicioTurno(turnoRutinario.Hor_InicioTurno);
      setHor_FinTurno(turnoRutinario.Hor_FinTurno);
      setObs_TurnoRutinario(turnoRutinario.Obs_TurnoRutinario);
      setInd_Asistencia(turnoRutinario.Ind_Asistencia);
      setId_Aprendiz(turnoRutinario.Id_Aprendiz || "");
      setId_Unidad(turnoRutinario.Id_Unidad || "");
      setMotivo(turnoRutinario.Motivo || "");

      // Seleccionar aprendiz y unidad
      const selectedFic = Aprendiz.find(
        (aprendiz) => aprendiz.Id_Aprendiz === turnoRutinario.Id_Aprendiz
      );
      setSelectedAprendiz(selectedFic || null);
      const selectedUni = Unidad.find(
        (unidad) => unidad.Id_Unidad === turnoRutinario.Id_Unidad
      );
      setSelectedUnidad(selectedUni || null);

      // Obtener el área asociada a la unidad
      if (turnoRutinario.Id_Unidad) {
        getAreaByUnidad(turnoRutinario.Id_Unidad);
      }
    }
  };

  useEffect(() => {
    setData();
  }, [turnoRutinario]);

  const { msg } = alerta;

  //Generar Turnos Automaticos
  const generarTurnosAutomaticos = () => {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    // Formatear las fechas a formato yyyy-mm-dd
    const formatFecha = (fecha) => {
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFec_InicioTurno(formatFecha(hoy));
    setFec_FinTurno(formatFecha(hoy));
    setHor_InicioTurno("07:00");
    setHor_FinTurno("09:00");
  };

  return (
    <>
      {buttonForm !== "Actualizar" && (
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="bg-botones py-2 px-4 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-blue-600 md:w-auto"
            onClick={generarTurnosAutomaticos}
          >
            Generar Fechas y Horas Automáticas
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <form
          id="turnoRutinarioForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-7xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Área
              </label>
              <select
                value={Id_Area}
                onChange={(e) => {
                  setId_Area(e.target.value);
                }}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="Select"
              >
                <option value="">Seleccione un Área</option>
                {areas.map((area) => (
                  <option key={area.Id_Area} value={area.Id_Area}>
                    {area.Nom_Area}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de Unidades */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <select
                value={Id_Unidad}
                onChange={(e) => setId_Unidad(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                // disabled={!Id_Area} // Deshabilitar si no hay área seleccionada
              >
                <option value="">Seleccione una Unidad</option>
                {unidades.map((unidad) => (
                  <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                    {unidad.Nom_Unidad}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de Aprendices */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Aprendiz
              </label>
              <select
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={Id_Aprendiz}
                onChange={(e) => setId_Aprendiz(e.target.value)}
                // disabled={!Id_Area} // Deshabilitar si no hay área seleccionada
              >
                <option value="">Seleccione un Aprendiz</option>
                {aprendices.map((aprendiz) => (
                  <option
                    key={aprendiz.Id_Aprendiz}
                    value={aprendiz.Id_Aprendiz}
                  >
                    {aprendiz.Id_Aprendiz}
                    {/* {`${aprendiz.Nom_Aprendiz} ${aprendiz.Ape_Aprendiz}`} */}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Inicio Turno Rutinario
              </label>
              <input
                type="date"
                id="Fec_InicioTurno"
                value={Fec_InicioTurno}
                onChange={(e) => setFec_InicioTurno(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Fin Del Turno Rutinario
              </label>
              <input
                type="date"
                id="Fec_FinTurno"
                value={Fec_FinTurno}
                onChange={(e) => setFec_FinTurno(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Inicio
              </label>
              <input
                type="time"
                id="hora_inicio"
                value={Hor_InicioTurno}
                onChange={(e) => setHor_InicioTurno(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Fin
              </label>
              <input
                type="time"
                id="hora_fin"
                value={Hor_FinTurno}
                onChange={(e) => setHor_FinTurno(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                placeholder="Observaciones"
                value={Obs_TurnoRutinario}
                onChange={(e) => setObs_TurnoRutinario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Indicador De Asistencia
              </label>
              <select
                id="Ind_Asistencia"
                value={Ind_Asistencia}
                onChange={(e) => setInd_Asistencia(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione:</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            {Ind_Asistencia === "No" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Porque No Asistio:
                </label>
                <input
                  type="text"
                  id="Motivo"
                  placeholder="Motivo Inasistencia"
                  value={Motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-around mt-2">
            <input
              type="submit"
              id="button"
              value={buttonForm}
              className="bg-botones w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-botoneshover md:w-auto"
            />
            {stateButton && (
              <input
                type="button"
                id="button"
                value="Limpiar"
                onClick={() => {
                  clearForm();
                  updateTextButton("Enviar");
                }}
                className="bg-yellow-400 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-yellow-500 md:w-auto"
                aria-label="Limpiar"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTurnoRutinario;