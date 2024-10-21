/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from "react-client-session";
import Alerta from "../components/Alerta";

const FormFuncionarios = ({
  buttonForm,
  funcionario,
  updateTextButton,
  getAllFuncionarios,
  stateButton,
  setStateButton,
}) => {
  const [Id_Funcionario, setId_Funcionario] = useState("");
  const [Nom_Funcionario, setNom_Funcionario] = useState("");
  const [Ape_Funcionario, setApe_Funcionario] = useState("");
  const [Genero, setGenero] = useState("");
  const [Tel_Funcionario, setTel_Funcionario] = useState("");
  const [Estado, setEstado] = useState("");
  const [Cargo, setCargo] = useState("");
  const [alerta, setAlerta] = useState({});

  const sendForm = async (e) => {
    e.preventDefault();

    if (!Id_Funcionario || Id_Funcionario.length < 7) {
      setAlerta({
        msg: "El Documento No Puede Tener Menos de 7 Digitos",
        error: true,
      });
      return;
    }

    if (!Nom_Funcionario) {
      setAlerta({
        msg: "El Nombre Esta Vacio",
        error: true,
      });
      return;
    }

    if (!Ape_Funcionario) {
      setAlerta({
        msg: "El Apellido no puede Estar Vacio",
        error: true,
      });
      return;
    }

    if (!Genero) {
      setAlerta({
        msg: "El Genero No puede Estar Vacio",
        error: true,
      });
      return;
    }

    if (!Tel_Funcionario || Tel_Funcionario < 9) {
      setAlerta({
        msg: "El Telefono No puede tener menos de 9 Digitos",
        error: true,
      });
      return;
    }
    if (!Estado) {
      setAlerta({
        msg: "El Estado No puede Estar Vacio",
        error: true,
      });
      return;
    }

    if (!Cargo) {
      setAlerta({
        msg: "El Cargo No puede Estar Vacio",
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

    // Validaciones básicas
    const soloTextoRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Solo letras y espacios

    // Validar que los campos de texto solo contengan letras
    if (!soloTextoRegex.test(Nom_Funcionario)) {
      setAlerta({
        msg: "El campo de Nombre solo debe contener letras.",
        error: true,
      });
      return;
    }
    // Validar que los campos de texto solo contengan letras
    if (!soloTextoRegex.test(Ape_Funcionario)) {
      setAlerta({
        msg: "El campo de Apellido solo debe contener letras.",
        error: true,
      });
      return;
    }

    let numbers = /^\d*$/;

    if (!numbers.test(Tel_Funcionario)) {
      setAlerta({
        msg: "El campo de Telefono solo debe contener Numeros.",
        error: true,
      });
      return;
    }

    try {
      let mensajeCRUD = "";
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/funcionarios/${funcionario.Id_Funcionario}`,
          {
            Id_Funcionario,
            Nom_Funcionario,
            Ape_Funcionario,
            Genero,
            Tel_Funcionario,
            Estado,
            Cargo,
          },
          config
        );
        setStateButton(true);
        mensajeCRUD = "Funcionario actualizado correctamente!";
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/funcionarios`,
          {
            Id_Funcionario,
            Nom_Funcionario,
            Ape_Funcionario,
            Genero,
            Tel_Funcionario,
            Estado,
            Cargo,
          },
          config
        );
        mensajeCRUD = "Funcionado Registrado correctamente!";
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
        setAlerta({
          msg: mensajeCRUD,
          error: false,
        });
        clearForm();
        getAllFuncionarios();
        updateTextButton("Enviar");
      } else {
        setAlerta({
          msg: "Ha ocurrido un error!",
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
    setId_Funcionario("");
    setNom_Funcionario("");
    setApe_Funcionario("");
    setGenero("");
    setTel_Funcionario("");
    setEstado("");
    setCargo("");
  };

  const setData = () => {
    setId_Funcionario(funcionario.Id_Funcionario);
    setNom_Funcionario(funcionario.Nom_Funcionario);
    setApe_Funcionario(funcionario.Ape_Funcionario);
    setGenero(funcionario.Genero);
    setTel_Funcionario(funcionario.Tel_Funcionario);
    setEstado(funcionario.Estado);
    setCargo(funcionario.Cargo);
  };

  useEffect(() => {
    setData();
  }, [funcionario]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          id="funcionarioForm"
          onSubmit={sendForm}
          className="bg-white rounded-2xl px-8 pb-6 w-full max-w-4xl"
        >
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Documento
            </label>
            <input
              type="number"
              id="id_funcionario"
              placeholder="Documento Funcionario"
              value={Id_Funcionario}
              onChange={(e) => { 
                const {value} = e.target
                if(value.length <= 10)
                  if (value === '' || (Number(value) > 0 && value.length <= 10)) {
                    setId_Funcionario(value);
                  }
              }}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              disabled={buttonForm === "Actualizar"}
            />
          </div>
          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombres"
                value={Nom_Funcionario}
                onChange={(e) => setNom_Funcionario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellidos"
                value={Ape_Funcionario}
                onChange={(e) => setApe_Funcionario(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              id="genero"
              value={Genero}
              onChange={(e) => setGenero(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="number"
              id="telefono"
              placeholder="Teléfono"
              value={Tel_Funcionario}
              onChange={(e) => {
                const {value} = e.target
              if(value.length <= 10)
                if (value === '' || (Number(value) > 0 && value.length <= 10)) {
                  setTel_Funcionario(value);
                }
              }}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            />
          </div>
          <div className="flex items-center mb-3 space-x-4">
            <div className="w-1/2">
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

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Cargo
              </label>
              <select
                id="cargo"
                value={Cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              >
                <option value="">Seleccione un Cargo</option>
                <option value="Planta">Planta</option>
                <option value="Contratista">Contratista</option>
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
            />
            {stateButton && (
              <input
                type="button"
                id="button"
                value="Limpiar"
                onClick={() => {
                  clearForm();
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

export default FormFuncionarios;
