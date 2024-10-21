/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from "react-client-session";
import { error } from "jquery";

const FormTalentoHumano = ({
  buttonForm,
  talentoHumano,
  updateTextButton,
  getAllTalentoHumano,
  stateButton,
  setStateButton,
}) => {
  const [Id_Talento_Humano, setId_Talento_Humano] = useState("");
  const [Nom_Talento_Humano, setNom_Talento_Humano] = useState("");
  const [Ape_Talento_Humano, setApe_Talento_Humano] = useState("");
  const [Genero_Talento_Humano, setGen_Talento_Humano] = useState("");
  const [Cor_Talento_Humano, setCor_Talento_Humano] = useState("");
  const [Tel_Talento_Humano, setTel_Talento_Humano] = useState("");
  const [Id_Ficha, setId_Ficha] = useState("");
  const [Estado, setEstado] = useState("");
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [Ficha, setFicha] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get("/fichas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setFicha(response.data); // Aquí guardas las fichas en el estado
        }
      } catch (error) {
        console.error("Error fetching ficha:", error);
      }
    };

    fetchFichas();
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();

    // Verificar campo por campo y mostrar alerta si está vacío
    if (!Id_Talento_Humano || Id_Talento_Humano.length < 7) {
      setAlerta({
        msg: "El Campo Documento Debe Tener Minimo 7 Digitos.",
        error: true,
      });
      return;
    }
    if (!Nom_Talento_Humano) {
      setAlerta({
        msg: "El campo Nombre está vacío.",
        error: true,
      });
      return;
    }
    if (!Nom_Talento_Humano) {
      setAlerta({
        msg: "El campo Nombre está vacío.",
        error: true,
      });
      return;
    }
    if (!Ape_Talento_Humano) {
      setAlerta({
        msg: "El campo Apellido está vacío.",
        error: true,
      });
      return;
    }
    if (!Genero_Talento_Humano) {
      setAlerta({
        msg: "El campo Genero está vacío.",
        error: true,
      });
      return;
    }
    if (!Cor_Talento_Humano) {
      setAlerta({
        msg: "El campo Correro está vacío.",
        error: true,
      });
      return;
    }

    if (!Tel_Talento_Humano) {
      setAlerta({
        msg: "El campo Telefono está vacío.",
        error: true,
      });
      return;
    }
    if (!Id_Ficha) {
      setAlerta({
        msg: "El campo Ficha está vacío.",
        error: true,
      });
      return;
    }
    if (!Estado) {
      setAlerta({
        msg: "El campo Nombre está vacío.",
        error: true,
      });
      return;
    }

    const soloTextoRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Solo letras y espacios

    if (!soloTextoRegex.test(Nom_Talento_Humano)) {
      setAlerta({
        msg: "El campo Nombre solo permite Letras",
        error: true,
      });
      return;
    }
    if (!soloTextoRegex.test(Ape_Talento_Humano)) {
      setAlerta({
        msg: "El campo Apellido solo permite Letras",
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
      let successMessage = "";
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/talentoHumano/${talentoHumano.Id_Talento_Humano}`,
          {
            Nom_Talento_Humano,
            Ape_Talento_Humano,
            Genero_Talento_Humano,
            Cor_Talento_Humano,
            Tel_Talento_Humano,
            Id_Ficha,
            Estado,
          },
          config
        );
        setStateButton(true);
        successMessage = "Talento Humano actualizado correctamente!";
        updateTextButton("Enviar");
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/talentoHumano`,
          {
            Id_Talento_Humano,
            Nom_Talento_Humano,
            Ape_Talento_Humano,
            Genero_Talento_Humano,
            Cor_Talento_Humano,
            Tel_Talento_Humano,
            Id_Ficha,
            Estado,
          },
          config
        );
        successMessage = "Talento Humano Registrado correctamente!";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: successMessage,
          error: false,
        });
        clearForm();
        updateTextButton("Enviar");
        getAllTalentoHumano();
      } else {
        setAlerta({
          msg: respuestApi.data.message,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios o Documento Repetido!",
        error: true,
      });
    }
  };

  const clearForm = () => {
    setId_Talento_Humano(""),
      setNom_Talento_Humano(""),
      setApe_Talento_Humano(""),
      setGen_Talento_Humano(""),
      setCor_Talento_Humano(""),
      setTel_Talento_Humano(""),
      setId_Ficha(""),
      setEstado("");
  };

  const setData = () => {
    setId_Talento_Humano(talentoHumano.Id_Talento_Humano);
    setNom_Talento_Humano(talentoHumano.Nom_Talento_Humano);
    setApe_Talento_Humano(talentoHumano.Ape_Talento_Humano);
    setGen_Talento_Humano(talentoHumano.Genero_Talento_Humano);
    setCor_Talento_Humano(talentoHumano.Cor_Talento_Humano);
    setTel_Talento_Humano(talentoHumano.Tel_Talento_Humano);
    setId_Ficha(talentoHumano.Id_Ficha);
    // Verifica que Ficha esté disponible antes de buscar
    const selected = Ficha.find(
      (ficha) => ficha.Id_Ficha === talentoHumano.Id_Ficha
    );
    setSelectedFicha(selected || null);

    setEstado(talentoHumano.Estado);
  };

  useEffect(() => {
    setData();
  }, [talentoHumano]);

  useEffect(() => {
    if (talentoHumano) {
      setId_Talento_Humano(talentoHumano.Id_Talento_Humano || "");
      setNom_Talento_Humano(talentoHumano.Nom_Talento_Humano || "");
      setApe_Talento_Humano(talentoHumano.Ape_Talento_Humano || "");
      setGen_Talento_Humano(talentoHumano.Genero_Talento_Humano || "");
      setCor_Talento_Humano(talentoHumano.Cor_Talento_Humano || "");
      setTel_Talento_Humano(talentoHumano.Tel_Talento_Humano || "");
      setId_Ficha(talentoHumano.Id_Ficha || "");
      setEstado(talentoHumano.Estado || "");
    }
  }, [talentoHumano]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="humanTalentForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-5xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Documento Talento Humano
              </label>
              <input
                type="number"
                id="documento"
                placeholder="Documento"
                value={Id_Talento_Humano}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length <= 10) {
                    if (value === '' || (Number(value) > 0 && value.length <= 10)) {
                      setId_Talento_Humano(value);
                    }
                  }
                }}
                disabled={buttonForm === "Actualizar"}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre Talento Humano
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre"
                value={Nom_Talento_Humano}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length <= 30) {
                    setNom_Talento_Humano(value);
                  }
                }}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Apellido Talento Humano
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellido"
                value={Ape_Talento_Humano}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length <= 40) {
                    setApe_Talento_Humano(value);
                  }
                }}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Género
              </label>
              <select
                id="genero"
                value={Genero_Talento_Humano}
                onChange={(e) => setGen_Talento_Humano(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione un Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Correo Talento Humano
              </label>
              <input
                type="email"
                id="correo"
                placeholder="Correo"
                value={Cor_Talento_Humano}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length <= 60) {
                    setCor_Talento_Humano(value);
                  }
                }}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Teléfono Talento Humano
              </label>
              <input
                type="number"
                id="telefono"
                placeholder="Teléfono"
                value={Tel_Talento_Humano}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length <= 10) {
                    if (value === '' || (Number(value) > 0 && value.length <= 10)) {
                      setTel_Talento_Humano(value);
                    }
                  }
                }}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ficha Perteneciente
              </label>
              <select
                id="id_ficha"
                value={Id_Ficha}
                onChange={(e) => setId_Ficha(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione una Ficha</option>
                {Ficha.map((fichas) => (
                  <option key={fichas.Id_Ficha} value={fichas.Id_Ficha}>
                    {fichas.Id_Ficha}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="estado"
                value={Estado}
                onChange={(e) => setEstado(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione un Estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <hr className="mt-3" />
          <div className="mt-2 flex justify-around">
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

export default FormTalentoHumano;
