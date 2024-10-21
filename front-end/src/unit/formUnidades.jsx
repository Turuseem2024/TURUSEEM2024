/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";
import { error } from "jquery";

const FormUnidades = ({
  buttonForm,
  unidad,
  updateTextButton,
  getAllUnidades,
  stateButton,
  setStateButton,
}) => {
  const [Nom_Unidad, setNom_Unidad] = useState("");
  const [Hor_Apertura, setHor_Apertura] = useState("");
  const [Hor_Cierre, setHor_Cierre] = useState("");
  const [Estado, setEstado] = useState("");
  const [Id_Area, setId_Area] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [Areas, setAreas] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get("/areas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          setAreas(response.data);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();

    if (!Nom_Unidad) {
      setAlerta({
        msg: "El Nombre De la Unidad No puede Ir Vacio",
        error: true,
      });
      return;
    }
    if (!Hor_Apertura) {
      setAlerta({
        msg: "La Hora de Apertura De la Unidad No puede Ir Vacia",
        error: true,
      });
      return;
    }
    if (!Hor_Cierre) {
      setAlerta({
        msg: "La Hora De Cierre De la Unidad No puede Ir Vacia",
        error: true,
      });
      return;
    }

    if (!Estado) {
      setAlerta({
        msg: "El Estado De la Unidad No puede Ir Vacia",
        error: true,
      });
      return;
    }
    if (!Id_Area) {
      setAlerta({
        msg: "El Area De la Unidad No puede Ir Vacio",
        error: true,
      });
      return;
    }

    // Validaciones básicas
    const textoYNumerosRegex = /^[a-zA-ZÀ-ÿ0-9\s]+$/;
    // Solo letras y espacios

    if (!textoYNumerosRegex.test(Nom_Unidad)) {
      setAlerta({
        msg: "El Nombre Debe de Ir en Letras y Numeros",
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
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/unidades/${unidad.Id_Unidad}`,
          {
            Nom_Unidad,
            Hor_Apertura,
            Hor_Cierre,
            Estado,
            Id_Area,
          },
          config
        );
        setStateButton(true);
        mensajeCRUD = "Unidad Actualizada Exitosamente";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/unidades`,
          {
            Nom_Unidad,
            Hor_Apertura,
            Hor_Cierre,
            Estado,
            Id_Area,
          },
          config
        );
        mensajeCRUD = "Unidad Registrada Exitosamente";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });
        clearForm();
        getAllUnidades();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: "Error al registrar la unidad.",
          error: true,
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
    setNom_Unidad("");
    setHor_Apertura("");
    setHor_Cierre("");
    setEstado("");
    setId_Area("");
    setSelectedArea(null);
  };

  const setData = () => {
    setNom_Unidad(unidad.Nom_Unidad);
    setHor_Apertura(unidad.Hor_Apertura);
    setHor_Cierre(unidad.Hor_Cierre);
    setEstado(unidad.Estado);
    setId_Area(unidad.Id_Area);
    const selected = Areas.find((area) => area.Id_Area === unidad.Id_Area);
    setSelectedArea(selected || null);
  };

  useEffect(() => {
    setData();
  }, [unidad]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="apprenticeForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-4xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Nombre Unidad
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={Nom_Unidad}
              onChange={(e) => setNom_Unidad(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Apertura:
              </label>
              <input
                type="time"
                id="hora_apertura"
                value={Hor_Apertura}
                onChange={(e) => setHor_Apertura(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Hora Cierre:
              </label>
              <input
                type="time"
                id="hora_cierre"
                value={Hor_Cierre}
                onChange={(e) => setHor_Cierre(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
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

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Área Perteneciente:
            </label>
            <select
              id="id_area"
              value={Id_Area}
              onChange={(e) => setId_Area(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Área:</option>
              {Areas.map((area) => (
                <option key={area.Id_Area} value={area.Id_Area}>
                  {area.Nom_Area}
                </option>
              ))}
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

export default FormUnidades;
