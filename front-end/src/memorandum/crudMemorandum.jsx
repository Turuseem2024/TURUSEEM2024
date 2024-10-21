import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ReactSession } from "react-client-session";
import FormMemorandum from "./formMemorandum.jsx";

//BOTON MEMORANDO
import { MdEmail } from "react-icons/md";

// Icons
import Alerta from "../components/Alerta.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const CrudMemorandum = () => {
  const [memorandumList, setMemorandumList] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddMemorandum, setStateAddMemorandum] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [stateButton, setStateButton] = useState(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const resetForm = () => {
    setMemorandum({
      Id_OtroMemorando: "",
      Fec_OtroMemorando: "",
      Mot_OtroMemorando: "",
      Id_Aprendiz: "",
    });
  };

  // const navigate = useNavigate();

  const [memorandum, setMemorandum] = useState({
    Id_OtroMemorando: "",
    Fec_OtroMemorando: "",
    Mot_OtroMemorando: "",
    Id_Aprendiz: "",
  });
  const titleModul = ["REPORTE DE MEMORANDOS"];
  const titleForm = ["REGISTRAR MEMORANDOS"];
  const tableName = "Memorandos";

  const titles = [
    "Documento",
    "Nombre",
    "Apellido",
    "Fecha Memorando",
    "Motivo Memorando",
    "Memorando Enviado",
    "Acciones",
  ];

  const ButtonsForMemorandum = (Id_OtroMemorando) => [
    <button
      onClick={() => [
        getMemorandum(Id_OtroMemorando),
        setStateAddMemorandum(true),
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
      onClick={() => deleteMemorandum(Id_OtroMemorando)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Eliminar"
    >
      <MdDeleteOutline />
    </button>,
    <button
      onClick={() => [viewMemorandum(Id_OtroMemorando)]}
      className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
      key="get"
      title="Ver PDF"
    >
      <AiOutlineEye />
    </button>,
    <button
      onClick={() => sendMemorandum(Id_OtroMemorando)}
      className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
      key="delete"
      title="Enviar Memorando"
    >
      <MdEmail />
    </button>,
  ];
  const formattedData = memorandumList.map((memorandum) => {
    const rowData = [
      memorandum.Id_Aprendiz,
      memorandum.Nom_Aprendiz,
      memorandum.Ape_Aprendiz,
      memorandum.Fec_OtroMemorando,
      memorandum.Mot_OtroMemorando,
      memorandum.ENVIADO === 1 ? 'Sí' : 'No', // Conversión de 0/1 a "Sí"/"No"
    ];
  
    rowData.push(ButtonsForMemorandum(memorandum.Id_OtroMemorando));
    return rowData;
  });

  useEffect(() => {
    getAllMemorandum();
  }, []);

  const getAllMemorandum = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clienteAxios("/otrosmemorandos", config);
      if (respuestApi.status == 200) {
        setMemorandumList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        console.log("Error: " + respuestApi.status);
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const getMemorandum = async (Id_OtroMemorando) => {
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
        `/otrosmemorandos/${Id_OtroMemorando}`,
        config
      );
      if (respuestApi.status === 200) {
        setMemorandum({
          ...respuestApi.data,
        });
      } else {
        console.log("Error" + respuestApi.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const deleteMemorandum = (Id_OtroMemorando) => {
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
            `/otrosmemorandos/${Id_OtroMemorando}`,
            config
          );
          if (respuestApi.status == 200) {
            updateTextButton("Enviar");
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(respuestApi.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  const viewMemorandum = async (Id_OtroMemorando) => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await clienteAxios.post(
        `/otrosmemorandos/view/pdf/${Id_OtroMemorando}`,
        config
      );
      if (response.status === 201) {
        const pdfWindow = window.open("");
        pdfWindow.document.write(
          `<iframe width="100%" height="100%" src="data:application/pdf;base64,${response.data.pdfBase64}"></iframe>`
        );
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };
  const sendMemorandum = async (Id_OtroMemorando) => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await clienteAxios.post(
        `/otrosmemorandos/send/pdf/${Id_OtroMemorando}`,
        config
      );

      if (response.status === 201) {
        setAlerta({
          msg: response.data.message,
          error: false,
        });
        getAllMemorandum()
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-zinc-900 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar informacion de los{" "}
        <span className="text-botones">Memorandos</span>
      </h1>
      <div className="flex pb-3">
        <ModalWindow
          stateAddNewRow={stateAddMemorandum}
          setStateAddNewRow={setStateAddMemorandum}
          toggleModal={toggleModal} // Aquí pasamos la función
          isOpen={isOpen}
          titleForm={titleForm}
          updateTextButtom={updateTextButton}
          resetForm={resetForm}
          setStateButton={setStateButton}
          form={
            <FormMemorandum
              buttonForm={buttonForm}
              memorandum={memorandum}
              updateTextButton={updateTextButton}
              setMemorandum={setMemorandum}
              getAllMemorandum={getAllMemorandum}
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
export default CrudMemorandum;