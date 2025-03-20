"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Bienvenido a TURUSEEM</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          El sistema que asigna turnos a las unidades de manera eficiente
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-center">Sistema de Gestión de Turnos</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">
              TURUSEEM te permite administrar y asignar turnos a todas las unidades de manera organizada y eficiente.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Comenzar</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

