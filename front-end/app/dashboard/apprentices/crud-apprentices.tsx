"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import clienteAxios from "@/lib/axios-config";

import FormApprentices from "@/app/dashboard/apprentices/form-apprentices";
import Alerta from "@/components/alert";

// Interfaces
interface ApprenticeBase {
  Id_Aprendiz: string;
  Nom_Aprendiz: string;
  Ape_Aprendiz: string;
  Id_Ficha: string;
  Fec_Nacimiento: string | Date;
  Id_Ciudad: string;
  ciudad?: {
    Nom_Ciudad: string;
  };
  Lugar_Residencia: string;
  Edad: string | number;
  Hijos: string;
  Nom_Eps: string;
  Tel_Padre: string;
  Gen_Aprendiz: string;
  Cor_Aprendiz: string;
  Tel_Aprendiz: string;
  Tot_Memorandos?: string | number;
  Tot_Inasistencias?: string | number;
  Patrocinio: string;
  Estado: string;
  Nom_Empresa: string;
  CentroConvivencia: string;
  Foto_Aprendiz?: string;
}

// Interfaz que coincide exactamente con lo que espera FormApprentices
interface FormApprenticeProps {
  Id_Aprendiz: string;
  Nom_Aprendiz: string;
  Ape_Aprendiz: string;
  Id_Ficha: string;
  Fec_Nacimiento: string | Date;
  Id_Ciudad: string;
  Lugar_Residencia: string;
  Edad: string | number;
  Hijos: string;
  Nom_Eps: string;
  Tel_Padre: string;
  Gen_Aprendiz: string;
  Cor_Aprendiz: string;
  Tel_Aprendiz: string;
  Tot_Memorandos?: string | number;
  Tot_Inasistencias?: string | number;
  Patrocinio: string;
  Estado: string;
  Nom_Empresa: string;
  CentroConvivencia: string;
  Foto_Aprendiz?: File | null;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

const URIFOTOS = "/public/uploads/";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export default function CrudApprentices() {
  // Estados
  const [apprenticeList, setApprenticeList] = useState<ApprenticeBase[]>([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stateButton, setStateButton] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  // Estado para el aprendiz seleccionado
  const [apprentice, setApprentice] = useState<FormApprenticeProps>({
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
    Foto_Aprendiz: null,
  });

  // Verificar si hay fotos para mostrar
  const shouldShowPhoto = apprenticeList.some(
    (row) => row.Foto_Aprendiz !== undefined && row.Foto_Aprendiz !== ""
  );

  // Obtener token para autenticación
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || "";
    }
    return "";
  };

  // Configuración para las peticiones
  const getConfig = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    };
  };

  // Resetear el formulario
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
      Foto_Aprendiz: null,
    });
  };

  // Obtener todos los aprendices
  const getAllApprentices = async () => {
    setIsLoading(true);
    const config = getConfig();

    try {
      const response = await clienteAxios.get<ApprenticeBase[]>(
        "/aprendiz",
        config
      );

      if (response.status === 200 || response.status === 204) {
        setApprenticeList(response.data || []);
      } else {
        setAlerta({
          msg: "Error al cargar los registros",
          error: true,
        });
      }
    } catch (apiError) {
      const error = apiError as ApiError;
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar los registros",
        error: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener un aprendiz específico
  const getApprentice = async (Id_Aprendiz: string) => {
    setButtonForm("Actualizar");
    const config = getConfig();

    try {
      const response = await clienteAxios.get<ApprenticeBase>(
        `/aprendiz/${Id_Aprendiz}`,
        config
      );

      if (response.status === 200) {
        // Convertir el ApprenticeBase a FormApprenticeProps
        setApprentice({
          ...response.data,
          // Asegurarse de que Nom_Empresa sea string y no undefined
          Nom_Empresa: response.data.Nom_Empresa || "",
          // Foto_Aprendiz debe ser null para el formulario
          Foto_Aprendiz: null,
        });
        setIsDialogOpen(true);
        setStateButton(false);
      } else {
        setAlerta({
          msg: "Error al cargar el registro",
          error: true,
        });
      }
    } catch (apiError) {
      const error = apiError as ApiError;
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar el registro",
        error: true,
      });
    }
  };

  // Eliminar un aprendiz
  const deleteApprentice = async (Id_Aprendiz: string) => {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
      )
    ) {
      setIsDeleting(true);
      const config = getConfig();

      try {
        const response = await clienteAxios.delete(
          `/aprendiz/${Id_Aprendiz}`,
          config
        );

        if (response.status === 200) {
          await getAllApprentices();
          setAlerta({
            msg: "Registro eliminado correctamente",
            error: false,
          });
        } else {
          setAlerta({
            msg: "Error al eliminar el registro",
            error: true,
          });
        }
      } catch (apiError) {
        const error = apiError as ApiError;
        setAlerta({
          msg:
            error.response?.data?.message ||
            "No se puede eliminar este registro porque está asociado a un formulario",
          error: true,
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Importar CSV
  const handleImportCSV = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    };

    try {
      await clienteAxios.post(
        `${API_URL}/aprendiz/import-csv`,
        formData,
        config
      );

      setAlerta({
        msg: "Datos importados correctamente",
        error: false,
      });
      await getAllApprentices();
    } catch (apiError) {
      const error = apiError as ApiError;
      setAlerta({
        msg: error.response?.data?.message || "Error al importar los datos",
        error: true,
      });
    } finally {
      setIsImporting(false);
      // Limpiar el input file
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  // Descargar CSV
  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("/assets/Aprendiz.csv");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Aprendiz.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setAlerta({
          msg: "El archivo no está disponible",
          error: true,
        });
      }
    } catch {
      setAlerta({
        msg: "Error al descargar el archivo",
        error: true,
      });
    }
  };

  // Actualizar el texto del botón
  const updateTextButton = (text: string) => {
    setButtonForm(text);
  };

  // Cargar los aprendices al montar el componente
  useEffect(() => {
    getAllApprentices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar Información de los{" "}
        <span className="text-botones">Aprendices</span>
      </h1>

      {/* Alertas */}
      {alerta && <Alerta alerta={alerta} setAlerta={setAlerta} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        {/* Importar CSV */}
        <div className="w-full md:w-auto">
          <h2 className="font-bold text-lg text-gray-500 mb-3">
            Subir Archivo CSV
          </h2>
          <div className="flex items-center gap-2">
            <button
              className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded relative ${
                isImporting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isImporting}
            >
              {isImporting ? (
                <>
                  <span className="animate-spin inline-block mr-2">⟳</span>
                  Importando...
                </>
              ) : (
                <>
                  Seleccionar archivo
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Botón para abrir el modal de nuevo aprendiz */}
          <button
            className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
            onClick={() => {
              resetForm();
              setButtonForm("Enviar");
              setStateButton(true);
              setIsDialogOpen(true);
            }}
          >
            Nuevo Aprendiz
          </button>

          {/* Botón para descargar CSV */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadCSV();
            }}
            className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold flex items-center"
          >
            <span className="mx-1">↓</span>
            Descargar CSV
          </a>
        </div>
      </div>

      {/* Modal para el formulario */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {buttonForm === "Enviar"
                    ? "Registrar Aprendiz"
                    : "Actualizar Aprendiz"}
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <FormApprentices
                buttonForm={buttonForm}
                apprentice={apprentice}
                updateTextButton={updateTextButton}
                getAllApprentices={getAllApprentices}
                stateButton={stateButton}
                setStateButton={setStateButton}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tabla de aprendices */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Documento</th>
              <th className="py-2 px-4 border-b text-left">Nombres</th>
              <th className="py-2 px-4 border-b text-left">Apellidos</th>
              <th className="py-2 px-4 border-b text-left">Ficha</th>
              <th className="py-2 px-4 border-b text-left">Fecha Nac.</th>
              <th className="py-2 px-4 border-b text-left">Ciudad</th>
              <th className="py-2 px-4 border-b text-left">Estado</th>
              {shouldShowPhoto && (
                <th className="py-2 px-4 border-b text-left">Foto</th>
              )}
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={shouldShowPhoto ? 9 : 8}
                  className="text-center py-8"
                >
                  <div className="flex justify-center items-center">
                    <span className="animate-spin inline-block mr-2">⟳</span>
                    <span>Cargando aprendices...</span>
                  </div>
                </td>
              </tr>
            ) : apprenticeList.length === 0 ? (
              <tr>
                <td
                  colSpan={shouldShowPhoto ? 9 : 8}
                  className="text-center py-8"
                >
                  <div className="flex justify-center items-center">
                    <span className="mr-2">⚠️</span>
                    <span>No hay aprendices registrados</span>
                  </div>
                </td>
              </tr>
            ) : (
              apprenticeList.map((apprentice) => (
                <tr key={apprentice.Id_Aprendiz} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    {apprentice.Id_Aprendiz}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {apprentice.Nom_Aprendiz}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {apprentice.Ape_Aprendiz}
                  </td>
                  <td className="py-2 px-4 border-b">{apprentice.Id_Ficha}</td>
                  <td className="py-2 px-4 border-b">
                    {apprentice.Fec_Nacimiento
                      ? typeof apprentice.Fec_Nacimiento === "string"
                        ? apprentice.Fec_Nacimiento.split("T")[0]
                        : format(
                            new Date(apprentice.Fec_Nacimiento),
                            "yyyy-MM-dd"
                          )
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {apprentice.ciudad?.Nom_Ciudad || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apprentice.Estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apprentice.Estado}
                    </span>
                  </td>
                  {shouldShowPhoto && (
                    <td className="py-2 px-4 border-b">
                      {apprentice.Foto_Aprendiz ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={`${API_URL}${URIFOTOS}${apprentice.Foto_Aprendiz}`}
                            alt={`Foto de ${apprentice.Nom_Aprendiz}`}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">N/A</span>
                        </div>
                      )}
                    </td>
                  )}
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => getApprentice(apprentice.Id_Aprendiz)}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 p-1 rounded"
                        title="Editar"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteApprentice(apprentice.Id_Aprendiz)}
                        className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                        title="Eliminar"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "⟳" : "✕"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
