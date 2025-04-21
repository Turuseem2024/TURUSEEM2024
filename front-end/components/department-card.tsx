"use client"

import { motion } from "framer-motion"
import { Building2, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Departamento } from "@/app/dashboard/departments/form-departments"

interface DepartmentCardProps {
  departamento: Departamento
  index: number
}

const DepartmentCard = ({ departamento, index }: DepartmentCardProps) => {
  // Generar datos ficticios para simular estadísticas
  const getRandomTrend = () => {
    const isPositive = Math.random() > 0.3
    return {
      value: (Math.random() * 15).toFixed(2),
      isPositive,
    }
  }

  const trend = getRandomTrend()

  // Colores para las tarjetas basados en el índice
  const cardColors = [
    { bg: "bg-gray-50", icon: "bg-gray-900", text: "text-gray-900" },
    { bg: "bg-gray-50", icon: "bg-gray-700", text: "text-gray-700" },
    { bg: "bg-gray-50", icon: "bg-gray-800", text: "text-gray-800" },
    { bg: "bg-gray-50", icon: "bg-black", text: "text-black" },
  ]

  const colorScheme = cardColors[index % cardColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className={`h-12 w-12 ${colorScheme.icon} text-white`}>
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium text-lg">{departamento.Nom_Departamento}</h3>
              <p className="text-sm text-muted-foreground">{departamento.Id_Departamento}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-2xl font-bold">{departamento.Id_Departamento}</div>
            <div className={`flex items-center ${trend.isPositive ? "text-emerald-600" : "text-red-500"}`}>
              {trend.isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
              <span className="font-medium">
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DepartmentCard
