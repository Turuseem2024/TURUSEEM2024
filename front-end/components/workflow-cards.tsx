"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, Zap, ArrowRight } from "lucide-react"

const WorkflowCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Enviar SMS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-900"></div>
              <span>Automatización</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="font-medium">Activado</span>
            </div>
            <div className="text-sm text-muted-foreground">Estado del Sistema • 45 Mins Atrás</div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-lg bg-black hover:bg-gray-800">Confirmar Acción</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-black text-white rounded-xl shadow-sm border-0 h-full">
          <CardContent className="p-6 space-y-4">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <Eye className="h-5 w-5 text-black" />
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
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
          <CardHeader className="pb-2">
            <Badge className="w-fit bg-gray-100 text-gray-800 hover:bg-gray-100 border-0">Dime</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">Acción Activada</p>
            <p className="font-medium">SMS Enviado Exitosamente</p>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground border-t border-gray-100 pt-4">Lunes, 11 Nov</CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:col-span-2"
      >
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Constructor de Flujos</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="text-muted-foreground mb-4">Dime Permite al Usuario Crear Automatizaciones</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                <MessageSquare className="h-4 w-4" />
                <span>Enviar SMS</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                <Zap className="h-4 w-4" />
                <span>Activar Acción</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-black flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-black"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default WorkflowCards
