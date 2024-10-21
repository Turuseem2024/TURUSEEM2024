import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormFuncionarios from "./formFuncionarios.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "funcionarios";

const CrudFuncionarios = () => {
  const [funcionarioList, setFuncionarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFuncionario, setStateAddFuncionario] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setFuncionario({
      Id_Funcionario: "",
      Nom_Funcionario: "",
      Ape_Funcionario: "",
      Genero: "",
      Tel_Funcionario: "",
      Estado: "",
      Cargo: "",
    });
  };

  const [funcionario, setFuncionario] = useState({
    Id_Funcionario: "",
    Nom_Funcionario: "",
    Ape_Funcionario: "",
    Genero: "",
    Tel_Funcionario: "",
    Estado: "",
    Cargo: "",
  });
  const titleModul = ["REPORTE DE FUNCIONARIOS"];
  const titleForm = ["REGISTRAR FUNCIONARIOS"];
  const tableName = "Funcionarios";

  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Género",
    "Teléfono",
    "Estado",
    "Cargo",
    "Acciones",
  ];

  const ButtonsForOtherModules = (Id_Funcionario) => [
    <button
      onClick={() => [
        getFuncionario(Id_Funcionario),
        setStateAddFuncionario(true),
        toggleModal(),
        setStateButton(false),
      ]}
      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
      key="get"
      title="Editar"
    >
      <FaRegEdit />
    </button>,
    <button
      onClick={() => deleteFuncionario(Id_Funcionario)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = funcionarioList.map((funcionario) => {
    const rowData = [
      funcionario.Id_Funcionario,
      funcionario.Nom_Funcionario,
      funcionario.Ape_Funcionario,
      funcionario.Genero,
      funcionario.Tel_Funcionario,
      funcionario.Estado,
      funcionario.Cargo,
    ];
    rowData.push(ButtonsForOtherModules(funcionario.Id_Funcionario));
    return rowData;
  });

  useEffect(() => {
    getAllFuncionarios();
  }, []);

  const getAllFuncionarios = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(URI, config);
      if (respuestApi.status === 200) {
        setFuncionarioList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const getFuncionario = async (Id_Funcionario) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios.get(
        `/${URI}/${Id_Funcionario}`,
        config
      );
      if (respuestApi.status === 200) {
        setFuncionario({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar los registros!",
        error: true,
      });
      console.error(error);
    }
  };

  const deleteFuncionario = (Id_Funcionario) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = ReactSession.get("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const respuestApi = await clienteAxios.delete(
            `${URI}/${Id_Funcionario}`,
            config
          );
          if (respuestApi.status == 200) {
            getAllFuncionarios();
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "No puedes Borrar Este Registro Porque Esta Asociado A Un Formulario",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de los
        <span className="text-botones"> Funcionarios</span>
      </h1>
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddFuncionario}
          setStateAddNewRow={setStateAddFuncionario}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormFuncionarios
              buttonForm={buttonForm}
              funcionario={funcionario}
              updateTextButton={updateTextButton}
              setFuncionario={setFuncionario}
              getAllFuncionarios={getAllFuncionarios}
              stateButton={stateButton}
              setStateButton={setStateButton}
            />
          }
        />
      </div>
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            titleModul={titleModul}
            tableName={tableName}
          />
        )}
      </div>
      <hr />
    </>
  );
};

export default CrudFuncionarios;
