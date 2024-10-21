/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";

const FormProgramaFormacion = ({
  buttonForm,
  programa,
  updateTextButton,
  getAllProgramas,
  stateButton,
  setStateButton,
}) => {
  const [Nom_ProgramaFormacion, setNom_ProgramaFormacion] = useState("");
  const [Tip_ProgramaFormacion, setTip_ProgramaFormacion] = useState("");
  const [Id_Area, setId_Area] = useState("");
  // eslint-disable-next-line no-unused-vars
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
    if (!Nom_ProgramaFormacion) {
      setAlerta({
        msg: "El Nombre Del Programa Esta Vacio",
        error: true,
      });
      return;
    }
    if (!Tip_ProgramaFormacion) {
      setAlerta({
        msg: "El Tipo De Programa Esta Vacio",
        error: true,
      });
      return;
    }
    if (!Id_Area) {
      setAlerta({
        msg: "El Nombre Del Area Esta Vacio",
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
          `/programa/${programa.Id_ProgramaFormacion}`,
          {
            Nom_ProgramaFormacion,
            Tip_ProgramaFormacion,
            Id_Area,
          },
          config
        );
        setStateButton(true);
        mensajeCRUD = "Programa Actualizado Exitosamente";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/programa`,
          {
            Nom_ProgramaFormacion,
            Tip_ProgramaFormacion,
            Id_Area,
          },
          config
        );
        mensajeCRUD = "Programa Registrado Exitosamente";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });
        clearForm();
        getAllProgramas();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: "Error al realizar el registro!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      console.log(error);
    }
  };

  const clearForm = () => {
    setNom_ProgramaFormacion("");
    setTip_ProgramaFormacion("");
    setId_Area("");
    setSelectedArea(null);
  };

  const setData = () => {
    setNom_ProgramaFormacion(programa.Nom_ProgramaFormacion);
    setTip_ProgramaFormacion(programa.Tip_ProgramaFormacion);
    setId_Area(programa.Id_Area);
    const selected = Areas.find((area) => area.Id_Area === programa.Id_Area);
    setSelectedArea(selected || null);
  };

  useEffect(() => {
    setData();
  }, [programa]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="apprenticeForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-3xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Nombre Programa
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={Nom_ProgramaFormacion}
              onChange={(e) => setNom_ProgramaFormacion(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Tipo:
            </label>
            <select
              id="tipo"
              value={Tip_ProgramaFormacion}
              onChange={(e) => setTip_ProgramaFormacion(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="No envio">Seleccione</option>
              <option value="Tecnologo">Tecnologo</option>
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

export default FormProgramaFormacion;
