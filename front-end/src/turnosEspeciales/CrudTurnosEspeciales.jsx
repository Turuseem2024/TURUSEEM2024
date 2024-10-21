import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormTurnosEspeciales from "./FormTurnosEspeciales.jsx";

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import ModalTurnoEspeciales from "../ModalWindow/ModalTurnoEspeciales.jsx";

const URI = "/turnoespecial";
const URI2 = "/turEspAprendiz";
const URI_FOTOS = "/public/uploads/";
const URI_AXIOS = import.meta.env.VITE_BACKEND_URL;

const CrudTurnosEspeciales = () => {
  const [turnoEspecialList, setTurnoEspecialList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoEspecial, setStateAddturnoEspecial] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTurnos, setIsOpenTurnos] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalTurnos = () => {
    setIsOpenTurnos(!isOpenTurnos);
  };

  const resetForm = () => {
    setTurnoEspecial({
      Fec_TurnoEspecial: "",
      Hor_Inicio: "",
      Hor_Fin: "",
      Obs_TurnoEspecial: "",
      Tot_AprendicesAsistieron: "",
      Id_Ficha: "",
      Img_Asistencia: "",
      Id_Funcionario: "",
      Id_Unidad: "",
    });
  };
  const [turnoEspecial, setTurnoEspecial] = useState({
    Id_TurnoEspecial: "",
    Fec_TurnoEspecial: "",
    Hor_Inicio: "",
    Hor_Fin: "",
    Obs_TurnoEspecial: "",
    Tot_AprendicesAsistieron: "",
    Id_Ficha: "",
    Img_Asistencia: "",
    Id_Funcionario: "",
    Id_Unidad: "",
  });
  const [turnoEspecialAprendiz, setTurnoEspecialAprendiz] = useState([]);

  const titleModul = ["REPORTE DE TURNOS ESPECIALES"];
  const titleForm = ["CREAR TURNOS ESPECIALES"];
  const tableName = "TurnosEspeciales";

  const shouldShowPhoto = turnoEspecialList.some(
    (row) => row.Img_Asistencia !== undefined
  );
  
  const titles = [
    "ID",
    "Fecha Turno",
    "Hora Inicio",
    "Hora Fin",
    "Observaciones",
    "Total Aprendices",
    "Ficha",
    // "Imagen Asistencia",
    "Documento Funcionario",
    "Nombre Funcionario",
    "Unidad",
    shouldShowPhoto && "Archivo Asistencia",
    "Acciones",
  ].filter(Boolean);

  const ButtonsForOtherModules = (Id_TurnoEspecial) => [
    <button
      onClick={() => [
        getTurnoEspecial(Id_TurnoEspecial),
        setStateAddturnoEspecial(true),
        toggleModal(),
        setStateButton(false),
      ]}
      className="text-blue-500 hover:text-blue-700 mr-3 p-1 rounded"
      key="get"
      title="Editar"
    >
      <FaRegEdit />
    </button>,
    <button
      onClick={() => deleteTurnoEspecial(Id_TurnoEspecial)}
      className="text-red-500 hover:text-red-700 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
    <button
      onClick={() => [toggleModalTurnos(), getTurnoEspecialAprendiz(Id_TurnoEspecial)]}
      className="text-botones hover:text-botoneshover p-1 rounded"
      key="view"
      title="Ver Asistencia"
    >
      <FaClipboardList />
    </button>,
  ];

  const formattedData = turnoEspecialList.map((turnoEspecial) => {
    const rowData = [
      turnoEspecial.Id_TurnoEspecial,
      turnoEspecial.Fec_TurnoEspecial,
      turnoEspecial.Hor_Inicio,
      turnoEspecial.Hor_Fin,
      turnoEspecial.Obs_TurnoEspecial,
      turnoEspecial.Tot_AprendicesAsistieron,
      turnoEspecial.Id_Ficha,
      turnoEspecial.Id_Funcionario,
      turnoEspecial.funcionario.Nom_Funcionario + " "+ turnoEspecial.funcionario.Ape_Funcionario,
      turnoEspecial.unidad.Nom_Unidad,
    ];

    if (shouldShowPhoto) {
      rowData.push(
        <img
          width="80px"
          src={`${URI_AXIOS}${URI_FOTOS}${turnoEspecial.Img_Asistencia}`}
          alt="No Foto"
        />
      );
    }
    rowData.push(ButtonsForOtherModules(turnoEspecial.Id_TurnoEspecial));

    return rowData;
  });

  useEffect(() => {
    getAllTurnosEspeciales();
  }, []);

  const getAllTurnosEspeciales = async () => {
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
        setTurnoEspecialList(respuestApi.data);
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
      console.error(error);
    }
  };
  
  const getTurnoEspecial = async (Id_TurnoEspecial) => {
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
        `${URI}/${Id_TurnoEspecial}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoEspecial({
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
  const getTurnoEspecialAprendiz = async (Id_TurnoEspecial) => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios(
        `${URI2}/${Id_TurnoEspecial}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoEspecialAprendiz(respuestApi.data);   
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
  const deleteTurnoEspecial = (Id_TurnoEspecial) => {
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
            `${URI}/${Id_TurnoEspecial}`,
            config
          );
          if (respuestApi.status === 200) {
            getAllTurnosEspeciales(); // Refrescar la lista después de borrar
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
        <span className="text-botones"> Turnos Especiales</span>
      </h1>
      <ModalTurnoEspeciales
        toggleModalTurnos={toggleModalTurnos}
        isOpenTurnos={isOpenTurnos}
        turnoEspecialAprendiz={turnoEspecialAprendiz}
      />
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddturnoEspecial}
          setStateAddNewRow={setStateAddturnoEspecial}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          form={
            <FormTurnosEspeciales
              buttonForm={buttonForm}
              turnoEspecial={turnoEspecial}
              updateTextButton={updateTextButton}
              getAllTurnosEspeciales={getAllTurnosEspeciales}
              stateButton={stateButton}
              setStateButton={setStateButton}
            />
          }
        />
      </div>

      <div className="overflow-x-auto">
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        <hr />
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

export default CrudTurnosEspeciales;
