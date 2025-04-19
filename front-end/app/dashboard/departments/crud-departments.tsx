"use client";

import { useState, useEffect } from "react";
import clienteAxios from "@/lib/axios-config";
import FormDepartamentos from "@/app/dashboard/departamentos/form-departamentos";
import Alerta from "@/components/alert";

// Interfaces
interface Departamento {
  Id_Departamento: string;
  Nom_Departamento: string;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export default function CrudDepartamentos() {
  // Estados
  const [departamentoList, setDepartamentoList] = useState<Departamento[]>([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stateButton, setStateButton] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  // Estado para el departamento seleccionado
  const [departamento, setDepartamento] = useState<Departamento>({
    Id_Departamento: "",
    Nom_Departamento: "",
  });

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
    setDepartamento({
      Id_Departamento: "",
      Nom_Departamento: "",
    });
  };

  // Obtener todos los departamentos
  const getAllDepartamentos = async () => {
    setIsLoading(true);
    const config = getConfig();

    try {
      const response = await clienteAxios.get<Departamento[]>("/departamento", config);

      if (response.status === 200 || response.status === 204) {
        setDepartamentoList(response.data || []);
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

  // Obtener un departamento específico
  const getDepartamento = async (Id_Departamento: string) => {
    setButtonForm("Actualizar");
    const config = getConfig();

    try {
      const response = await clienteAxios.get<Departamento>(
        `/departamento/${Id_Departamento}`,
        config
      );

      if (response.status === 200) {
        setDepartamento(response.data);
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

  // Eliminar un departamento
  const deleteDepartamento = async (Id_Departamento: string) => {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
      )
    ) {
      setIsDeleting(true);
      const config = getConfig();

      try {
        const response = await clienteAxios.delete(
          `/departamento/${Id_Departamento}`,
          config
        );

        if (response.status === 200) {
          await getAllDepartamentos();
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
            "No se puede eliminar este registro porque está asociado a otros registros",
          error: true,
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Importar CSV
  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
        `${API_URL}/departamento/import-csv`,
        formData,
        config
      );

      setAlerta({
        msg: "Datos importados correctamente",
        error: false,
      });
      await getAllDepartamentos();
    } catch (apiError) {
      const error = apiError as ApiError;
      setAlerta({
        msg: error.response?.data?.message || "Error al importar los datos",
        error: true,
      });
    } finally {
      setIsImporting(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  // Descargar CSV
  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("/assets/Departamento.csv");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Departamento.csv";
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
    } catch (error) {
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

  // Cargar los departamentos al montar el componente
  useEffect(() => {
    getAllDepartamentos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-zinc-950 font-extrabold text-4xl md:text-4xl text-center mb-7">
        Gestionar <span className="text-botones">Departamentos</span>
      </h1>

      {alerta && <Alerta alerta={alerta} setAlerta={setAlerta} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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
          <button
            className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
            onClick={() => {
              resetForm();
              setButtonForm("Enviar");
              setStateButton(true);
              setIsDialogOpen(true);
            }}
          >
            Nuevo Departamento
          </button>

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

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {buttonForm === "Enviar"
                    ? "Registrar Departamento"
                    : "Actualizar Departamento"}
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <FormDepartamentos
                buttonForm={buttonForm}
                departamento={departamento}
                updateTextButton={updateTextButton}
                getAllDepartamentos={getAllDepartamentos}
                stateButton={stateButton}
                setStateButton={setStateButton}
              />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Código</th>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <span className="animate-spin inline-block mr-2">⟳</span>
                    <span>Cargando departamentos...</span>
                  </div>
                </td>
              </tr>
            ) : departamentoList.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <span className="mr-2">⚠️</span>
                    <span>No hay departamentos registrados</span>
                  </div>
                </td>
              </tr>
            ) : (
              departamentoList.map((departamento) => (
                <tr key={departamento.Id_Departamento} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{departamento.Id_Departamento}</td>
                  <td className="py-2 px-4 border-b">{departamento.Nom_Departamento}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => getDepartamento(departamento.Id_Departamento)}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 p-1 rounded"
                        title="Editar"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteDepartamento(departamento.Id_Departamento)}
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