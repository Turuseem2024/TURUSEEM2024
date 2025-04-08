import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export type AlertaType = {
  msg: string
  error: boolean
} | null

interface AlertaProps {
  alerta: {
    msg: string
    error: boolean
  }
}

export default function Alerta({ alerta }: AlertaProps) {
  return (
    <Alert className={`mb-4 ${alerta.error ? "bg-destructive/15" : "bg-green-100"}`}>
      {alerta.error ? (
        <AlertCircle className="h-4 w-4 text-destructive" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      )}
      <AlertDescription className={alerta.error ? "text-destructive" : "text-green-600"}>{alerta.msg}</AlertDescription>
    </Alert>
  )
}

