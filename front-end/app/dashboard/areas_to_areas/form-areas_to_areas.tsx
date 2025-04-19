  // "use client"

  // import { useRef, useState, useEffect, useCallback } from "react"
  // import axios from "axios"
  // import { z } from "zod"
  // import { zodResolver } from "@hookform/resolvers/zod"
  // import { useForm } from "react-hook-form"
  // import { format } from "date-fns"
  // import { CalendarIcon, Loader2 } from "lucide-react"

  
  // import { Button } from "@/components/ui/button"
  // import { Input } from "@/components/ui/input"
  // import { Label } from "@/components/ui/label"
  // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
  // import { Alert, AlertDescription } from "@/components/ui/alert"
  // import { Calendar } from "@/components/ui/calendar"
  // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
  // import { cn } from "@/lib/utils"

  // const URI = "/ciudades/"
  // const UriFichas = "/fichas/"

  // // Define interfaces for our data structures
  // interface Ciudad {
  //   Id_Ciudad: string
  //   Nom_Ciudad: string
  // }

  // interface Ficha {
  //   Id_Ficha: string
  //   // Add other ficha properties if needed
  // }

  // interface Apprentice {
  //   Id_Aprendiz: string
  //   Nom_Aprendiz: string
  //   Ape_Aprendiz: string
  //   Id_Ficha: string
  //   Fec_Nacimiento: string | Date
  //   Id_Ciudad: string
  //   Lugar_Residencia: string
  //   Edad: string | number
  //   Hijos: string
  //   Nom_Eps: string
  //   Tel_Padre: string
  //   Gen_Aprendiz: string
  //   Cor_Aprendiz: string
  //   Tel_Aprendiz: string
  //   Patrocinio: string
  //   Estado: string
  //   Nom_Empresa: string
  //   CentroConvivencia: string
  //   Foto_Aprendiz?: File | null
  // }

  // interface ApiError {
  //   response?: {
  //     data?: {
  //       message?: string
  //     }
  //   }
  //   message?: string
  // }

  // // Define the form schema with Zod
  // const formSchema = z.object({
  //   Id_Aprendiz: z.string().min(7, "El documento debe tener al menos 7 dígitos"),
  //   Nom_Aprendiz: z.string().min(1, "El nombre es requerido"),
  //   Ape_Aprendiz: z.string().min(1, "Los apellidos son requeridos"),
  //   Id_Ficha: z.string().min(1, "La ficha es requerida"),
  //   Fec_Nacimiento: z.date({
  //     required_error: "La fecha de nacimiento es requerida",
  //   }),
  //   Id_Ciudad: z.string().min(1, "La ciudad es requerida"),
  //   Lugar_Residencia: z.string().min(1, "El lugar de residencia es requerido"),
  //   Edad: z.string().min(1, "La edad es requerida"),
  //   Hijos: z.string().min(1, "Debe seleccionar una opción"),
  //   Nom_Eps: z.string().min(1, "La EPS es requerida"),
  //   Tel_Padre: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  //   Gen_Aprendiz: z.string().min(1, "El género es requerido"),
  //   Cor_Aprendiz: z.string().email("Correo electrónico inválido"),
  //   Tel_Aprendiz: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  //   Patrocinio: z.string().min(1, "Debe seleccionar una opción"),
  //   Estado: z.string().min(1, "El estado es requerido"),
  //   Nom_Empresa: z.string().optional(),
  //   CentroConvivencia: z.string().min(1, "Debe seleccionar una opción"),
  //   Foto_Aprendiz: z.any().optional(),
  // })

  // type FormValues = z.infer<typeof formSchema>

  // interface FormApprenticesProps {
  //   buttonForm: string
  //   apprentice: Apprentice
  //   updateTextButton: (text: string) => void
  //   getAllApprentices: () => void
  //   stateButton: boolean
  //   setStateButton: (state: boolean) => void
  // }

  // export default function FormApprentices({
  //   buttonForm,
  //   apprentice,
  //   updateTextButton,
  //   getAllApprentices,
  //   stateButton,
  //   setStateButton,
  // }: FormApprenticesProps) {
  //   const [fichas, setFichas] = useState<Ficha[]>([])
  //   const [ciudades, setCiudades] = useState<Ciudad[]>([])
  //   const [loading, setLoading] = useState(true)
  //   const [alerta, setAlerta] = useState<{ msg: string; error: boolean } | null>(null)
  //   const [isSubmitting, setIsSubmitting] = useState(false)
  //   const fileInputRef = useRef<HTMLInputElement>(null)

  //   // Initialize form with react-hook-form
  //   const form = useForm<FormValues>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       Id_Aprendiz: "",
  //       Nom_Aprendiz: "",
  //       Ape_Aprendiz: "",
  //       Id_Ficha: "",
  //       Fec_Nacimiento: undefined,
  //       Id_Ciudad: "",
  //       Lugar_Residencia: "",
  //       Edad: "",
  //       Hijos: "",
  //       Nom_Eps: "",
  //       Tel_Padre: "",
  //       Gen_Aprendiz: "",
  //       Cor_Aprendiz: "",
  //       Tel_Aprendiz: "",
  //       Patrocinio: "",
  //       Estado: "",
  //       Nom_Empresa: "",
  //       CentroConvivencia: "",
  //     },
  //   })

  //   const patrocinioValue = form.watch("Patrocinio")

  //   // Get token from localStorage (assuming it's stored there)
  //   // Memoize the token retrieval function
  //   const getToken = useCallback(() => {
  //     if (typeof window !== "undefined") {
  //       return localStorage.getItem("token") || ""
  //     }
  //     return ""
  //   }, [])

  //   // Create config object for API requests, memoized with useCallback
  //   const getConfig = useCallback(() => {
  //     return {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${getToken()}`,
  //       },
  //     }
  //   }, [getToken])

  //   // Fetch cities and fichas on component mount
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true)
  //       const config = getConfig()

  //       try {
  //         const [ciudadesResponse, fichasResponse] = await Promise.all([
  //           axios.get<Ciudad[]>(URI, config),
  //           axios.get<Ficha[]>(UriFichas, config),
  //         ])

  //         if (ciudadesResponse.status === 200) {
  //           setCiudades(ciudadesResponse.data || [])
  //         }

  //         if (fichasResponse.status === 200) {
  //           setFichas(Array.isArray(fichasResponse.data) ? fichasResponse.data : [])
  //         }
  //       } catch (error) {
  //         const apiError = error as ApiError
  //         console.error("Error fetching data:", apiError)
  //         setAlerta({
  //           msg: apiError.response?.data?.message || "Error al cargar datos",
  //           error: true,
  //         })
  //         // Ensure arrays are initialized even on error
  //         setCiudades([])
  //         setFichas([])
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     fetchData()
  //   }, [getConfig]) // Include getConfig in the dependency array

  //   // Set form data when apprentice prop changes
  //   useEffect(() => {
  //     if (apprentice && Object.keys(apprentice).length > 0) {
  //       form.reset({
  //         Id_Aprendiz: apprentice.Id_Aprendiz || "",
  //         Nom_Aprendiz: apprentice.Nom_Aprendiz || "",
  //         Ape_Aprendiz: apprentice.Ape_Aprendiz || "",
  //         Id_Ficha: apprentice.Id_Ficha || "",
  //         Fec_Nacimiento: apprentice.Fec_Nacimiento ? new Date(apprentice.Fec_Nacimiento) : undefined,
  //         Id_Ciudad: apprentice.Id_Ciudad || "",
  //         Lugar_Residencia: apprentice.Lugar_Residencia || "",
  //         Edad: apprentice.Edad?.toString() || "",
  //         Hijos: apprentice.Hijos || "",
  //         Nom_Eps: apprentice.Nom_Eps || "",
  //         Tel_Padre: apprentice.Tel_Padre || "",
  //         Gen_Aprendiz: apprentice.Gen_Aprendiz || "",
  //         Cor_Aprendiz: apprentice.Cor_Aprendiz || "",
  //         Tel_Aprendiz: apprentice.Tel_Aprendiz || "",
  //         Patrocinio: apprentice.Patrocinio || "",
  //         Estado: apprentice.Estado || "",
  //         Nom_Empresa: apprentice.Nom_Empresa || "",
  //         CentroConvivencia: apprentice.CentroConvivencia || "",
  //       })
  //     }
  //   }, [apprentice, form])

  //   // Calculate age from birth date
  //   const calculateAge = (birthDate: Date): string => {
  //     const today = new Date()
  //     const birth = new Date(birthDate)
  //     let age = today.getFullYear() - birth.getFullYear()
  //     const monthDifference = today.getMonth() - birth.getMonth()

  //     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
  //       age--
  //     }
  //     return age.toString()
  //   }

  //   // Handle form submission
  //   const onSubmit = async (data: FormValues) => {
  //     setIsSubmitting(true)
  //     const config = getConfig()

  //     try {
  //       const formData = new FormData()

  //       // Add all form fields to FormData
  //       Object.entries(data).forEach(([key, value]) => {
  //         if (key === "Fec_Nacimiento" && value instanceof Date) {
  //           formData.append(key, value.toISOString().split("T")[0])
  //         } else if (key !== "Foto_Aprendiz") {
  //           formData.append(key, value?.toString() || "")
  //         }
  //       })

  //       // Add file if selected
  //       if (fileInputRef.current?.files?.[0]) {
  //         formData.append("Foto_Aprendiz", fileInputRef.current.files[0])
  //       }

  //       let response
  //       if (buttonForm === "Actualizar") {
  //         response = await axios.put(`/aprendiz/${data.Id_Aprendiz}`, formData, config)
  //         setStateButton(true)
  //       } else {
  //         response = await axios.post("/aprendiz", formData, config)
  //       }

  //       if (response.status === 200 || response.status === 201) {
  //         setAlerta({
  //           msg: response.data.message || "Operación exitosa",
  //           error: false,
  //         })
  //         getAllApprentices()
  //         clearForm()
  //         updateTextButton("Enviar")
  //       }
  //     } catch (error) {
  //       const apiError = error as ApiError
  //       setAlerta({
  //         msg: apiError.response?.data?.message || "Error en la operación",
  //         error: true,
  //       })
  //     } finally {
  //       setIsSubmitting(false)
  //     }
  //   }

  //   // Clear form fields
  //   const clearForm = () => {
  //     form.reset({
  //       Id_Aprendiz: "",
  //       Nom_Aprendiz: "",
  //       Ape_Aprendiz: "",
  //       Id_Ficha: "",
  //       Fec_Nacimiento: undefined,
  //       Id_Ciudad: "",
  //       Lugar_Residencia: "",
  //       Edad: "",
  //       Hijos: "",
  //       Nom_Eps: "",
  //       Tel_Padre: "",
  //       Gen_Aprendiz: "",
  //       Cor_Aprendiz: "",
  //       Tel_Aprendiz: "",
  //       Patrocinio: "",
  //       Estado: "",
  //       Nom_Empresa: "",
  //       CentroConvivencia: "",
  //     })
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = ""
  //     }
  //   }

  //   return (
  //     <div className="flex justify-center items-center w-full">
  //       <div className="bg-white rounded-2xl px-8 py-6 w-full max-w-7xl shadow-sm">
  //         {alerta && (
  //           <Alert className={cn("mb-6", alerta.error ? "bg-destructive/15" : "bg-primary/15")}>
  //             <AlertDescription>{alerta.msg}</AlertDescription>
  //           </Alert>
  //         )}

  //         <Form {...form}>
  //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //               {/* Documento */}
  //               <FormField
  //                 control={form.control}
  //                 name="Id_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Documento</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Documento del Aprendiz"
  //                         type="number"
  //                         {...field}
  //                         disabled={buttonForm === "Actualizar"}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value === "" || (Number(value) > 0 && value.length <= 10)) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Nombres */}
  //               <FormField
  //                 control={form.control}
  //                 name="Nom_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Nombres</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Nombres"
  //                         {...field}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value.length <= 60) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Apellidos */}
  //               <FormField
  //                 control={form.control}
  //                 name="Ape_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Apellidos</FormLabel>
  //                     <FormControl>
  //                       <Input placeholder="Apellidos" {...field} />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Fichas */}
  //               <FormField
  //                 control={form.control}
  //                 name="Id_Ficha"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Fichas</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione la Ficha" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         {Array.isArray(fichas) && fichas.length > 0 ? (
  //                           fichas.map((ficha) => (
  //                             <SelectItem key={ficha.Id_Ficha} value={ficha.Id_Ficha}>
  //                               {ficha.Id_Ficha}
  //                             </SelectItem>
  //                           ))
  //                         ) : (
  //                           <SelectItem value="loading" disabled>
  //                             {loading ? "Cargando fichas..." : "No hay fichas disponibles"}
  //                           </SelectItem>
  //                         )}
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Fecha de Nacimiento */}
  //               <FormField
  //                 control={form.control}
  //                 name="Fec_Nacimiento"
  //                 render={({ field }) => (
  //                   <FormItem className="flex flex-col">
  //                     <FormLabel>Fecha de Nacimiento</FormLabel>
  //                     <Popover>
  //                       <PopoverTrigger asChild>
  //                         <FormControl>
  //                           <Button
  //                             variant={"outline"}
  //                             className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
  //                           >
  //                             {field.value ? format(field.value, "dd/MM/yyyy") : <span>Seleccione una fecha</span>}
  //                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
  //                           </Button>
  //                         </FormControl>
  //                       </PopoverTrigger>
  //                       <PopoverContent className="w-auto p-0" align="start">
  //                         <Calendar
  //                           mode="single"
  //                           selected={field.value}
  //                           onSelect={(date) => {
  //                             field.onChange(date)
  //                             if (date) {
  //                               form.setValue("Edad", calculateAge(date))
  //                             }
  //                           }}
  //                           disabled={(date) => date > new Date() || date > new Date("2009-12-31")}
  //                           initialFocus
  //                         />
  //                       </PopoverContent>
  //                     </Popover>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Ciudad */}
  //               <FormField
  //                 control={form.control}
  //                 name="Id_Ciudad"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Ciudad</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione una Ciudad" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         {Array.isArray(ciudades) && ciudades.length > 0 ? (
  //                           ciudades.map((ciudad) => (
  //                             <SelectItem key={ciudad.Id_Ciudad} value={ciudad.Id_Ciudad}>
  //                               {ciudad.Nom_Ciudad}
  //                             </SelectItem>
  //                           ))
  //                         ) : (
  //                           <SelectItem value="loading" disabled>
  //                             {loading ? "Cargando ciudades..." : "No hay ciudades disponibles"}
  //                           </SelectItem>
  //                         )}
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Lugar Residencia */}
  //               <FormField
  //                 control={form.control}
  //                 name="Lugar_Residencia"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Lugar Residencia</FormLabel>
  //                     <FormControl>
  //                       <Input placeholder="Dirección Casa" {...field} />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Edad */}
  //               <FormField
  //                 control={form.control}
  //                 name="Edad"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Edad</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Edad"
  //                         type="number"
  //                         {...field}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value === "" || (Number(value) > 0 && value.length <= 2)) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Hijos */}
  //               <FormField
  //                 control={form.control}
  //                 name="Hijos"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Hijos</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         <SelectItem value="Si">Si</SelectItem>
  //                         <SelectItem value="No">No</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* EPS */}
  //               <FormField
  //                 control={form.control}
  //                 name="Nom_Eps"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>EPS</FormLabel>
  //                     <FormControl>
  //                       <Input placeholder="Nombre de la EPS" {...field} />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Teléfono del Padre */}
  //               <FormField
  //                 control={form.control}
  //                 name="Tel_Padre"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Teléfono del Padre</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Teléfono del Padre"
  //                         type="number"
  //                         {...field}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value === "" || (Number(value) > 0 && value.length <= 10)) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Género */}
  //               <FormField
  //                 control={form.control}
  //                 name="Gen_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Género</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione Uno" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         <SelectItem value="Masculino">Masculino</SelectItem>
  //                         <SelectItem value="Femenino">Femenino</SelectItem>
  //                         <SelectItem value="Otro">Otro</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Correo */}
  //               <FormField
  //                 control={form.control}
  //                 name="Cor_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Correo</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Correo"
  //                         type="email"
  //                         {...field}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value.length <= 60) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Teléfono Aprendiz */}
  //               <FormField
  //                 control={form.control}
  //                 name="Tel_Aprendiz"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Teléfono Aprendiz</FormLabel>
  //                     <FormControl>
  //                       <Input
  //                         placeholder="Teléfono"
  //                         type="number"
  //                         {...field}
  //                         onChange={(e) => {
  //                           const value = e.target.value
  //                           if (value === "" || (Number(value) > 0 && value.length <= 10)) {
  //                             field.onChange(value)
  //                           }
  //                         }}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Patrocinio */}
  //               <FormField
  //                 control={form.control}
  //                 name="Patrocinio"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Patrocinio</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         <SelectItem value="Si">Si</SelectItem>
  //                         <SelectItem value="No">No</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Nombre de la Empresa (condicional) */}
  //               {patrocinioValue === "Si" && (
  //                 <FormField
  //                   control={form.control}
  //                   name="Nom_Empresa"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Nombre de la Empresa</FormLabel>
  //                       <FormControl>
  //                         <Input placeholder="Nombre de la Empresa" {...field} />
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //               )}

  //               {/* Estado */}
  //               <FormField
  //                 control={form.control}
  //                 name="Estado"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Estado</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione un Estado" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         <SelectItem value="Activo">Activo</SelectItem>
  //                         <SelectItem value="Inactivo">Inactivo</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Centro de Convivencia */}
  //               <FormField
  //                 control={form.control}
  //                 name="CentroConvivencia"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Centro de Convivencia</FormLabel>
  //                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
  //                       <FormControl>
  //                         <SelectTrigger>
  //                           <SelectValue placeholder="Seleccione" />
  //                         </SelectTrigger>
  //                       </FormControl>
  //                       <SelectContent>
  //                         <SelectItem value="Si">Sí</SelectItem>
  //                         <SelectItem value="No">No</SelectItem>
  //                       </SelectContent>
  //                     </Select>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               {/* Foto Del Aprendiz */}
  //               <div className="space-y-2">
  //                 <Label htmlFor="Foto_Aprendiz">Foto Del Aprendiz</Label>
  //                 <Input id="Foto_Aprendiz" type="file" accept="image/*" ref={fileInputRef} className="cursor-pointer" />
  //               </div>
  //             </div>

  //             <div className="border-t pt-4 mt-6">
  //               <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //                 <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
  //                   {isSubmitting ? (
  //                     <>
  //                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //                       Procesando...
  //                     </>
  //                   ) : (
  //                     buttonForm
  //                   )}
  //                 </Button>

  //                 {stateButton && (
  //                   <Button
  //                     type="button"
  //                     variant="secondary"
  //                     className="w-full sm:w-auto"
  //                     onClick={() => {
  //                       clearForm()
  //                       updateTextButton("Enviar")
  //                     }}
  //                   >
  //                     Limpiar
  //                   </Button>
  //                 )}
  //               </div>
  //             </div>
  //           </form>
  //         </Form>
  //       </div>
  //     </div>
  //   )
  // }

