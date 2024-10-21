import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormProgramaFormacion from "./formProgramaFormacion.jsx";
import Alerta from "../components/Alerta.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "programa";

const CrudPrograma = () => {
  const [programaList, setProgramaList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddPrograma, setStateAddPrograma] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setPrograma({
      Nom_ProgramaFormacion: "",
      Tip_ProgramaFormacion: "",
      Id_Area: "",
    });
  };

  const [programa, setPrograma] = useState({
    Nom_ProgramaFormacion: "",
    Tip_ProgramaFormacion: "",
    Id_Area: "",
  });
  const titleModul = ["REPORTE DE PROGRAMAS DE FORMACION"];
  const titleForm = ["REGISTRAR PROGRAMAS DE FORMACION"];
  const tableName = "Programas";

  const titles = [
    "Id",
    "Nombre del Programa",
    "Tipo del Programa",
    "Área",
    "Acción",
  ].filter(Boolean);

  const ButtonsForOtherModules = (Id_ProgramaFormacion) => [
    <button
      onClick={() => [
        getPrograma(Id_ProgramaFormacion),
        setStateAddPrograma(true),
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
      onClick={() => deletePrograma(Id_ProgramaFormacion)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formatteData = programaList.map((programa) => {
    const rowData = [
      programa.Id_ProgramaFormacion,
      programa.Nom_ProgramaFormacion,
      programa.Tip_ProgramaFormacion,
      programa.areas?.Nom_Area,
    ];
    rowData.push(ButtonsForOtherModules(programa.Id_ProgramaFormacion));
    return rowData;
  });

  useEffect(() => {
    getAllProgramas();
  }, []);

  const getAllProgramas = async () => {
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
        setProgramaList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los programas de formacion.`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const getPrograma = async (Id_ProgramaFormacion) => {
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
        `${URI}/${Id_ProgramaFormacion}`,
        config
      );
      if (respuestApi.status === 200) {
        setPrograma({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: `Error al cargar los programas!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
      console.error(error);
    }
  };

  const deletePrograma = (Id_ProgramaFormacion) => {
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
            `/${URI}/${Id_ProgramaFormacion}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllProgramas(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El programa ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Hubo un problema al intentar borrar el programa.",
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
        {" "}
        Gestionar Informacion de los{" "}
        <span className="text-botones"> Programas de Formacion</span>
      </h1>
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddPrograma}
          setStateAddNewRow={setStateAddPrograma}
          resetForm={resetForm}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormProgramaFormacion
              buttonForm={buttonForm}
              programa={programa}
              updateTextButton={updateTextButton}
              setPrograma={setPrograma}
              getAllProgramas={getAllProgramas}
              stateButton={stateButton}
              setStateButton={setStateButton}
            />
          }
        />
      </div>

      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formatteData}
            deleteRow={deletePrograma}
            getRow={getPrograma}
            setStateAddNewRow={setStateAddPrograma}
            toggleModal={toggleModal} // Aquí pasamos la función
            titleModul={titleModul}
            tableName={tableName}
            buttons={ButtonsForOtherModules}
          />
        )}
      </div>
    </>
  );
};

export default CrudPrograma;
