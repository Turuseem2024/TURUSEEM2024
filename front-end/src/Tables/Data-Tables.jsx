/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ReactSession } from "react-client-session";
import $ from "jquery";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx, BsFiletypeSql } from "react-icons/bs";
import { MdOutlineDownloading } from "react-icons/md";
import clienteAxios from "../config/axios";

//pidan de parametros los titulos y la data
function WriteTable({ titles, data, titleModul, tableName }) {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const exportPDF = async () => {
    try {
      const tableElement = tableRef.current;

      if (!tableElement) {
        console.error("No se pudo encontrar el elemento de la tabla.");
        return;
      }

      // Mostrar todos los registros antes de exportar
      const table = $("#TableDinamic").DataTable();
      const currentPageLength = table.page.len(); // Guardar el valor actual de los registros mostrados
      table.page.len(-1).draw(); // Mostrar todos los registros

      // Obtener el contenido de thead y tbody por separado
      const theadHtml = tableElement.querySelector("thead")?.outerHTML || "";
      const tbodyHtml = tableElement.querySelector("tbody")?.outerHTML || "";

      if (!theadHtml || !tbodyHtml) {
        console.error("No se pudo obtener el contenido de la tabla.");
        return;
      }

      const tableHtml = `<table>${theadHtml}${tbodyHtml}</table>`;
      const token = ReactSession.get("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clienteAxios.post(
        "/reportPDF",
        { innerHTML: tableHtml, titleModul: titleModul },
        config
      );

      if (response.data.Reporte) {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${response.data.Reporte}`;
        link.download = `${titleModul}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No se encontró el reporte");
      }


      // Restaurar el valor de registros mostrados
      table.page.len(currentPageLength).draw();
    } catch (error) {
      console.error("Error al enviar el HTML:", error);
    }
  };

  const exportToExcel = async () => {
    try {
      const table = $("#TableDinamic").DataTable();
      const currentPageLength = table.page.len();
      table.page.len(-1).draw();

      const headers = [];
      document
        .querySelectorAll("table thead th")
        .forEach((header, index, array) => {
          if (index < array.length - 1) {
            headers.push(header.innerText);
          }
        });

      const data = [];
      document.querySelectorAll("table tbody tr").forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell, index, array) => {
          if (index < array.length - 1) {
            rowData.push(cell.innerText);
          }
        });
        data.push(rowData);
      });

      const tableData = {
        headers: headers,
        rows: data,
      };

      const token = ReactSession.get("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clienteAxios.post(
        "/reportXLSX",
        tableData,
        config
      );

      const base64XLSX = response.data.base64;
      const link = document.createElement("a");
      link.href =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
        base64XLSX;
      link.download = `${titleModul}.xlsx`;
      link.click();

      // Restaurar el valor de registros mostrados
      table.page.len(currentPageLength).draw();
    } catch (error) {
      console.error("Error exporting to Excel", error);
    }
  };

  const exportSQL = () => {
    const table = document.getElementById("TableDinamic");
    const rows = table.querySelectorAll("tbody tr");

    // Capturar los nombres de las columnas (los headers de la tabla)
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.innerText
    );

    const data = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      let rowData = {};
      cells.forEach((cell, index) => {
        rowData[headers[index]] = cell.innerText;
      });
      return rowData;
    });

    return data;
  };

  const handleEsportSQL = async () => {
    setLoading(true);

    const table = $("#TableDinamic").DataTable();
    const currentPageLength = table.page.len();
    table.page.len(-1).draw();

    const tableData = exportSQL();

    const dataValues = tableData.map((row) => Object.values(row));
    const payload = {
      tableName: tableName,
      data: dataValues,
    };

    const token = ReactSession.get("token");

    if (!token) {
      console.error("Token no disponible.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await clienteAxios.post("/exportsSQL", payload, config);

      const { base64SQL } = response.data;

      const link = document.createElement("a");
      link.href = `data:application/sql;base64,${base64SQL}`;
      link.download = `${tableName}.sql`;
      link.click();

    } catch (error) {
      console.error("Error al exportar el archivo SQL:", error);
    } finally {
      // Restaurar el valor de registros mostrados
      table.page.len(currentPageLength).draw();
      setLoading(false);
    }
  };
  //table
  useEffect(() => {
    // Verifica si el DataTable ya está inicializado
    if (!$.fn.DataTable.isDataTable("#TableDinamic")) {
      let table = new DataTable("#TableDinamic", {
        responsive: true,
        lengthChange: false,
        pageLength: 5,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Buscar...",
          zeroRecords: "No se encontraron resultados",
          info: "Mostrando página _PAGE_ de _PAGES_ paginas",
          infoEmpty: "No hay registros disponibles",
          infoFiltered: "(Filtrado de _MAX_ registros totales)",
        },
        drawCallback: () => {
          $("#TableDinamic td, #TableDinamic th").css({
            "text-align": "center",
            "vertical-align": "middle",
          });
          $(".dt-layout-cell").removeClass("dt-layout-end");
        },
      });
    }
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto container ">
      <div className="flex justify-start px-5">
  <button
    type="button"
    className="text-red-600 bg-red-50 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
    onClick={exportPDF}
    title="Export PDF"
  >
    <FaRegFilePdf size={17} />
  </button>
  <button
    type="button"
    className="text-lime-700 bg-emerald-100 hover:bg-emerald-200 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
    onClick={exportToExcel}
    title="Export XLSX"
  >
    <BsFiletypeXlsx size={17} />
  </button>
  <button
    type="button"
    className="text-green-600 bg-sky-200 hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 mx-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
    onClick={handleEsportSQL}
    title="Export SQL"
  >
    {loading ? (
      <MdOutlineDownloading size={17} />
    ) : (
      <BsFiletypeSql size={17} />
    )}
  </button>
</div>
<br />


        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table
                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table table-responsive border-b border-black"
                id="TableDinamic"
                ref={tableRef}
              >
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black">
                  <tr>
                    {titles.map((title, index) => (
                      <th scope="col" key={index}>
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-black">
                      {row.slice(0, -1).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                      <td className="py-2 px-4 border-b border-black">
                        {Array.isArray(row[row.length - 1]) ? (
                          row[row.length - 1].map((button, buttonIndex) => (
                            <span key={buttonIndex}>{button}</span>
                          ))
                        ) : (
                          <span>No buttons</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-buttons hidden"></div>
    </>
  );
}

export default WriteTable;
