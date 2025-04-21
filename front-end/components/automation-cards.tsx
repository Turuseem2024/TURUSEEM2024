"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

const AutomationCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Crear Automatización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Enviar SMS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="font-medium">Activado</span>
            </div>
            <div className="text-sm text-muted-foreground">Estado del Sistema • 45 Mins Atrás</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full bg-gray-900 hover:bg-gray-800">Confirmar Acción</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-blue-500 text-white rounded-xl shadow-sm border-0">
          <CardContent className="p-6 space-y-4">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm opacity-90">Monitoreo Continuo</p>
              <p className="text-sm opacity-90">Y Cuando La Condición es Cumplida, La Acción es Activada</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border">
          <CardHeader className="pb-2">
            <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">Dime</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">Acción Activada</p>
            <p className="font-medium">SMS Enviado Exitosamente</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t pt-4">Lunes, 11 Nov</CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:col-span-2"
      >
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Constructor de Flujos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Dime Permite al Usuario Crear Automatizaciones</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border">
          <CardContent className="p-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AutomationCards
