import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import FormTurnosRutinarios from "./FormTurnosRutinarios.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import { Outlet } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "/turnorutinario/";

const CrudTurnosRutinarios = () => {
  const [turnoRutinarioList, setTurnoRutinarioList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddturnoRutinario, setStateAddturnoRutinario] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // const CerrarModal = ()=>{
  //   setIsOpen(!isOpen)
  // }

  const resetForm = () => {
    setTurnoRutinario({
      Fec_InicioTurno: "",
      Fec_FinTurno: "",
      Hor_InicioTurno: "",
      Hor_FinTurno: "",
      Obs_TurnoRutinario: "",
      Ind_Asistencia: "",
      Id_Aprendiz: "",
      Id_Unidad: "",
    });
  };

  const [turnoRutinario, setTurnoRutinario] = useState({
    Fec_InicioTurno: "",
    Fec_FinTurno: "",
    Hor_InicioTurno: "",
    Hor_FinTurno: "",
    Obs_TurnoRutinario: "",
    Ind_Asistencia: "",
    Id_Aprendiz: "",
    Id_Unidad: "",
  });

  const titleModul = ["REPORTE DE TURNOS RUTINARIOS"];
  const titleForm = ["CREAR TURNOS RUTINARIOS"];
  const tableName = "TurnosRutinarios";

  const titles = [
    "ID",
    "Fecha Inicio",
    "Fecha Fin",
    "Hora Inicio Turno",
    "Hora Fin Turno",
    "Observaciones del Turno",
    "Indicador Asistencia",
    "Documento Aprendiz",
    "Nombre Aprendiz",
    "Numero Ficha Aprendiz",
    "Nombre Unidad",
    // shouldShowPhoto && "Foto Aprendiz",
    "Acciones",
  ].filter(Boolean);

  const ButtonsForOtherModules = (Id_TurnoRutinario) => [
    <button
      onClick={() => [
        getTurnoRutinario(Id_TurnoRutinario),
        setStateAddturnoRutinario(true),
        toggleModal(),
        setStateButton(false),
        
      ]}
      title="Editar"
      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
      key="get"
    >
      <FaRegEdit />
    </button>,
    <button
      onClick={() => deleteTurnoRutinario(Id_TurnoRutinario)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = turnoRutinarioList.map((turnoRutinario) => {
    const rowData = [
      turnoRutinario.Id_TurnoRutinario,
      turnoRutinario.Fec_InicioTurno,
      turnoRutinario.Fec_FinTurno,
      turnoRutinario.Hor_InicioTurno,
      turnoRutinario.Hor_FinTurno,
      turnoRutinario.Obs_TurnoRutinario,
      turnoRutinario.Ind_Asistencia,
      turnoRutinario.Id_Aprendiz,
      turnoRutinario.aprendiz.Nom_Aprendiz + " " +turnoRutinario.aprendiz.Ape_Aprendiz,
      turnoRutinario.aprendiz.fichas.Id_Ficha,
      turnoRutinario.unidad?.Nom_Unidad,
    ];
    rowData.push(ButtonsForOtherModules(turnoRutinario.Id_TurnoRutinario));
    return rowData;
  });

  useEffect(() => {
    getAllTurnosRutinarios();
  }, []);

  const getAllTurnosRutinarios = async () => {
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
        setTurnoRutinarioList(respuestApi.data);
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

  const getTurnoRutinario = async (Id_TurnoRutinario) => {
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
        `${URI}/${Id_TurnoRutinario}`,
        config
      );
      if (respuestApi.status === 200) {
        setTurnoRutinario(respuestApi.data);
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

  const deleteTurnoRutinario = (Id_TurnoRutinario) => {
    if (!Id_TurnoRutinario) {
      console.error("El ID del turno rutinario no es válido");
      return;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
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
            `${URI}/${Id_TurnoRutinario}`,
            config
          );
          if (respuestApi.status === 200) {
            // Actualiza el estado para eliminar el turno de la tabla
            setTurnoRutinarioList(
              turnoRutinarioList.filter(
                (turno) => turno.id !== Id_TurnoRutinario
              )
            );
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
            getAllTurnosRutinarios();
          } else {
            Swal.fire({
              title: "Error!",
              text: respuestApi.data.message,
              icon: "error",
            });
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
        Gestionar Información de los{" "}
        <span className="text-botones"> Turnos Rutinarios</span>
      </h1>

      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddturnoRutinario}
          setStateAddNewRow={setStateAddturnoRutinario}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          resetForm={resetForm}
          updateTextButtom={updateTextButton}
          titleForm={titleForm}
          setStateButton={setStateButton}
          
          form={
            <FormTurnosRutinarios
              buttonForm={buttonForm}
              turnoRutinario={turnoRutinario}
              updateTextButton={updateTextButton}
              getAllTurnosRutinarios={getAllTurnosRutinarios}
              stateButton={stateButton}
              setStateButton={setStateButton}
              // CerrarModal ={CerrarModal}
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
      <hr />
      <Outlet />
    </>
  );
};

export default CrudTurnosRutinarios;
