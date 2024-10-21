import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTalentoHumano from "./formTalentoHumano.jsx";

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "talentoHumano";

const CrudTalentoHumano = () => {
  const [talentoHumanoList, setTalentoHumanoList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddTalentoHumano, setStateAddTalentoHumano] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setTalentoHumano({
      Id_Talento_Humano: "",
      Nom_Talento_Humano: "",
      Ape_Talento_Humano: "",
      Genero_Talento_Humano: "",
      Cor_Talento_Humano: "",
      Tel_Talento_Humano: "",
      Id_Ficha: "",
      Estado: "",
    });
  };

  const [talentoHumano, setTalentoHumano] = useState({
    Id_Talento_Humano: "",
    Nom_Talento_Humano: "",
    Ape_Talento_Humano: "",
    Genero_Talento_Humano: "",
    Cor_Talento_Humano: "",
    Tel_Talento_Humano: "",
    Id_Ficha: "",
    Estado: "",
  });
  const titleModul = ["REPORTE DE TALENTO HUMANO"];
  const titleForm = ["REGISTRAR TALENTO HUMANO"];
  const tableName = "TalentoHumano";

  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Género",
    "Correo",
    "Teléfono",
    "Ficha",
    "Estado",
    "Acciones",
  ];

  const ButtonsForOtherModules = (Id_Talento_Humano) => [
    <button
      onClick={() => [
        getTalentoHumano(Id_Talento_Humano),
        setStateAddTalentoHumano(true),
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
      onClick={() => deleteTalentoHumano(Id_Talento_Humano)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = talentoHumanoList.map((talento) => {
    const rowData = [
      talento.Id_Talento_Humano,
      talento.Nom_Talento_Humano,
      talento.Ape_Talento_Humano,
      talento.Genero_Talento_Humano,
      talento.Cor_Talento_Humano,
      talento.Tel_Talento_Humano,
      talento.fichas ? talento.fichas.Id_Ficha : "N/A",
      talento.Estado,
    ];
    rowData.push(ButtonsForOtherModules(talento.Id_Talento_Humano));
    return rowData;
  });

  const getAllTalentoHumano = async () => {
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
        setTalentoHumanoList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
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

  const getTalentoHumano = async (Id_Talento_Humano) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(
        `${URI}/${Id_Talento_Humano}`,
        config
      );
      if (respuestApi.status === 200) {
        setTalentoHumano({
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
        msg: "No Existen Registros de Talento Humano",
        error: true,
      });
      console.error(error);
    }
  };

  const deleteTalentoHumano = (Id_Talento_Humano) => {
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
            `/${URI}/${Id_Talento_Humano}`,
            config
          );
          if (respuestApi.status === 200) {
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
          getAllTalentoHumano();
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

  useEffect(() => {
    getAllTalentoHumano();
  }, []);

  return (
    <>
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Información de
        <span className="text-botones"> Talento Humano</span>
      </h1>

      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddTalentoHumano}
          setStateAddNewRow={setStateAddTalentoHumano}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormTalentoHumano
              buttonForm={buttonForm}
              talentoHumano={talentoHumano}
              updateTextButton={updateTextButton}
              setTalentoHumano={setTalentoHumano}
              getAllTalentoHumano={getAllTalentoHumano}
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
            data={formattedData}
            titleModul={titleModul}
            tableName={tableName}
          />
        )}
      </div>
    </>
  );
};

export default CrudTalentoHumano;
