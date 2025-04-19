// "use client"

// import { useState, useEffect } from "react"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle, CheckCircle2 } from "lucide-react"

// // Define the schema for form validation
// const formSchema = z.object({
//   Id_Ficha: z.string().min(6, { message: "El Numero de Ficha No puede Tener menos de 6 Digitos" }),
//   Fec_InicioEtapaLectiva: z.string().min(1, { message: "La Fecha de Inicio esta Vacia" }),
//   Fec_FinEtapaLectiva: z.string().min(1, { message: "La Fecha de Fin esta Vacia" }),
//   Can_Aprendices: z.string().min(1, { message: "La Cantidad de Aprendices esta Vacia" }),
//   Id_ProgramaFormacion: z.string().min(1, { message: "El Nombre del Programa esta Vacio" }),
//   Estado: z.string().min(1, { message: "El Estado de Ficha esta Vacia" }),
// })

// // Define types
// interface ProgramaFormacion {
//   Id_ProgramaFormacion: string
//   Nom_ProgramaFormacion: string
// }

// interface Ficha {
//   Id_Ficha?: string
//   Fec_InicioEtapaLectiva?: string
//   Fec_FinEtapaLectiva?: string
//   Can_Aprendices?: string
//   Id_ProgramaFormacion?: string
//   Estado?: string
// }

// interface FormFichasProps {
//   buttonForm: string
//   fichas: Ficha
//   updateTextButton: (text: string) => void
//   getAllFichas: () => void
//   stateButton: boolean
//   setStateButton: (state: boolean) => void
// }

// interface AlertaProps {
//   msg: string
//   error: boolean
// }

// const FormFichas = ({
//   buttonForm = "Enviar",
//   fichas = {},
//   updateTextButton = () => {},
//   getAllFichas = () => {},
//   stateButton = false,
//   setStateButton = () => {},
// }: FormFichasProps) => {
//   const [programasformacion, setProgramasFormacion] = useState<ProgramaFormacion[]>([])
//   const [alerta, setAlerta] = useState<AlertaProps | null>(null)

//   // Initialize form with react-hook-form
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       Id_Ficha: "",
//       Fec_InicioEtapaLectiva: "",
//       Fec_FinEtapaLectiva: "",
//       Can_Aprendices: "",
//       Id_ProgramaFormacion: "",
//       Estado: "",
//     },
//   })

//   // Fetch programas on component mount
//   useEffect(() => {
//     const fetchProgramas = async () => {
//       try {
//         // Sample data for demonstration
//         const sampleData = [
//           { Id_ProgramaFormacion: "1", Nom_ProgramaFormacion: "Desarrollo de Software" },
//           { Id_ProgramaFormacion: "2", Nom_ProgramaFormacion: "Análisis de Datos" },
//           { Id_ProgramaFormacion: "3", Nom_ProgramaFormacion: "Diseño Gráfico" },
//         ]
//         setProgramasFormacion(sampleData)

//         // Uncomment this when you have the API ready
//         /*
//         const token = localStorage.getItem("token")
//         const response = await axios.get("/api/programa", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         if (response.status === 200) {
//           setProgramasFormacion(response.data)
//         }
//         */
//       } catch (error) {
//         console.error("Error fetching Programas:", error)
//       }
//     }

//     fetchProgramas()
//   }, [])

//   // Set form data when fichas prop changes
//   useEffect(() => {
//     if (fichas && Object.keys(fichas).length > 0) {
//       form.reset({
//         Id_Ficha: fichas.Id_Ficha || "",
//         Fec_InicioEtapaLectiva: fichas.Fec_InicioEtapaLectiva || "",
//         Fec_FinEtapaLectiva: fichas.Fec_FinEtapaLectiva || "",
//         Can_Aprendices: fichas.Can_Aprendices || "",
//         Id_ProgramaFormacion: fichas.Id_ProgramaFormacion || "",
//         Estado: fichas.Estado || "",
//       })
//     }
//   }, [fichas, form])

//   // Form submission handler
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       let mensajCRUD = ""

//       if (buttonForm === "Actualizar") {
//         // Simulate API call
//         console.log("Updating ficha:", values)
//         setStateButton(true)
//         mensajCRUD = "Ficha Actualizada Exitosamente"
//       } else if (buttonForm === "Enviar") {
//         // Simulate API call
//         console.log("Creating ficha:", values)
//         mensajCRUD = "Ficha Registrada Exitosamente"
//       }

//       setAlerta({
//         msg: mensajCRUD,
//         error: false,
//       })
//       clearForm()
//       getAllFichas()
//       updateTextButton("Enviar")

//       // Uncomment this when you have the API ready
//       /*
//       const token = localStorage.getItem("token")
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       let respuestApi
//       if (buttonForm === "Actualizar") {
//         respuestApi = await axios.put(
//           `/api/fichas/${fichas.Id_Ficha}`,
//           values,
//           config
//         )
//         setStateButton(true)
//         mensajCRUD = "Ficha Actualizada Exitosamente"
//       } else if (buttonForm === "Enviar") {
//         respuestApi = await axios.post(
//           `/api/fichas`,
//           values,
//           config
//         )
//         mensajCRUD = "Ficha Registrada Exitosamente"
//       }

//       if (respuestApi && (respuestApi.status === 201 || respuestApi.status === 200)) {
//         setAlerta({
//           msg: mensajCRUD,
//           error: false,
//         })
//         clearForm()
//         getAllFichas()
//         updateTextButton("Enviar")
//       }
//       */
//     } catch (error) {
//       setAlerta({
//         msg: "Todos los campos son obligatorios!",
//         error: true,
//       })
//     }
//   }

//   // Clear form fields
//   const clearForm = () => {
//     form.reset({
//       Id_Ficha: "",
//       Fec_InicioEtapaLectiva: "",
//       Fec_FinEtapaLectiva: "",
//       Can_Aprendices: "",
//       Id_ProgramaFormacion: "",
//       Estado: "",
//     })
//   }

//   return (
//     <div className="flex justify-center items-center">
//       <Card className="w-full max-w-4xl">
//         <CardContent className="pt-6">
//           {alerta && (
//             <Alert variant={alerta.error ? "destructive" : "default"} className="mb-4">
//               {alerta.error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
//               <AlertDescription>{alerta.msg}</AlertDescription>
//             </Alert>
//           )}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="Id_Ficha"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Numero de Ficha:</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder="Numero"
//                         {...field}
//                         disabled={buttonForm === "Actualizar"}
//                         onChange={(e) => {
//                           if (e.target.value.length <= 7) {
//                             field.onChange(e.target.value)
//                           }
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="Fec_InicioEtapaLectiva"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Fecha Inicio Etapa Lectiva:</FormLabel>
//                       <FormControl>
//                         <Input type="date" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="Fec_FinEtapaLectiva"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Fecha Fin Etapa Lectiva:</FormLabel>
//                       <FormControl>
//                         <Input type="date" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="Can_Aprendices"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Cantidad de Aprendices:</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         {...field}
//                         onChange={(e) => {
//                           if (e.target.value.length <= 2) {
//                             field.onChange(e.target.value)
//                           }
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="Id_ProgramaFormacion"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nombre del Programa de Formacion:</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value || undefined}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Seleccione un Nombre de Programa" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {programasformacion.map((programa) => (
//                           <SelectItem key={programa.Id_ProgramaFormacion} value={programa.Id_ProgramaFormacion}>
//                             {programa.Nom_ProgramaFormacion}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="Estado"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Estado:</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value || undefined}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Seleccione un Estado" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="Activo">Activa</SelectItem>
//                         <SelectItem value="Inactivo">Inactiva</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex flex-col sm:flex-row justify-around gap-2 pt-4">
//                 <Button type="submit" className="w-full sm:w-auto">
//                   {buttonForm}
//                 </Button>
//                 {stateButton && (
//                   <Button
//                     type="button"
//                     variant="destructive"
//                     className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white"
//                     onClick={() => {
//                       clearForm()
//                       updateTextButton("Enviar")
//                     }}
//                   >
//                     Limpiar
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default FormFichas

