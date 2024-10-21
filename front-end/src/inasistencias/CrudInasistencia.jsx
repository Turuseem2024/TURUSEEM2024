import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";

import Alerta from "../components/Alerta.jsx";
import WriteTable from "../Tables/Data-Tables.jsx";

const URI = "/inasistencias";

const CrudInasistencias = () => {
  const [inasistenciaList, setInasistenciaList] = useState([]);
  // const [setButtonForm] = useState("Enviar");
  const [crearDataTable, setCrearDataTable] = useState(false);

  const [alerta, setAlerta] = useState({});

  const titleModul = ["REPORTE DE INASISTENCIAS"];
  const tableName = "Inasistencias";

  const titles = [
    "Identificador",
    "Fecha Inasistencia",
    "Motivo Inasistencia",
    "Aprendiz",
    "Tipo Inasistencia",
    "Acciones",
  ];  

  const ButtonsForOtherModules = () => [
    <h1 key="text">No Buttons</h1>
  ];

  const formattedData = inasistenciaList.map((inasistencias) => {
    const rowData = [
      inasistencias.Id_Inasistencia,
      inasistencias.Fec_Inasistencia,
      inasistencias.Mot_Inasistencia,
      inasistencias.NombreCompleto,
      inasistencias.Tipo_Inasistencia,
    ]
      // inasistencias.Fec_Inasistencia,
    rowData.push(ButtonsForOtherModules(inasistencias.Id_Inasistencia));
    return rowData;
  });

  useEffect(() => {
     getAllInasistencias();
  }, []);


  const getAllInasistencias = async () => {
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
        setInasistenciaList(respuestApi.data);
        setCrearDataTable(true);
      } else {
        setAlerta({
          msg: respuestApi.data.msg,
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

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Informacion de las
        <span className="text-botones"> Inasistencias</span>
      </h1>
      <br />
      <br />
      <div className="overflow-x-auto">
        <hr />
        {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        {crearDataTable && (
          <WriteTable
            titles={titles}
            data={formattedData}
            titleModul={titleModul}
            tableName={tableName}
            buttons={ButtonsForOtherModules}
          />
        )}
      </div>
    </>
  );
};

export default CrudInasistencias;