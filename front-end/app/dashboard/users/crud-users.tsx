"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User2, BarChart2, Workflow, Grid3X3, List, Layers, Filter, Search, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import clienteAxios from "@/lib/axios-config"

import type { User } from "@/app/dashboard/users/form-users"
import UserList from "@/components/user-list"
import UserGrid from "@/components/user-grid"
import UserCardGrid from "@/components/user-card-grid"
import UserActions from "@/components/user-actions"
import UserStats from "@/components/user-stats"
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

export default function UsersPage() {
  // Estados
  const [userList, setUserList] = useState<User[]>([])
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
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "cards">("cards")
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState<User>({
    Id_User: "",
    Tipo_Usuario: 'Usuario Normal',
    Nom_User: "",
    Ape_User: "",
    Genero_User: 'Masculino',
    Email_User: "",
    Tel_User: "",
    Password_User: "",
    confirmado: false,
    Est_User: 'ACTIVO'
  })

  // Configuración para usuarios
  const userConfig = {
    name: "Usuario",
    endpoint: "/users",
    idField: "Id_User",
    nameField: "Nom_User",
    fields: [
      { name: "Id_User", label: "ID", type: "text", disabled: true },
      { name: "Tipo_Usuario", label: "Tipo de Usuario", type: "select" },
      { name: "Nom_User", label: "Nombre", type: "text" },
      { name: "Ape_User", label: "Apellido", type: "text" },
      { name: "Genero_User", label: "Género", type: "select" },
      { name: "Email_User", label: "Email", type: "email" },
      { name: "Tel_User", label: "Teléfono", type: "tel" },
      { name: "Password_User", label: "Contraseña", type: "password" },
      { name: "confirmado", label: "Confirmado", type: "checkbox" },
      { name: "Est_User", label: "Estado", type: "select" }
    ],
  }

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || ""
    }
    return ""
  }

  const getConfig = () => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })

  const resetForm = () => {
    setUser({
      Id_User: "",
      Tipo_Usuario: 'Usuario Normal',
      Nom_User: "",
      Ape_User: "",
      Genero_User: 'Masculino',
      Email_User: "",
      Tel_User: "",
      Password_User: "",
      confirmado: false,
      Est_User: 'ACTIVO'
    })
  }

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

  const getAllUsers = async () => {
    setIsLoading(true)
    try {
      const response = await clienteAxios.get<User[]>("/users", getConfig())
      if (response.status === 200) {
        setUserList(response.data)
      }
    } catch (error) {
      const apiError = error as ApiError
      setAlerta({
        msg: apiError.response?.data?.message || "Error al cargar usuarios",
        error: true,
        action: getAllUsers,
        actionText: "Reintentar"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getUser = async (Id_User: string) => {
    setButtonForm("Actualizar")
    try {
      const response = await clienteAxios.get<User>(`/users/${Id_User}`, getConfig())
      if (response.status === 200) {
        setUser(response.data)
        setIsDialogOpen(true)
        setStateButton(false)
      }
    } catch (error) {
      const apiError = error as ApiError
      setAlerta({
        msg: apiError.response?.data?.message || "Error al cargar usuario",
        error: true
      })
    }
  }

  const confirmDelete = (Id_User: string) => {
    setUserToDelete(Id_User)
    setDeleteConfirmOpen(true)
  }

  const deleteUser = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    try {
      const response = await clienteAxios.delete(`/users/${userToDelete}`, getConfig())
      if (response.status === 200) {
        await getAllUsers()
        setAlerta({ msg: "Usuario eliminado", error: false })
      }
    } catch (error) {
      const apiError = error as ApiError
      setAlerta({
        msg: apiError.response?.data?.message || "Error eliminando usuario",
        error: true
      })
    } finally {
      setIsDeleting(false)
      setDeleteConfirmOpen(false)
      setUserToDelete(null)
    }
  }

  const handleImportCSV = async (file: File) => {
    setIsImporting(true)
    const formData = new FormData()
    formData.append("file", file)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      }
    }

    try {
      await clienteAxios.post(`${API_URL}/users/import-csv`, formData, config)
      setAlerta({ msg: "Usuarios importados", error: false })
      await getAllUsers()
    } catch (error) {
      const apiError = error as ApiError
      setAlerta({
        msg: apiError.response?.data?.message || "Error importando",
        error: true
      })
    } finally {
      setIsImporting(false)
    }
  }

  const exportData = async (format: string) => {
    setIsExporting(true)
    try {
      const formats: Record<string, { endpoint: string; filename: string; mime: string }> = {
        excel: { endpoint: "/users/export-excel", filename: "Usuarios.xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
        csv: { endpoint: "/users/export-csv", filename: "Usuarios.csv", mime: "text/csv" },
        pdf: { endpoint: "/users/export-pdf", filename: "Usuarios.pdf", mime: "application/pdf" },
        sql: { endpoint: "/users/export-sql", filename: "Usuarios.sql", mime: "application/sql" }
      }

      const { endpoint, filename, mime } = formats[format]
      const response = await clienteAxios.get(endpoint, { ...getConfig(), responseType: "blob" })
      
      const blob = new Blob([response.data], { type: mime })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setAlerta({ msg: `Exportado en ${format.toUpperCase()}`, error: false })
    } catch (error) {
      const apiError = error as ApiError
      setAlerta({
        msg: apiError.response?.data?.message || `Error exportando ${format}`,
        error: true
      })
    } finally {
      setIsExporting(false)
    }
  }

  const updateTextButton = (text: string) => setButtonForm(text)

  const handleNewUser = () => {
    resetForm()
    setButtonForm("Enviar")
    setStateButton(true)
    setIsDialogOpen(true)
  }

  const handleSelectUser = (user: User) => {
    setUser(user)
    setButtonForm("Actualizar")
    setStateButton(false)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <CustomAlert alerta={alerta} setAlerta={setAlerta} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-black p-3 rounded-xl">
            <User2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-gray-500 text-sm mt-1">Gestión de usuarios del sistema</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 rounded-lg border-gray-200 w-full"
              ref={searchInputRef}
            />
            {searchTerm && (
              <button
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
          <span className="text-sm text-gray-500 mb-1">Total Usuarios</span>
          <span className="text-3xl font-bold">{userList.length}</span>
          <Badge variant="outline" className="mt-auto bg-emerald-50 text-emerald-700 border-emerald-200">
            +{userList.filter(u => u.Est_User === 'ACTIVO').length} activos
          </Badge>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Administradores</span>
          <span className="text-3xl font-bold">{userList.filter(u => u.Tipo_Usuario === 'Talento Humano').length}</span>
          <Badge variant="outline" className="mt-auto bg-blue-50 text-blue-700 border-blue-200">
            +{(userList.filter(u => u.Tipo_Usuario === 'Talento Humano').length / userList.length * 100).toFixed(0)}%
          </Badge>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Confirmados</span>
          <span className="text-3xl font-bold">{userList.filter(u => u.confirmado).length}</span>
          <Badge variant="outline" className="mt-auto bg-amber-50 text-amber-700 border-amber-200">
            {(userList.filter(u => u.confirmado).length / userList.length * 100).toFixed(0)}%
          </Badge>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Inactivos</span>
          <span className="text-3xl font-bold">{userList.filter(u => u.Est_User === 'INACTIVO').length}</span>
          <Badge variant="outline" className="mt-auto bg-red-50 text-red-700 border-red-200">
            {(userList.filter(u => u.Est_User === 'INACTIVO').length / userList.length * 100).toFixed(0)}%
          </Badge>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <UserActions
          onImport={handleImportCSV}
          onExport={exportData}
          onNew={handleNewUser}
          isImporting={isImporting}
          isExporting={isExporting}
        />
      </motion.div>

      <Tabs defaultValue="users">
        <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="users" className="rounded-md data-[state=active]:text-black">
            <User2 className="h-4 w-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="stats" className="rounded-md data-[state=active]:text-black">
            <BarChart2 className="h-4 w-4 mr-2" />
            Estadísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="flex justify-end mb-4">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <Button
                variant={viewMode === "cards" ? "ghost" : "ghost"}
                onClick={() => setViewMode("cards")}
                className={`rounded-md ${viewMode === "cards" ? "text-black" : "text-gray-500"}`}
              >
                <Layers className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "ghost" : "ghost"}
                onClick={() => setViewMode("grid")}
                className={`rounded-md ${viewMode === "grid" ? "text-black" : "text-gray-500"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "ghost" : "ghost"}
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
              >
                <UserCardGrid users={userList} onSelectUser={handleSelectUser} />
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserGrid
                  users={userList}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  onSelectUser={handleSelectUser}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserList
                  users={userList}
                  isLoading={isLoading}
                  searchTerm={searchTerm}
                  onEdit={getUser}
                  onDelete={confirmDelete}
                  isDeleting={isDeleting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="stats">
          <UserStats users={userList} />
        </TabsContent>
      </Tabs>

      <DeleteConfirmation
        config={userConfig}
        isOpen={deleteConfirmOpen}
        isDeleting={isDeleting}
        onCancel={() => setDeleteConfirmOpen(false)}
        onConfirm={deleteUser}
      />

      <FormDialog
        config={userConfig}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        buttonForm={buttonForm}
        entity={user}
        updateTextButton={updateTextButton}
        getAllEntities={getAllUsers}
        stateButton={stateButton}
        setStateButton={setStateButton}
      />
    </div>
  )
}