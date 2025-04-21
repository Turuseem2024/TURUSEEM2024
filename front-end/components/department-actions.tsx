"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUp, Plus, Loader2, Download, FileSpreadsheet, FileText, FileIcon, FileJson } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DepartmentActionsProps {
  onImport: (file: File) => Promise<void>
  onExport: (format: string) => Promise<void>
  onNew: () => void
  isImporting: boolean
  isExporting: boolean
}

const DepartmentActions = ({ onImport, onExport, onNew, isImporting, isExporting }: DepartmentActionsProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      await onImport(file)
      // Reset input value to allow selecting the same file again
      if (event.target) {
        event.target.value = ""
      }
    }
  }

  const handleExport = async (format: string) => {
    setSelectedFormat(format)
    await onExport(format)
    setSelectedFormat(null)
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="w-full md:w-auto">
        <h2 className="font-medium text-lg text-gray-700 mb-3 flex items-center">
          <FileUp className="mr-2 text-gray-500" size={20} />
          Importar / Exportar
        </h2>
        <div className="flex items-center gap-2">
          <label
            htmlFor="csvFileInput"
            className={`bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg cursor-pointer flex items-center transition-all ${
              isImporting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <FileUp className="mr-2 h-4 w-4" />
                Importar CSV
              </>
            )}
          </label>
          <input
            id="csvFileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            disabled={isImporting}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium flex items-center justify-center transition-all"
          onClick={onNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Departamento
        </motion.button>

        <TooltipProvider>
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium flex items-center justify-center transition-all"
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exportando {selectedFormat && selectedFormat.toUpperCase()}...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </>
                )}
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <div className="grid gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => handleExport("excel")}
                    >
                      <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600" />
                      <span>Excel</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a Excel (.xlsx)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => handleExport("csv")}
                    >
                      <FileText className="mr-2 h-4 w-4 text-gray-600" />
                      <span>CSV</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a CSV (.csv)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => handleExport("pdf")}
                    >
                      <FileIcon className="mr-2 h-4 w-4 text-red-600" />
                      <span>PDF</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a PDF (.pdf)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => handleExport("sql")}
                    >
                      <FileJson className="mr-2 h-4 w-4 text-amber-600" />
                      <span>SQL</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar a SQL (.sql)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </PopoverContent>
          </Popover>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default DepartmentActions
