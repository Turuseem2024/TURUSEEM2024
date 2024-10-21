/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const FormMemorandum = ({
  buttonForm,
  memorandum,
  updateTextButton,
  getAllMemorandum,
  stateButton,
  setStateButton,
}) => {
  const [Fec_Memorando, setFec_Memorando] = useState("");
  const [Mot_Memorando, setMot_Memorando] = useState("");
  const [Id_Aprendiz, setId_Aprendiz] = useState("");
  const [selectedAprenices, setSelectedAprendices] = useState(null);
  const [aprendices, setAprendices] = useState([]);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const fetcAprendiz = async () => {
      try {
        const token = ReactSession.get("token");
        const response = await clienteAxios.get("/aprendiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200) {
          setAprendices(response.data);
        }
      } catch (error) {
        console.error("Error fetching apprentices:", error);
      }
    };

    fetcAprendiz();
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();

    if (!Fec_Memorando) {
      setAlerta({
        msg: "La Fecha No Puede Estar Vacia",
        error: true,
      });
      return;
    }
    if (!Mot_Memorando) {
      setAlerta({
        msg: "El Motivo No Puede Ir Vacio",
        error: true,
      });
      return;
    }
    if (!Id_Aprendiz) {
      setAlerta({
        msg: "El Documento del Aprendiz No Puede Ir Vacio",
        error: true,
      });
      return;
    }
    // Validaciones básicas
    const soloTextoRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Solo letras y espacios

    if (!soloTextoRegex.test(Mot_Memorando)) {
      setAlerta({
        msg: "El motivo debe de Ser En Letras",
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
      if (buttonForm === "Actualizar") {
        const respuestApi = await clienteAxios.put(
          `/otrosmemorandos/${memorandum.Id_OtroMemorando}`,
          {
            Fec_OtroMemorando: Fec_Memorando,
            Mot_OtroMemorando: Mot_Memorando,
            Id_Aprendiz: Id_Aprendiz,
          },
          config
        );
        setStateButton(true)
        if (respuestApi.status == 200) {
          updateTextButton("Enviar");
          setAlerta({
            msg: respuestApi.data.message,
            error: false,
          });
          getAllMemorandum();
          clearForm();
        }
      } else if (buttonForm === "Enviar") {
        const respuestApi = await clienteAxios.post(
          "/otrosmemorandos",
          {
            Fec_OtroMemorando: Fec_Memorando,
            Mot_OtroMemorando: Mot_Memorando,
            Id_Aprendiz: Id_Aprendiz,
          },
          config
        );
        if (respuestApi.status == 201) {
          setAlerta({
            msg: respuestApi.data.message,
            error: false,
          });
          getAllMemorandum();
          clearForm();
        } else {
          alert(respuestApi.data.message);
        }
      }
      clearForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const clearForm = () => {
    setFec_Memorando("");
    setMot_Memorando("");
    setId_Aprendiz("");
  };

  const setData = () => {
    setFec_Memorando(memorandum.Fec_OtroMemorando);
    setMot_Memorando(memorandum.Mot_OtroMemorando);
    setId_Aprendiz(memorandum.Id_Aprendiz);
    const selected = aprendices.find(
      (aprendiz) => aprendiz.Id_Aprendiz === memorandum.Id_Aprendiz
    );
    setSelectedAprendices(selected || null);
  };

  useEffect(() => {
    setData();
  }, [memorandum]);
  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="memorandumForm"
          action=""
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-3xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

          <div className="gap-4 grid">
            <div className="space-y-2">
              <label
                htmlFor="dateMemorandum"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha Memorando
              </label>
              <input
                type="date"
                id="dateMemorandum"
                value={Fec_Memorando}
                onChange={(e) => setFec_Memorando(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="motivoMemorando"
                className="block text-sm font-medium text-gray-700"
              >
                Motivo Memorando
              </label>
              <textarea
                id="motivoMemorando"
                placeholder="Motivo del Memorando"
                value={Mot_Memorando}
                onChange={(e) => setMot_Memorando(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Aprendiz:
              </label>
              <select
                id="id_area"
                value={Id_Aprendiz}
                onChange={(e) => setId_Aprendiz(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione el Documento de Aprendiz:</option>
                {aprendices.map((aprendiz) => (
                  <option
                    key={aprendiz.Id_Aprendiz}
                    value={aprendiz.Id_Aprendiz}
                  >
                    {aprendiz.Id_Aprendiz}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="mt-3" />
          <div className="flex justify-around mt-2">
            <input
              type="submit"
              id="button"
              value={buttonForm}
              className="bg-botones w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-botoneshover md:w-auto"
              aria-label="Enviar"
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

export default FormMemorandum;
