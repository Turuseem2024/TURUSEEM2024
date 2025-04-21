"use client"

import type React from "react"

import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface AlertaProps {
  msg: string
  error: boolean
  action?: () => void
  actionText?: string
  customIcon?: React.ReactNode
}

interface CustomAlertProps {
  alerta: AlertaProps | null
  setAlerta: (alerta: AlertaProps | null) => void
}

const CustomAlert = ({ alerta, setAlerta }: CustomAlertProps) => {
  if (!alerta) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert
        variant={alerta.error ? "destructive" : "default"}
        className={`rounded-xl ${
          alerta.error ? "bg-red-50 border border-red-100" : "bg-emerald-50 border border-emerald-100"
        }`}
      >
        <div className="flex items-start">
          {alerta.customIcon ||
            (alerta.error ? (
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
            ))}
          <div className="ml-3 flex-1">
            <AlertDescription className={`text-base font-medium ${alerta.error ? "text-red-700" : "text-emerald-700"}`}>
              {alerta.msg}
            </AlertDescription>
            {alerta.action && (
              <Button
                variant="link"
                onClick={alerta.action}
                className={`p-0 h-auto ${alerta.error ? "text-red-700" : "text-emerald-700"} font-medium mt-1`}
              >
                {alerta.actionText || "Reintentar"}
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg ml-auto -mt-1 -mr-1"
            onClick={() => setAlerta(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Alert>
    </motion.div>
  )
}

export default CustomAlert
