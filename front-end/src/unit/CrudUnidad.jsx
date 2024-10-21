import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormUnidades from "./formUnidades.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "unidades";

const CrudUnidades = () => {
  const [unidadList, setUnidadList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUnidad, setStateAddUnidad] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setUnidad({
      Nom_Unidad: "",
      Hor_Apertura: "",
      Hor_Cierre: "",
      Estado: "",
      Id_Area: "",
    });
  };

  const [unidad, setUnidad] = useState({
    Nom_Unidad: "",
    Hor_Apertura: "",
    Hor_Cierre: "",
    Estado: "",
    Id_Area: "",
  });
  const titleModul = ["REPORTE DE UNIDADES"];
  const titleForm = ["REGISTRAR UNIDADES"];
  const tableName = "Unidades";

  const titles = [
    "ID",
    "Nombre Unidad",
    "Hora Apertura",
    "Hora Cierre",
    "Estado",
    "Area",
    "Acciones",
  ];

  const ButtonsForOtherModules = (Id_Unidad) => [
    <button
      onClick={() => [
        getUnidad(Id_Unidad),
        setStateAddUnidad(true),
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
      onClick={() => deleteUnidad(Id_Unidad)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = unidadList.map((unidad) => {
    const rowData = [
      unidad.Id_Unidad, // ID
      unidad.Nom_Unidad, // Nombre
      unidad.Hor_Apertura, // Hora Apertura
      unidad.Hor_Cierre, // Hora Cierre
      unidad.Estado, // Estado
      unidad.areas?.Nom_Area || "N/A", // Area (usando "N/A" si areas o Nom_Area es undefined)
    ];
    rowData.push(ButtonsForOtherModules(unidad.Id_Unidad));
    return rowData;
  });

  const getAllUnidades = async () => {
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
        setUnidadList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
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

  const getUnidad = async (Id_Unidad) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(`${URI}/${Id_Unidad}`, config);
      if (respuestApi.status === 200) {
        setUnidad({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: `Error al cargar los registros!`,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: `Error al cargar los registros!`,
        error: true,
      });
      console.error(error);
    }
  };

  const deleteUnidad = (Id_Unidad) => {
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
            `/${URI}/${Id_Unidad}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllUnidades(); // Refrescar la lista después de borrar
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

  useEffect(() => {
    getAllUnidades();
  }, []);

  return (
    <>
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las{" "}
        <span className="text-botones">Unidades</span>
      </h1>
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddUnidad}
          setStateAddNewRow={setStateAddUnidad}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormUnidades
              buttonForm={buttonForm}
              unidad={unidad}
              updateTextButton={updateTextButton}
              setUnidad={setUnidad}
              getAllUnidades={getAllUnidades}
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

export default CrudUnidades;
