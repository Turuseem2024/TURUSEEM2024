"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Departamento } from "@/app/dashboard/departments/form-departments"


interface DepartmentStatsProps {
  departamentos: Departamento[]
}

const DepartmentStats = ({ departamentos }: DepartmentStatsProps) => {
  const [activeTab, setActiveTab] = useState("monthly")

  // Generar datos ficticios para el gráfico
  const generateChartData = () => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const values = Array.from({ length: 12 }, () => Math.floor(Math.random() * 40) + 30)

    // Crear puntos para el path del SVG
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - (value - 28) / 12
      return `${x},${y}`
    })

    return {
      months,
      values,
      path: `M${points.join(" L")}`,
      area: `M0,100 L${points.join(" L")} L100,100 Z`,
      min: Math.min(...values),
      max: Math.max(...values),
    }
  }

  const chartData = generateChartData()

  // Generar datos ficticios para el gráfico de barras
  const generateBarChartData = () => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
    const values = Array.from({ length: 6 }, () => Math.floor(Math.random() * 300) + 100)

    return {
      months,
      values,
      max: Math.max(...values),
    }
  }

  const barChartData = generateBarChartData()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border border-gray-100 rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Rendimiento de Departamentos</CardTitle>
            <p className="text-sm text-muted-foreground">Estadísticas de rendimiento por mes</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="monthly"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Mensual
                </TabsTrigger>
                <TabsTrigger
                  value="quarterly"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Trimestral
                </TabsTrigger>
                <TabsTrigger
                  value="annually"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Anual
                </TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="h-[200px] relative">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Área bajo la curva */}
                  <path d={chartData.area} fill="url(#gradient)" opacity="0.2" />
                  {/* Línea del gráfico */}
                  <path d={chartData.path} fill="none" stroke="#000000" strokeWidth="1.5" />
                  {/* Puntos en la línea */}
                  {chartData.values.map((value, index) => {
                    const x = (index / (chartData.values.length - 1)) * 100
                    const y = 100 - (value - 28) / 12
                    return <circle key={index} cx={x} cy={y} r="1" fill="#000000" />
                  })}
                  {/* Definición del gradiente */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Etiquetas del eje X */}
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  {chartData.months.map((month, index) => (
                    <div key={index} className={index % 2 === 0 ? "" : "hidden sm:block"}>
                      {month}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="quarterly" className="h-[200px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Datos trimestrales disponibles próximamente
                </div>
              </TabsContent>
              <TabsContent value="annually" className="h-[200px]">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Datos anuales disponibles próximamente
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border border-gray-100 rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Actividad de Departamentos</CardTitle>
            <p className="text-sm text-muted-foreground">Número de actualizaciones por mes</p>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
              {barChartData.months.map((month, index) => {
                const height = (barChartData.values[index] / barChartData.max) * 100
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-8 bg-gray-900 rounded-t-md" style={{ height: `${height}%` }}></div>
                    <div className="text-xs text-muted-foreground mt-2">{month}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default DepartmentStats
