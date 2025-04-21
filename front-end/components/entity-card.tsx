"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface EntityConfig {
  name: string
  endpoint: string
  fields: {
    name: string
    label: string
    type: string
    disabled?: boolean
    hidden?: boolean
  }[]
  idField: string
  nameField: string
  icon?: React.ReactNode
}

interface EntityCardProps {
  config: EntityConfig
  entity: any
  index: number
  customIcon?: React.ReactNode
  customContent?: React.ReactNode
  onClick?: () => void
}

const EntityCard = ({ config, entity, index, customIcon, customContent, onClick }: EntityCardProps) => {
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
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className="overflow-hidden border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          {customContent || (
            <>
              <div className="flex items-center gap-4">
                <Avatar className={`h-12 w-12 ${colorScheme.icon} text-white`}>
                  <AvatarFallback>
                    {customIcon || config.icon || entity[config.nameField]?.charAt(0) || "E"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium text-lg">{entity[config.nameField]}</h3>
                  <p className="text-sm text-muted-foreground">{entity[config.idField]}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-bold">{entity[config.idField]}</div>
                <div className={`flex items-center ${trend.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                  {trend.isPositive ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  )}
                  <span className="font-medium">
                    {trend.isPositive ? "+" : "-"}
                    {trend.value}%
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EntityCard
