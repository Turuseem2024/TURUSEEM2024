// "use client";

// import { useState, useEffect } from "react";
// import clienteAxios from "@/lib/axios-config";
// import FormMunicipios from "@/app/dashboard/municipalities/form-municipalities";
// import Alerta from "@/components/alert";

// // Interfaces
// interface Departamento {
//   Id_Departamento: string;
//   Nom_Departamento: string;
// }

// interface Municipio {
//   Id_Municipio: string;
//   Nom_Municipio: string;
//   Id_Departamento: string;
//   departamento?: Departamento;
// }

// interface ApiError {
//   response?: {
//     data?: {
//       message?: string;
//     };
//     status?: number;
//   };
//   message?: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// export default function CrudMunicipios() {
//   // Estados
//   const [municipioList, setMunicipioList] = useState<Municipio[]>([]);
//   const [buttonForm, setButtonForm] = useState("Enviar");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [stateButton, setStateButton] = useState(true);
//   const [isImporting, setIsImporting] = useState(false);

//   // Estado para el municipio seleccionado
//   const [municipio, setMunicipio] = useState<Municipio>({
//     Id_Municipio: "",
//     Nom_Municipio: "",
//     Id_Departamento: "",
//   });

//   // Obtener token para autenticación
//   const getToken = () => {
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token") || "";
//     }
//     return "";
//   };

//   // Configuración para las peticiones
//   const getConfig = () => {
//     return {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     };
//   };

//   // Resetear el formulario
//   const resetForm = () => {
//     setMunicipio({
//       Id_Municipio: "",
//       Nom_Municipio: "",
//       Id_Departamento: "",
//     });
//   };

//   // Obtener todos los municipios
//   const getAllMunicipios = useCallback(async () => {
//       setIsLoading(true);
//       const config = getConfig();

//       try {
//           const response = await clienteAxios.get<Municipio[]>("/municipio", config);

//           if (response.status === 200) {
//               setMunicipioList(response.data);
//           } else {
//               setAlerta({
//                   msg: "Error al cargar los registros",
//                   error: true,
//               });
//           }
//       } catch (apiError) {
//           const error = apiError as ApiError;
//           setAlerta({
//               msg: error.response?.data?.message || "Error al cargar los registros",
//               error: true,
//           });
//       } finally {
//           setIsLoading(false);
//       }
//   }, []);

//   // Obtener un municipio específico
//   const getMunicipio = async (Id_Municipio: string) => {
//     setButtonForm("Actualizar");
//     const config = getConfig();

//     try {
//       const response = await clienteAxios.get<Municipio>(
//         `/municipio/${Id_Municipio}`,
//         config
//       );

//       if (response.status === 200) {
//         setMunicipio(response.data);
//         setIsDialogOpen(true);
//         setStateButton(false);
//       } else {
//         setAlerta({
//           msg: "Error al cargar el registro",
//           error: true,
//         });
//       }
//     } catch (apiError) {
//       const error = apiError as ApiError;
//       setAlerta({
//         msg: error.response?.data?.message || "Error al cargar el registro",
//         error: true,
//       });
//     }
//   };

//   // Eliminar un municipio
//   const deleteMunicipio = async (Id_Municipio: string) => {
//     if (confirm("¿Estás seguro de eliminar este municipio?")) {
//       setIsDeleting(true);
//       const config = getConfig();

//       try {
//         const response = await clienteAxios.delete(
//           `/municipio/${Id_Municipio}`,
//           config
//         );

//         if (response.status === 200) {
//           await getAllMunicipios();
//           setAlerta({
//             msg: "Registro eliminado correctamente",
//             error: false,
//           });
//         }
//       } catch (apiError) {
//         const error = apiError as ApiError;
//         setAlerta({
//           msg: error.response?.data?.message || "Error al eliminar el registro",
//           error: true,
//         });
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   // Importar CSV
//   const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setIsImporting(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${getToken()}`,
//       },
//     };

//     try {
//       await clienteAxios.post(
//         `${API_URL}/municipio/import-csv`,
//         formData,
//         config
//       );

//       setAlerta({
//         msg: "Datos importados correctamente",
//         error: false,
//       });
//       await getAllMunicipios();
//     } catch (apiError) {
//       const error = apiError as ApiError;
//       setAlerta({
//         msg: error.response?.data?.message || "Error al importar los datos",
//         error: true,
//       });
//     } finally {
//       setIsImporting(false);
//       if (event.target) event.target.value = "";
//     }
//   };

//   // Descargar CSV
//   const handleDownloadCSV = async () => {
//     try {
//       const response = await fetch("/assets/Municipio.csv");
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "Municipio.csv";
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       }
//     } catch {
//       setAlerta({
//         msg: "Error al descargar el archivo",
//         error: true,
//       });
//     }
//   };

//   useEffect(() => {
//     getAllMunicipios();
//   }, [getAllMunicipios]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-zinc-950 font-extrabold text-4xl text-center mb-7">
//         Gestionar{" "}
//         <span className="text-botones">Municipios</span>
//       </h1>

//       {alerta && <Alerta alerta={alerta} setAlerta={setAlerta} />}

//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div className="w-full md:w-auto">
//           <h2 className="font-bold text-lg text-gray-500 mb-3">
//             Subir Archivo CSV
//           </h2>
//           <div className="flex items-center gap-2">
//             <label
//               htmlFor="csvFileInput"
//               className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded cursor-pointer ${
//                 isImporting ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {isImporting ? (
//                 <>
//                   <span className="animate-spin inline-block mr-2">⟳</span>
//                   Importando...
//                 </>
//               ) : (
//                 "Seleccionar archivo"
//               )}
//             </label>
//             <input
//               id="csvFileInput"
//               type="file"
//               accept=".csv"
//               onChange={handleImportCSV}
//               className="hidden"
//               disabled={isImporting}
//               title="Seleccionar archivo CSV para importar"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-2">
//           <button
//             className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
//             onClick={() => {
//               resetForm();
//               setButtonForm("Enviar");
//               setStateButton(true);
//               setIsDialogOpen(true);
//             }}
//           >
//             Nuevo Municipio
//           </button>

//           <a
//             href="#"
//             onClick={handleDownloadCSV}
//             className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold flex items-center"
//           >
//             <span className="mx-1">↓</span>
//             Descargar CSV
//           </a>
//         </div>
//       </div>

//       {isDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">
//                   {buttonForm === "Enviar" ? "Registrar Municipio" : "Actualizar Municipio"}
//                 </h2>
//                 <button
//                   onClick={() => setIsDialogOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <FormMunicipios
//                 buttonForm={buttonForm}
//                 municipio={municipio}
//                 updateTextButton={setButtonForm}
//                 getAllMunicipios={getAllMunicipios}
//                 stateButton={stateButton}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border-b text-left">ID Municipio</th>
//               <th className="py-2 px-4 border-b text-left">Nombre</th>
//               <th className="py-2 px-4 border-b text-left">Departamento</th>
//               <th className="py-2 px-4 border-b text-left">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={4} className="text-center py-8">
//                   <div className="flex justify-center items-center">
//                     <span className="animate-spin inline-block mr-2">⟳</span>
//                     Cargando municipios...
//                   </div>
//                 </td>
//               </tr>
//             ) : municipioList.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="text-center py-8">
//                   <div className="flex justify-center items-center">
//                     <span className="mr-2">⚠️</span>
//                     No hay municipios registrados
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               municipioList.map((municipio) => (
//                 <tr key={municipio.Id_Municipio} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b">{municipio.Id_Municipio}</td>
//                   <td className="py-2 px-4 border-b">{municipio.Nom_Municipio}</td>
//                   <td className="py-2 px-4 border-b">
//                     {municipio.departamento?.Nom_Departamento || "N/A"}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => getMunicipio(municipio.Id_Municipio)}
//                         className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 p-1 rounded"
//                         title="Editar"
//                       >
//                         ✎
//                       </button>
//                       <button
//                         onClick={() => deleteMunicipio(municipio.Id_Municipio)}
//                         className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
//                         title="Eliminar"
//                         disabled={isDeleting}
//                       >
//                         {isDeleting ? "⟳" : "✕"}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function useCallback(arg0: () => Promise<void>, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }
