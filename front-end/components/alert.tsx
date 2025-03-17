"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface AlertaProps {
  alerta: {
    msg: string
    error: boolean
  }
  setAlerta: (alerta: { msg: string; error: boolean } | null) => void
}

export default function Alerta({ alerta, setAlerta }: AlertaProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => setAlerta(null), 300) // Clear alert after fade out
    }, 5000)

    return () => clearTimeout(timer)
  }, [alerta, setAlerta])

  return (
    <Alert
      className={cn(
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
        alerta.error ? "bg-destructive/15" : "bg-primary/15",
      )}
      variant={alerta.error ? "destructive" : "default"}
    >
      {alerta.error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      <AlertTitle>{alerta.error ? "Error" : "Éxito"}</AlertTitle>
      <AlertDescription>{alerta.msg}</AlertDescription>
    </Alert>
  )
}

