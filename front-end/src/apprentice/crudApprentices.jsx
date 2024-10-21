import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";

import FormApprentices from "./formApprentices.jsx";
import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";

import { FaArrowCircleDown } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const URI = "/aprendiz/";

const URIFOTOS = "/public/uploads/";
const URI_AXIOS = import.meta.env.VITE_BACKEND_URL;

const CrudApprentices = () => {
  const [apprenticeList, setApprenticeList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddApprentice, setStateAddApprentice] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setApprentice({
      Id_Aprendiz: "",
      Nom_Aprendiz: "",
      Ape_Aprendiz: "",
      Id_Ficha: "",
      Fec_Nacimiento: "",
      Id_Ciudad: "",
      Lugar_Residencia: "",
      Edad: "",
      Hijos: "",
      Nom_Eps: "",
      Tel_Padre: "",
      Gen_Aprendiz: "",
      Cor_Aprendiz: "",
      Tel_Aprendiz: "",
      Tot_Memorandos: "",
      Tot_Inasistencias: "",
      Patrocinio: "",
      Estado: "",
      Nom_Empresa: "",
      CentroConvivencia: "",
      Foto_Aprendiz: "",
    });
  };

  const [apprentice, setApprentice] = useState({
    Id_Aprendiz: "",
    Nom_Aprendiz: "",
    Ape_Aprendiz: "",
    Id_Ficha: "",
    Fec_Nacimiento: "",
    Id_Ciudad: "",
    Lugar_Residencia: "",
    Edad: "",
    Hijos: "",
    Nom_Eps: "",
    Tel_Padre: "",
    Gen_Aprendiz: "",
    Cor_Aprendiz: "",
    Tel_Aprendiz: "",
    Tot_Memorandos: "",
    Tot_Inasistencias: "",
    Patrocinio: "",
    Estado: "",
    Nom_Empresa: "",
    CentroConvivencia: "",
    Foto_Aprendiz: "",
  });
  const shouldShowPhoto = apprenticeList.some(
    (row) => row.Foto_Aprendiz !== undefined
  );
  const titleModul = ["REPORTE DE APRENDICES"];
  const titleForm = ["REGISTRAR APRENDICES"];
  const tableName = "Aprendices";
  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Ficha",
    "Fecha de Nacimiento",
    "Ciudad",
    "Lugar Residencia",
    "Edad",
    "Hijos",
    "Nombre EPS",
    "Telefono Padre",
    "Genero",
    "Correo",
    "Telefono Aprendiz",
    "Total Memorandos",
    "Total Inasistencias",
    "Patrocinio",
    "Estado",
    "Nombre Empresa",
    "Centro Convivencia",
    shouldShowPhoto && "Foto Aprendiz",
    "Acciones",
  ].filter(Boolean);

  const ButtonsForOtherModules = (Id_Aprendiz) => [
    <button
      onClick={() => [
        getApprentice(Id_Aprendiz),
        setStateAddApprentice(true),
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
      onClick={() => deleteApprentice(Id_Aprendiz)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
  ];

  const formattedData = apprenticeList.map((apprentice) => {
    const rowData = [
      apprentice.Id_Aprendiz,
      apprentice.Nom_Aprendiz,
      apprentice.Ape_Aprendiz,
      apprentice.Id_Ficha,
      apprentice.Fec_Nacimiento,
      apprentice.ciudad?.Nom_Ciudad || "N/A",
      apprentice.Lugar_Residencia,
      apprentice.Edad,
      apprentice.Hijos,
      apprentice.Nom_Eps,
      apprentice.Tel_Padre,
      apprentice.Gen_Aprendiz,
      apprentice.Cor_Aprendiz,
      apprentice.Tel_Aprendiz,
      apprentice.Tot_Memorandos,
      apprentice.Tot_Inasistencias,
      apprentice.Patrocinio,
      apprentice.Estado,
      apprentice.Nom_Empresa || "N/A",
      apprentice.CentroConvivencia,
    ];
    if (shouldShowPhoto) {
      rowData.push(
        <img
          width="80px"
          src={`${URI_AXIOS}${URIFOTOS}${apprentice.Foto_Aprendiz}`}
          alt="No Foto"
        />
      );
    }

    rowData.push(ButtonsForOtherModules(apprentice.Id_Aprendiz));

    return rowData;
  });

  useEffect(() => {
    getAllApprentices();
  }, []);

  const getAllApprentices = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios.get(`/aprendiz`, config);
      if (respuestApi.status === 200 || respuestApi.status === 204) {
        setApprenticeList(respuestApi.data);
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

  const getApprentice = async (Id_Aprendiz) => {
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
        `/aprendiz/${Id_Aprendiz}`,
        config
      );
      if (respuestApi.status === 200) {
        setApprentice({
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
    }
  };

  const deleteApprentice = (Id_Aprendiz) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar!",
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
            `/aprendiz/${Id_Aprendiz}`,
            config
          );
          if (respuestApi.status == 200) {
            getAllApprentices();
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
          getAllApprentices();
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
        <span className="text-botones"> Aprendices</span>
      </h1>
      <div className="flex justify-between ">
        <div className="flex justify-between">
          <div title="CSV">
            <h1 className="font-bold text-lg text-gray-500 mb-3 ">
              Subir Archivo CSV
            </h1>
            <ImportarCSV URI={URI} />
          </div>
        </div>
        <div className="flex my-10 space-x-5">
          <ModalWindow
            stateAddNewRow={stateAddApprentice}
            setStateAddNewRow={setStateAddApprentice}
            resetForm={resetForm}
            updateTextButtom={updateTextButton}
            toggleModal={toggleModal} // Aquí pasamos la función
            isOpen={isOpen}
            titleForm={titleForm}
            setStateButton={setStateButton}
            form={
              <FormApprentices
                buttonForm={buttonForm}
                apprentice={apprentice}
                updateTextButton={updateTextButton}
                setApprentice={setApprentice}
                getAllApprentices={getAllApprentices}
                toggleModal={toggleModal}
                isOpen={isOpen}
                stateButton={stateButton}
                setStateButton={setStateButton}
              />
            }
          />
          <a
            href="#"
            onClick={async (e) => {
              e.preventDefault();

              const filePath = "/assets/Aprendiz.csv";
              try {
                const response = await fetch(filePath, { method: "HEAD" });

                if (response.ok) {
                  window.location.href = filePath;
                } else {
                  alert(
                    "El archivo no está disponible en la ruta especificada."
                  );
                }
              } catch (error) {
                console.error("Error al intentar descargar el archivo:", error);
              }
            }}
            className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold flex items-center"
          >
            <FaArrowCircleDown className="mx-1" />
            Descargar CSV
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <br />
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
      <hr />
    </>
  );
};

export default CrudApprentices;
