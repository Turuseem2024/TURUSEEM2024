"use client"

import type React from "react"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

interface EntityCardGridProps {
  config: EntityConfig
  entities: any[]
  onSelectEntity: (entity: any) => void
  limit?: number
  customContent?: (entity: any, index: number) => React.ReactNode
}

const EntityCardGrid = ({ config, entities, onSelectEntity, limit = 4, customContent }: EntityCardGridProps) => {
  // Generar datos ficticios para simular estadísticas
  const getRandomTrend = () => {
    const isPositive = Math.random() > 0.3
    return {
      value: (Math.random() * 15).toFixed(2),
      isPositive,
    }
  }

  // Colores para las tarjetas basados en el diseño de la imagen
  const cardColors = [
    { bg: "bg-white", border: "border-gray-100", accent: "bg-black" },
    { bg: "bg-white", border: "border-gray-100", accent: "bg-gray-800" },
    { bg: "bg-white", border: "border-gray-100", accent: "bg-gray-900" },
    { bg: "bg-white", border: "border-gray-100", accent: "bg-gray-700" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {entities.slice(0, limit).map((entity, index) => {
        const trend = getRandomTrend()
        const colorScheme = cardColors[index % cardColors.length]

        return (
          <motion.div
            key={entity[config.idField]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="cursor-pointer"
            onClick={() => onSelectEntity(entity)}
          >
            {customContent ? (
              customContent(entity, index)
            ) : (
              <Card
                className={`overflow-hidden ${colorScheme.bg} border ${colorScheme.border} rounded-xl shadow-sm hover:shadow-md transition-all`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">{entity[config.nameField]}</h3>
                      <p className="text-sm text-gray-500 mt-1">ID: {entity[config.idField]}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorScheme.accent}`}>
                      <span className="text-white font-bold">{entity[config.nameField].substring(0, 2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 100) + 10}</div>
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
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-gray-700 hover:text-black hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectEntity(entity)
                    }}
                  >
                    Ver detalles <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default EntityCardGrid
