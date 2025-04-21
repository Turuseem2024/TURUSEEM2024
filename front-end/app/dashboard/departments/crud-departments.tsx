"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, BarChart2, Workflow, Grid3X3, List, Layers, Filter, Search, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import clienteAxios from "@/lib/axios-config"

import type { Departamento } from "@/app/dashboard/departments/form-departments"
import EntityList from "@/components/entity-list"
import EntityGrid from "@/components/entity-grid"
import EntityCardGrid from "@/components/entity-card-grid"
import EntityActions from "@/components/entity-actions"
import EntityStats from "@/components/entity-stats"
import WorkflowCards from "@/components/workflow-cards"
import DeleteConfirmation from "@/components/delete-confirmation"
import FormDialog from "@/components/form-dialog"
import CustomAlert from "@/components/ui/custom-alert"

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
    status?: number
  }
  message?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export default function CrudDepartamentos() {
  // Estados
  const [departamentoList, setDepartamentoList] = useState<Departamento[]>([])
  const [buttonForm, setButtonForm] = useState("Enviar")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [alerta, setAlerta] = useState<{
    msg: string
    error: boolean
    action?: () => void
    actionText?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [stateButton, setStateButton] = useState(true)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [departamentoToDelete, setDepartamentoToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "cards">("cards")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Estado para el departamento seleccionado
  const [departamento, setDepartamento] = useState<Departamento>({
    Id_Departamento: "",
    Nom_Departamento: "",
  })

  // Configuración para departamentos
  const departamentoConfig = {
    name: "Departamento",
    endpoint: "/departamento",
    idField: "Id_Departamento",
    nameField: "Nom_Departamento",
    icon: <Building2 className="h-4 w-4" />,
    fields: [
      {
        name: "Id_Departamento",
        label: "ID",
        type: "text" as const,
        disabled: true,
      },
      {
        name: "Nom_Departamento",
        label: "Nombre del Departamento",
        type: "text" as const,
      },
    ],
  }

  // Obtener token para autenticación
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || ""
    }
    return ""
  }

  // Configuración para las peticiones
  const getConfig = () => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  }

  // Resetear el formulario
  const resetForm = () => {
    setDepartamento({
      Id_Departamento: "",
      Nom_Departamento: "",
    })
  }

  // Enfocar el campo de búsqueda cuando se presiona Ctrl+F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Obtener todos los departamentos
  const getAllDepartamentos = async () => {
    setIsLoading(true)
    const config = getConfig()

    try {
      const response = await clienteAxios.get<Departamento[]>("/departamento", config)

      if (response.status === 200 || response.status === 204) {
        setDepartamentoList(response.data || [])
      } else {
        setAlerta({
          msg: "Error al cargar los registros",
          error: true,
          action: getAllDepartamentos,
          actionText: "Reintentar",
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar los registros",
        error: true,
        action: getAllDepartamentos,
        actionText: "Reintentar",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener un departamento específico
  const getDepartamento = async (Id_Departamento: string) => {
    setButtonForm("Actualizar")
    const config = getConfig()

    try {
      const response = await clienteAxios.get<Departamento>(`/departamento/${Id_Departamento}`, config)

      if (response.status === 200) {
        setDepartamento(response.data)
        setIsDialogOpen(true)
        setStateButton(false)
      } else {
        setAlerta({
          msg: "Error al cargar el registro",
          error: true,
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al cargar el registro",
        error: true,
      })
    }
  }

  // Confirmar eliminación
  const confirmDelete = (Id_Departamento: string) => {
    setDepartamentoToDelete(Id_Departamento)
    setDeleteConfirmOpen(true)
  }

  // Eliminar un departamento
  const deleteDepartamento = async () => {
    if (!departamentoToDelete) return

    setIsDeleting(true)
    const config = getConfig()

    try {
      const response = await clienteAxios.delete(`/departamento/${departamentoToDelete}`, config)

      if (response.status === 200) {
        await getAllDepartamentos()
        setAlerta({
          msg: "Registro eliminado correctamente",
          error: false,
        })
      } else {
        setAlerta({
          msg: "Error al eliminar el registro",
          error: true,
        })
      }
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg:
          error.response?.data?.message || "No se puede eliminar este registro porque está asociado a otros registros",
        error: true,
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmOpen(false)
      setDepartamentoToDelete(null)
    }
  }

  // Importar CSV
  const handleImportCSV = async (file: File) => {
    setIsImporting(true)
    const formData = new FormData()
    formData.append("file", file)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    }

    try {
      await clienteAxios.post(`${API_URL}/departamento/import-csv`, formData, config)

      setAlerta({
        msg: "Datos importados correctamente",
        error: false,
      })
      await getAllDepartamentos()
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || "Error al importar los datos",
        error: true,
      })
    } finally {
      setIsImporting(false)
    }
  }

  // Exportar a diferentes formatos
  const exportData = async (format: string) => {
    setIsExporting(true)
    try {
      let endpoint = ""
      let filename = ""
      let mimeType = ""

      switch (format) {
        case "excel":
          endpoint = "/departamento/export-excel"
          filename = "Departamentos.xlsx"
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          break
        case "csv":
          endpoint = "/departamento/export-csv"
          filename = "Departamentos.csv"
          mimeType = "text/csv"
          break
        case "pdf":
          endpoint = "/departamento/export-pdf"
          filename = "Departamentos.pdf"
          mimeType = "application/pdf"
          break
        case "sql":
          endpoint = "/departamento/export-sql"
          filename = "Departamentos.sql"
          mimeType = "application/sql"
          break
        default:
          throw new Error("Formato no soportado")
      }

      const response = await clienteAxios.get(endpoint, { ...getConfig(), responseType: "blob" })
      const blob = new Blob([response.data], { type: mimeType })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setAlerta({
        msg: `Datos exportados correctamente en formato ${format.toUpperCase()}`,
        error: false,
      })
    } catch (apiError) {
      const error = apiError as ApiError
      setAlerta({
        msg: error.response?.data?.message || `Error al exportar los datos en formato ${format}`,
        error: true,
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Actualizar el texto del botón
  const updateTextButton = (text: string) => {
    setButtonForm(text)
  }

  // Abrir modal para nuevo departamento
  const handleNewDepartment = () => {
    resetForm()
    setButtonForm("Enviar")
    setStateButton(true)
    setIsDialogOpen(true)
  }

  // Seleccionar un departamento desde la vista de grid
  const handleSelectDepartment = (departamento: Departamento) => {
    setDepartamento(departamento)
    setButtonForm("Actualizar")
    setStateButton(false)
    setIsDialogOpen(true)
  }

  // Cargar los departamentos al montar el componente
  useEffect(() => {
    getAllDepartamentos()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <CustomAlert alerta={alerta} setAlerta={setAlerta} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-black p-3 rounded-xl">
            <Building2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
            <p className="text-gray-500 text-sm mt-1">Gestiona y organiza los departamentos de tu empresa</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 rounded-lg border-gray-200 w-full"
              ref={searchInputRef}
            />
            {searchTerm && (
              <button
                type="button"
                title="Limpiar búsqueda"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-lg">
                <Filter size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Filtros</h3>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Próximamente</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Total Departamentos</span>
          <span className="text-3xl font-bold">{departamentoList.length}</span>
          <div className="mt-auto pt-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              +12% este mes
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Actualizaciones</span>
          <span className="text-3xl font-bold">24</span>
          <div className="mt-auto pt-4">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              +5% este mes
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Actividad</span>
          <span className="text-3xl font-bold">87%</span>
          <div className="mt-auto pt-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              +18% este mes
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Rendimiento</span>
          <span className="text-3xl font-bold">92%</span>
          <div className="mt-auto pt-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              +7% este mes
            </Badge>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <EntityActions
          config={departamentoConfig}
          onImport={handleImportCSV}
          onExport={exportData}
          onNew={handleNewDepartment}
          isImporting={isImporting}
          isExporting={isExporting}
        />
      </motion.div>

      <Tabs defaultValue="departments" className="mb-8">
        <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="departments" className="rounded-md data-[state=active]:text-black">
            <Building2 className="h-4 w-4 mr-2" />
            Departamentos
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-md data-[state=active]:text-black">
            <BarChart2 className="h-4 w-4 mr-2" />
            Estadísticas
          </TabsTrigger>
          <TabsTrigger value="automation" className="rounded-md data-[state=active]:text-black">
            <Workflow className="h-4 w-4 mr-2" />
            Automatización
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <div className="flex justify-end mb-4">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <Button
                variant={viewMode === "cards" ? "ghost" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className={`rounded-md ${viewMode === "cards" ? "text-black" : "text-gray-500"}`}
              >
                <Layers className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "ghost" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-md ${viewMode === "grid" ? "text-black" : "text-gray-500"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "ghost" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-md ${viewMode === "list" ? "text-black" : "text-gray-500"}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "cards" ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <EntityCardGrid
                  config={departamentoConfig}
                  entities={departamentoList}
                  onSelectEntity={handleSelectDepartment}
                />
                <div className="mt-8">
                  <EntityGrid
                    config={departamentoConfig}
                    entities={departamentoList}
                    isLoading={isLoading}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSelectEntity={handleSelectDepartment}
                  />
                </div>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <EntityGrid
                  config={departamentoConfig}
                  entities={departamentoList}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onSelectEntity={handleSelectDepartment}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <EntityList
                  config={departamentoConfig}
                  entities={departamentoList}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onEdit={getDepartamento}
                  onDelete={confirmDelete}
                  isDeleting={isDeleting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="stats">
          <EntityStats config={departamentoConfig} entities={departamentoList} />
        </TabsContent>

        <TabsContent value="automation">
          <WorkflowCards />
        </TabsContent>
      </Tabs>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmation
        config={departamentoConfig}
        isOpen={deleteConfirmOpen}
        isDeleting={isDeleting}
        onCancel={() => setDeleteConfirmOpen(false)}
        onConfirm={deleteDepartamento}
      />

      {/* Modal de formulario */}
      <FormDialog
        config={departamentoConfig}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        buttonForm={buttonForm}
        entity={departamento}
        updateTextButton={updateTextButton}
        getAllEntities={getAllDepartamentos}
        stateButton={stateButton}
        setStateButton={setStateButton}
      />
    </div>
  )
}
