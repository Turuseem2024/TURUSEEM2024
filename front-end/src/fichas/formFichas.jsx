/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { error } from "jquery";

const FormFichas = ({
  buttonForm,
  fichas,
  updateTextButton,
  getAllFichas,
  stateButton,
  setStateButton,
}) => {
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Fec_InicioEtapaLectiva, setFec_InicioEtapaLectiva] = useState("");
  const [Fec_FinEtapaLectiva, setFec_FinEtapaLectiva] = useState("");
  const [Can_Aprendices, setCan_Aprendices] = useState("");
  const [Id_ProgramaFormacion, setId_ProgramaFormacion] = useState(""); // Cambiado a un valor único
  const [Estado, setEstado] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [programasformacion, setProgramasFormacion] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get("/programa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProgramasFormacion(response.data);
        }
      } catch (error) {
        console.error("Error fetching Programas:", error);
      }
    };

    fetchProgramas();
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();

    // const soloTextoRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Solo letras y espacios
    if (!Id_Ficha || Id_Ficha.length < 6) {
      setAlerta({
        msg: "El Numero de Ficha No puede Tener menos de 6 Digitos",
        error: true,
      });
      return;
    }

    if (!Fec_InicioEtapaLectiva) {
      setAlerta({
        msg: "La Fecha de Inicio esta Vacia",
        error: true,
      });
      return;
    }
    if (!Fec_FinEtapaLectiva) {
      setAlerta({
        msg: "La Fecha de Fin esta Vacia",
        error: true,
      });
      return;
    }
    if (!Can_Aprendices) {
      setAlerta({
        msg: "La Cantidad de Aprendices esta Vacia",
        error: true,
      });
      return;
    }
    if (!Id_ProgramaFormacion) {
      setAlerta({
        msg: "El Nombre del Programa esta Vacio",
        error: true,
      });
      return;
    }
    if (!Estado) {
      setAlerta({
        msg: "El Estado de Ficha esta Vacia",
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
      let mensajCRUD = "";
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/fichas/${fichas.Id_Ficha}`,
          {
            Id_Ficha,
            Fec_InicioEtapaLectiva,
            Fec_FinEtapaLectiva,
            Can_Aprendices,
            Id_ProgramaFormacion,
            Estado,
          },
          config
        );
        setStateButton(true);
        mensajCRUD = "Ficha Actualziada Exitosamente";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/fichas`,
          {
            Id_Ficha,
            Fec_InicioEtapaLectiva,
            Fec_FinEtapaLectiva,
            Can_Aprendices,
            Id_ProgramaFormacion,
            Estado,
          },
          config
        );
        mensajCRUD = "Ficha Registrada Exitosamente";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajCRUD,
          error: false,
        });
        clearForm();
        getAllFichas();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: mensajCRUD,
          error: false,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_Ficha(""),
      setFec_InicioEtapaLectiva(""),
      setFec_FinEtapaLectiva(""),
      setCan_Aprendices(""),
      setId_ProgramaFormacion(""),
      setEstado("");
    setSelectedPrograma(null);
  };

  const setData = () => {
    setId_Ficha(fichas.Id_Ficha);
    setFec_InicioEtapaLectiva(fichas.Fec_InicioEtapaLectiva);
    setFec_FinEtapaLectiva(fichas.Fec_FinEtapaLectiva);
    setCan_Aprendices(fichas.Can_Aprendices);
    setId_ProgramaFormacion(fichas.Id_ProgramaFormacion || "");
    setEstado(fichas.Estado);
    const selected = programasformacion.find(
      (programa) =>
        programa.Id_ProgramaFormacion === fichas.Id_ProgramaFormacion
    );
    setSelectedPrograma(selected || null);
  };

  useEffect(() => {
    setData();
  }, [fichas]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="apprenticeForm"
          onSubmit={sendForm}
          className={`bg-white rounded-2xl px-8 pb-6 w-full max-w-4xl`}
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Numero de Ficha :
            </label>
            <input
              type="number"
              id="Id_Ficha"
              placeholder="Numero"
              value={Id_Ficha}
              onChange={(e) => {
                const { value } = e.target;
                if (value.length <= 7) {
                  setId_Ficha(value);
                }
              }}
              disabled={buttonForm === "Actualizar"}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Inicio Etapa Lectiva:
              </label>
              <input
                type="date"
                id="fec_inicioetapalectiva"
                value={Fec_InicioEtapaLectiva}
                onChange={(e) => setFec_InicioEtapaLectiva(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha Fin Etapa Lectiva:
              </label>
              <input
                type="date"
                id="fec_finetapalectiva"
                value={Fec_FinEtapaLectiva}
                onChange={(e) => setFec_FinEtapaLectiva(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Cantidad de Aprendices:
            </label>
            <input
              type="number"
              id="can_aprendices"
              value={Can_Aprendices}
              onChange={(e) => {
                const { value } = e.target;
                if (value.length <= 2) {
                  setCan_Aprendices(value);
                }
              }}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Programa de Formacion
            </label>
            <select
              id="Id_ProgramaFormacion"
              value={Id_ProgramaFormacion}
              onChange={(e) => setId_ProgramaFormacion(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Nombre de Programa:</option>
              {programasformacion.map((programasFormacion) => (
                <option
                  key={programasFormacion.Id_ProgramaFormacion}
                  value={programasFormacion.Id_ProgramaFormacion}
                >
                  {programasFormacion.Nom_ProgramaFormacion}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Estado:
            </label>
            <select
              id="estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Estado:</option>
              <option value="Activo">Activa</option>
              <option value="Inactivo">Inactiva</option>
            </select>
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

export default FormFichas;