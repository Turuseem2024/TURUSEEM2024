/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";
import { error } from "jquery";

const FormTurnosEspeciales = ({
  buttonForm,
  turnoEspecial,
  updateTextButton,
  getAllTurnosEspeciales,
  setStateButton,
  stateButton,
}) => {
  const [Id_TurnoEspecial, setId_TurnoEspecial] = useState("");
  const [Fec_TurnoEspecial, setFec_TurnoEspecial] = useState("");
  const [Hor_Inicio, setHor_Inicio] = useState("");
  const [Hor_Fin, setHor_Fin] = useState("");
  const [Obs_TurnoEspecial, setObs_TurnoEspecial] = useState("");
  const [Tot_AprendicesAsistieron, setTot_AprendicesAsistieron] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Img_Asistencia, setImg_Asistencia] = useState(null);
  const [Id_Funcionario, setId_Funcionario] = useState("");
  const [Id_Unidad, setId_Unidad] = useState("");

  const [selectedFicha, setSelectedFicha] = useState(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  const [Fichas, setFichas] = useState([]);
  const [Funcionarios, setFuncionarios] = useState([]);
  const [Unidades, setUnidades] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const getAllFichas = async () => {
      try {
        const token = ReactSession.get("token");
        const responseFichas = await clienteAxios("/fichas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseFichas.status == 200) {
          setFichas(responseFichas.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    const getAllFuncionarios = async () => {
      try {
        const token = ReactSession.get("token");
        const responseFuncionarios = await clienteAxios("/funcionarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseFuncionarios.status == 200) {
          setFuncionarios(responseFuncionarios.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    const getAllUnidades = async () => {
      try {
        const token = ReactSession.get("token");
        const responseUnidades = await clienteAxios("/unidades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseUnidades.status == 200) {
          setUnidades(responseUnidades.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllFuncionarios();
    getAllFichas();
    getAllUnidades();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fichasRes, funcionariosRes, unidadesRes] = await Promise.all([
          clienteAxios.get("/fichas", config),
          clienteAxios.get("/funcionarios", config),
          clienteAxios.get("/unidades", config),
        ]);

        setFichas(fichasRes.data);
        setFuncionarios(funcionariosRes.data);
        setUnidades(unidadesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const token = ReactSession.get("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
  };

  const sendForm = async (e) => {
    e.preventDefault();

    if (!Fec_TurnoEspecial) {
      setAlerta({
        msg: "La Fecha Del Turno No puede Estar Vacia",
        error: true,
      });
      return;
    }

    if (!Hor_Inicio) {
      setAlerta({
        msg: "La Hora Inicio No puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Hor_Fin) {
      setAlerta({
        msg: "La Hora fin No puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Obs_TurnoEspecial) {
      setAlerta({
        msg: "La Observacion No puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Tot_AprendicesAsistieron) {
      setAlerta({
        msg: "El total de Aprendices No puede Estar Vacio",
        error: true,
      });
      return;
    }
    if (!Id_Ficha) {
      setAlerta({
        msg: "La Ficha No puede Estar Vacia",
        error: true,
      });
    }
    if (!Id_Funcionario) {
      setAlerta({
        msg: "El Nombre del Funcionario No puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Id_Unidad) {
      setAlerta({
        msg: "La Unidad No puede Estar Vacia",
        error: true,
      });
      return;
    }

    try {
      const formData = new FormData();

      // Añadir campos al FormData
      formData.append("Fec_TurnoEspecial", Fec_TurnoEspecial);
      formData.append("Hor_Inicio", Hor_Inicio);
      formData.append("Hor_Fin", Hor_Fin);
      formData.append("Obs_TurnoEspecial", Obs_TurnoEspecial);
      formData.append("Tot_AprendicesAsistieron", Tot_AprendicesAsistieron);
      formData.append("Id_Ficha", Id_Ficha);
      formData.append("Id_Funcionario", Id_Funcionario);
      formData.append("Id_Unidad", Id_Unidad);
      formData.append("Img_Asistencia", Img_Asistencia);

      let mensajeCRUD = "";
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/turnoespecial/${Id_TurnoEspecial}`,
          formData,
          config
        );
        setStateButton(true);
        mensajeCRUD = "Turno especial Actualizado Exitosamente";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/turnoespecial`,
          formData,
          config
        );
        mensajeCRUD = "Turno especial Registrado Exitosamente";
        getAllTurnosEspeciales();
      }

      if (respuestApi.status === 200 || respuestApi.status === 201) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });
        getAllTurnosEspeciales();
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
      // setAlerta({
      //   msg: "Todos Los Campos Son Obligatorios!.",
      //   error: true,
      // });
    }
  };

  const clearForm = () => {
    setId_TurnoEspecial("");
    setFec_TurnoEspecial("");
    setHor_Inicio("");
    setHor_Fin("");
    setObs_TurnoEspecial("");
    setTot_AprendicesAsistieron("");
    setId_Ficha("");
    setImg_Asistencia(null);
    setId_Funcionario("");
    setId_Unidad("");
  };

  const setData = () => {
    if (turnoEspecial) {
      setId_TurnoEspecial(turnoEspecial.Id_TurnoEspecial || "");
      setFec_TurnoEspecial(turnoEspecial.Fec_TurnoEspecial || "");
      setHor_Inicio(turnoEspecial.Hor_Inicio || "");
      setHor_Fin(turnoEspecial.Hor_Fin || "");
      setObs_TurnoEspecial(turnoEspecial.Obs_TurnoEspecial || "");
      setTot_AprendicesAsistieron(turnoEspecial.Tot_AprendicesAsistieron || "");
      setId_Ficha(turnoEspecial.Id_Ficha || "");
      setImg_Asistencia(turnoEspecial.Img_Asistencia || null);
      setId_Funcionario(turnoEspecial.Id_Funcionario || "");
      setId_Unidad(turnoEspecial.Id_Unidad || "");
      const selectedFic = Fichas.find(
        (ficha) => ficha.Id_Ficha === turnoEspecial.Id_Ficha
      );
      setSelectedFicha(selectedFic || null);
      const selectedFun = Funcionarios.find(
        (funcionario) =>
          funcionario.Id_Funcionario === turnoEspecial.Id_Funcionario
      );
      setSelectedFuncionario(selectedFun || null);
      const selectedUni = Unidades.find(
        (unidad) => unidad.Id_Unidad === turnoEspecial.Id_Unidad
      );
      setSelectedUnidad(selectedUni || null);
    }
  };

  useEffect(() => {
    setData();
  }, [turnoEspecial]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="turnoEspecialForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-7xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Turno Especial
              </label>
              <input
                type="date"
                id="nombre"
                value={Fec_TurnoEspecial}
                onChange={(e) => setFec_TurnoEspecial(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="flex items-center mb-3 space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Hora Inicio
                </label>
                <input
                  type="time"
                  id="hora_inicio"
                  value={Hor_Inicio}
                  onChange={(e) => setHor_Inicio(e.target.value)}
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Hora Fin
                </label>
                <input
                  type="time"
                  id="hora_fin"
                  value={Hor_Fin}
                  onChange={(e) => setHor_Fin(e.target.value)}
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Observaciones
              </label>
              <textarea
                id="Obs_TurnoEspecial"
                placeholder="Observaciones Turno Especial"
                value={Obs_TurnoEspecial}
                onChange={(e) => setObs_TurnoEspecial(e.target.value)}
                maxLength={70}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Total Aprendices
              </label>
              <input
                type="number"
                id="total_aprendices"
                placeholder="Total Aprendices Asistieron"
                value={Tot_AprendicesAsistieron}
                onChange={(e) => {
                  const {value} = e.target;
                  if (value.length <= 2) {
                    setTot_AprendicesAsistieron(value);
                  }
                }}
                
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ficha
              </label>
              <select
                id="ficha"
                value={Id_Ficha}
                onChange={(e) => setId_Ficha(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione una Ficha:</option>
                {Fichas.map((ficha) => (
                  <option key={ficha.Id_Ficha} value={ficha.Id_Ficha}>
                    {ficha.Id_Ficha}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Funcionario
              </label>
              <select
                id="funcionario"
                value={Id_Funcionario}
                onChange={(e) => setId_Funcionario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione un Funcionario:</option>
                {Funcionarios.map((funcionario) => (
                  <option
                    key={funcionario.Id_Funcionario}
                    value={funcionario.Id_Funcionario}
                  >
                    {funcionario.Nom_Funcionario}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <select
                id="unidad"
                value={Id_Unidad}
                onChange={(e) => setId_Unidad(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione una Unidad:</option>
                {Unidades.map((unidad) => (
                  <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
                    {unidad.Nom_Unidad}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Imagen Asistencia
              </label>
              <input
                type="file"
                id="img_asistencia"
                onChange={(e) => setImg_Asistencia(e.target.files[0])}
                className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
          </div>
          <hr className="mt-3" />
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
                className="bg-yellow-400 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-yellow-700 md:w-auto"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTurnosEspeciales;