"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Save, PenTool, X, Files, Trash2, Download, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

interface KaikaReportFormProps {
  onBack: () => void
}

// Mock SignatureCapture component
const SignatureCapture = ({
  onSignatureSave,
  currentSignature,
}: { onSignatureSave: (signature: string) => void; currentSignature: string }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500 mb-2">Signature capture area</p>
      <Button onClick={() => onSignatureSave("data:image/png;base64,mock-signature")} size="sm">
        Mock Signature
      </Button>
      {currentSignature && (
        <Button onClick={() => onSignatureSave("")} size="sm" variant="outline" className="ml-2">
          Clear
        </Button>
      )}
    </div>
  )
}

// Mock PdfReportContent component
const PdfReportContent = ({
  formData,
  signature,
  tecnicosAsignados,
  actividadesSeleccionadas,
  actividadesList,
  pdfExportOptions,
}: any) => {
  return <div>PDF Report Content</div>
}

// Mock usePDFExport hook
const usePDFExport = () => {
  return {
    exportToPDF: async (sections: string[], filename: string, data: any) => {
      console.log("Exporting PDF:", { sections, filename, data })
      toast.success("PDF export simulated")
      return true
    },
  }
}

export default function KaikaReportForm({ onBack }: KaikaReportFormProps) {
  const [formData, setFormData] = useState({
    // Existing fields
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    trabajos: "",
    compromisos: "",
    recomendaciones: "",
    recordarCompromiso: false,
    recordarRecomendaciones: false,
    tecnicoSeleccionado: "",
    mostrarGrupo: false,
    listaChequeo: "",
    personaEncuestada: "",
    tipoEvaluacion: "",
    mostrarTodo: false,
    seleccionarTodo: false,
    // New fields for client and equipment details
    clienteNombre: "",
    clienteTelefono: "",
    clienteEmail: "",
    equipoNombre: "",
    equipoModelo: "",
    equipoMarca: "",
    equipoSerial: "",
    equipoNoInv: "",
    equipoUbicacion: "",
    ordenClienteNo: "",
    encargado: "",
    reportnum: "",
    // New fields for service types (checkboxes)
    serviceTypes: {
      garantia: false,
      contrato: false,
      mantenimientoC: false,
      instalacion: false,
      desinstalacion: false,
      acompanamiento: false,
      diagnostico: false,
      capacitacion: false,
      calificacion: false,
    },
  })

  const [signature, setSignature] = useState<string>("")
  const { exportToPDF } = usePDFExport()

  const [tecnicos] = useState([
    { id: "1", nombre: "Daniel Sanchez", usuario: "Superadministrador" },
    { id: "2", nombre: "OLGA BARRERA", usuario: "admin" },
    { id: "5", nombre: "JAIDER ENRIQUE GUTIERREZ", usuario: "JAIDER GUTIERREZ" },
    { id: "7", nombre: "CARLOS ANDRES SIERRA", usuario: "CARLOS SIERRA" },
    { id: "8", nombre: "MICHELL NIÑO", usuario: "MICHELL NINO" },
    { id: "19", nombre: "JOSE ALBEIRO GUZMÁN", usuario: "JOSE GUZMAN" },
  ])

  const [tecnicosAsignados, setTecnicosAsignados] = useState([{ id: "19", nombre: "JOSE ALBEIRO GUZMÁN" }])

  const [actividades] = useState([
    {
      id: "1",
      nombre: "Verificación visual de estado físico. (Plafones y tornillos)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "2",
      nombre: "Limpieza interna del equipo (Remoción de polvo y suciedad).",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "3", nombre: "Mecánica", categoria: "CATEGORIA", seleccionada: false },
    { id: "4", nombre: "Limpiar la/s junta/s de la/s puerta/s", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "5",
      nombre: "Comprobar funcionamiento de las electroválvulas de entrada de agua. Desmontar y limpiar los filtros.",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "6",
      nombre: "Comprobar el funcionamiento de las boyas de nivel de los depósito/s de agua",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "7",
      nombre: "Comprobar el funcionamiento del termostato depósito de agua",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "8",
      nombre: "Cambiar el filtro de entrada aire estéril a la cámara (ANUALMENTE)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "9",
      nombre: "Comprobar funcionamiento de las válvulas de retención",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "10",
      nombre: "Verificar los purgadores termodinámicos| desmontar y limpiar (ANUALMENTE)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "11",
      nombre: "Verificar las electroválvulas del bloque neumático",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "12",
      nombre: "Verificar las electroválvulas del circuito hidráulico (series sin hidroneumáticas)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "13",
      nombre: "Comprobar funcionamiento de las válvulas hidroneumáticas",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "14",
      nombre: "Engrasar los regles de deslizamiento de la puerta",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "15",
      nombre: "Revisar y reparar posibles fugas de vapor| aire| agua| etc.",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "16",
      nombre: "Revisar y ajustar mariposas de acoples tipo clamp.",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "17",
      nombre: "Comprobar la dureza del agua entrada refrigeración ºF.............",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "18", nombre: "Generador de vapor", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "19",
      nombre: "Desmontar la tapa| limpiar las incrustaciones del sistema y cambio junta tapa (ANUALMENTE)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "20", nombre: "Drenaje completo.", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "21",
      nombre: "Verificar el funcionamiento del sistema de nivel| presostatos de control y manómetro.",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "22", nombre: "Compresor", categoria: "CATEGORIA", seleccionada: false },
    { id: "23", nombre: "Drenaje completo.", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "24",
      nombre: "Verificar el funcionamiento de: presostatos de control| alarma y manómetro.",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "25",
      nombre: "Comprobar el consumo Motor de la bomba de agua del generador",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "26", nombre: "Comprobar el consumo Elementos calefactores", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "27",
      nombre: "Comprobar el consumo Motor de la bomba de vacío",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "28", nombre: "Puertas y seguridades", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "29",
      nombre:
        "Verificar el funcionamiento de los seguros de bloqueo de la/s puerta/s y lubricar las partes mecánicas (No engrasar ni desmontar los pistones)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "30",
      nombre: 'Comprobar el funcionamiento correcto del paro de emergencia de la/s puerta/s "MANDO SETA".',
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "31",
      nombre: "Revisar el funcionamiento de los dispositivos de seguro de desplazamiento de la/s puerta/s",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    {
      id: "32",
      nombre:
        "Comprobar las válvulas de seguridad de cámara| recámara y generador| sometiéndolas a una prueba de presión| comprobando que disparan a la presión de timbre. (ANUALMENTE)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "33", nombre: "Ajustes y comprobaciones", categoria: "CATEGORIA", seleccionada: false },
    {
      id: "34",
      nombre:
        "Verificar el funcionamiento de los instrumentos de regulación y control y ajustar si fuera necesario: Temperatura cámara| Temperatura registro| Presión de cámara (ANUALMENTE)",
      categoria: "CATEGORIA",
      seleccionada: false,
    },
    { id: "35", nombre: "Pruebas de funcionamiento.", categoria: "CATEGORIA", seleccionada: false },
    { id: "36", nombre: "Realizar un test de vacío", categoria: "CATEGORIA", seleccionada: false },
    { id: "37", nombre: "Realizar un ciclo de Bowie & Dick", categoria: "CATEGORIA", seleccionada: false },
  ])

  const [actividadesSeleccionadas, setActividadesSeleccionadas] = useState<string[]>([])

  // Nuevo estado para las opciones de exportación de PDF
  const [pdfExportOptions, setPdfExportOptions] = useState({
    includeFullReport: true, // Nueva opción para incluir todo el reporte
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleServiceTypeChange = (type: keyof typeof formData.serviceTypes, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      serviceTypes: {
        ...prev.serviceTypes,
        [type]: checked,
      },
    }))
  }

  const handleAgregarTecnico = () => {
    if (formData.tecnicoSeleccionado) {
      const tecnico = tecnicos.find((t) => t.id === formData.tecnicoSeleccionado)
      if (tecnico && !tecnicosAsignados.find((t) => t.id === tecnico.id)) {
        setTecnicosAsignados((prev) => [...prev, tecnico])
        setFormData((prev) => ({ ...prev, tecnicoSeleccionado: "" }))
        toast.success("Técnico agregado correctamente")
      }
    }
  }

  const handleEliminarTecnico = (id: string) => {
    setTecnicosAsignados((prev) => prev.filter((t) => t.id !== id))
    toast.success("Técnico eliminado")
  }

  const handleActividadChange = (actividadId: string, checked: boolean) => {
    if (checked) {
      // Prevenir duplicados al añadir
      setActividadesSeleccionadas((prev) => (prev.includes(actividadId) ? prev : [...prev, actividadId]))
    } else {
      setActividadesSeleccionadas((prev) => prev.filter((id) => id !== actividadId))
    }
  }

  const handleSeleccionarTodo = () => {
    if (formData.seleccionarTodo) {
      // Asegurarse de que solo se añaden IDs únicos
      setActividadesSeleccionadas(Array.from(new Set(actividades.map((a) => a.id))))
    } else {
      setActividadesSeleccionadas([])
    }
  }

  const handleSignatureSave = (signatureData: string) => {
    setSignature(signatureData)
    if (signatureData) {
      toast.success("Firma capturada correctamente")
    } else {
      toast.info("Firma borrada")
    }
  }

  const handleExportPDF = async () => {
    const sectionsToExport: string[] = []
    if (pdfExportOptions.includeFullReport) {
      sectionsToExport.push("pdf-full-report-content") // ID del nuevo contenedor principal
    }

    const actividadesList = actividades

    // Añadir un pequeño retraso para asegurar que el DOM esté completamente renderizado
    setTimeout(async () => {
      const success = await exportToPDF(sectionsToExport, "Reporte_Servicio_11-8661", {
        ...formData,
        signature,
        tecnicosAsignados,
        actividadesSeleccionadas,
        actividadesList,
      })

      if (success) {
        toast.success("PDF exportado correctamente")
      } else {
        toast.error("Error al exportar PDF")
      }
    }, 50) // Retraso de 50ms
  }

  const handleGuardar = () => {
    toast.success("Reporte guardado correctamente")
  }

  const handleGuardarYFirmar = () => {
    if (!signature) {
      toast.error("Por favor capture la firma antes de continuar")
      return
    }
    toast.success("Reporte guardado y firmado correctamente")
  }

  const handleCancelar = () => {
    if (confirm("Se perderán los cambios, ¿desea continuar?")) {
      toast.info("Cambios cancelados")
      onBack() // Go back to dashboard
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={onBack} className="text-white hover:bg-blue-700 mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">Reporte de Servicio</h1>
            <p className="text-blue-100">Gestión de la Orden de Trabajo 11-8661</p>
          </div>
          <Button onClick={handleExportPDF} className="bg-white text-blue-600 hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* Report Content for PDF Export (Visible Form) */}
        <div id="report-content-visible">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-yellow-50 border border-yellow-200 rounded-t-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-black">
                      <a href="#" className="text-blue-600 hover:underline">
                        11-8661
                      </a>
                    </h1>
                    <p className="text-sm text-black">REPORTE DE MANTENIMIENTO</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Columnas radio buttons are not functional for PDF export, kept for UI */}
                  <div>
                    <Label className="text-black font-medium">Columnas</Label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="columnas" value="1" defaultChecked />
                        <span className="text-black">1</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="columnas" value="2" />
                        <span className="text-black">2</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Main layout for top section: Client and Equipment Inputs (80%), Service Types on right (20%) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left Column: Client and Equipment Inputs (80%) */}
                <div className="md:col-span-4 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black text-base">Detalles del Cliente y Equipo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label className="text-black text-xs w-20 shrink-0">CLIENTE</Label>
                        <Input
                          value={formData.clienteNombre}
                          onChange={(e) => handleInputChange("clienteNombre", e.target.value)}
                          className="h-7 text-xs flex-1 text-black"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">TELEFONO</Label>
                          <Input
                            value={formData.clienteTelefono}
                            onChange={(e) => handleInputChange("clienteTelefono", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">E-MAIL</Label>
                          <Input
                            type="email"
                            value={formData.clienteEmail}
                            onChange={(e) => handleInputChange("clienteEmail", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">EQUIPO</Label>
                          <Input
                            value={formData.equipoNombre}
                            onChange={(e) => handleInputChange("equipoNombre", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">MODELO</Label>
                          <Input
                            value={formData.equipoModelo}
                            onChange={(e) => handleInputChange("equipoModelo", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">MARCA</Label>
                          <Input
                            value={formData.equipoMarca}
                            onChange={(e) => handleInputChange("equipoMarca", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">SERIAL</Label>
                          <Input
                            value={formData.equipoSerial}
                            onChange={(e) => handleInputChange("equipoSerial", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">No. INV</Label>
                          <Input
                            value={formData.equipoNoInv}
                            onChange={(e) => handleInputChange("equipoNoInv", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">UBICACION</Label>
                          <Input
                            value={formData.equipoUbicacion}
                            onChange={(e) => handleInputChange("equipoUbicacion", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-black text-xs w-20 shrink-0">ORDEN DE CLIENTE No.</Label>
                          <Input
                            value={formData.ordenClienteNo}
                            onChange={(e) => handleInputChange("ordenClienteNo", e.target.value)}
                            className="h-7 text-xs flex-1 text-black"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-black text-xs w-20 shrink-0">ENCARGADO</Label>
                        <Input
                          value={formData.encargado}
                          onChange={(e) => handleInputChange("encargado", e.target.value)}
                          placeholder="Nombre de la persona encuestada"
                          className="text-black"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Right Column: Service Type Checkboxes (20%) */}
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black text-base">Tipo de Servicio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="garantia"
                          checked={formData.serviceTypes.garantia}
                          onCheckedChange={(checked) => handleServiceTypeChange("garantia", checked as boolean)}
                        />
                        <Label htmlFor="garantia" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          1. GARANTIA
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="contrato"
                          checked={formData.serviceTypes.contrato}
                          onCheckedChange={(checked) => handleServiceTypeChange("contrato", checked as boolean)}
                        />
                        <Label htmlFor="contrato" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          2. CONTRATO
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mantenimientoC"
                          checked={formData.serviceTypes.mantenimientoC}
                          onCheckedChange={(checked) => handleServiceTypeChange("mantenimientoC", checked as boolean)}
                        />
                        <Label htmlFor="mantenimientoC" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          3. MANTENIMIENTO C
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="instalacion"
                          checked={formData.serviceTypes.instalacion}
                          onCheckedChange={(checked) => handleServiceTypeChange("instalacion", checked as boolean)}
                        />
                        <Label htmlFor="instalacion" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          4. INSTALACION
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="desinstalacion"
                          checked={formData.serviceTypes.desinstalacion}
                          onCheckedChange={(checked) => handleServiceTypeChange("desinstalacion", checked as boolean)}
                        />
                        <Label htmlFor="desinstalacion" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          5. DESINSTALACION
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acompanamiento"
                          checked={formData.serviceTypes.acompanamiento}
                          onCheckedChange={(checked) => handleServiceTypeChange("acompanamiento", checked as boolean)}
                        />
                        <Label htmlFor="acompanamiento" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          6. ACOMPAÑAMIENTO
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="diagnostico"
                          checked={formData.serviceTypes.diagnostico}
                          onCheckedChange={(checked) => handleServiceTypeChange("diagnostico", checked as boolean)}
                        />
                        <Label htmlFor="diagnostico" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          7. DIAGNOSTICO
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="capacitacion"
                          checked={formData.serviceTypes.capacitacion}
                          onCheckedChange={(checked) => handleServiceTypeChange("capacitacion", checked as boolean)}
                        />
                        <Label htmlFor="capacitacion" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          8. CAPACITACION
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="calificacion"
                          checked={formData.serviceTypes.calificacion}
                          onCheckedChange={(checked) => handleServiceTypeChange("calificacion", checked as boolean)}
                        />
                        <Label htmlFor="calificacion" className="text-[10px] text-black">
                          {" "}
                          {/* Changed to text-[10px] */}
                          9. CALIFICACION
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Remaining sections, spanning full width below the top grid */}
              <div className="space-y-6">
                {/* Información Básica */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Información Básica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-black">Inicio</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={formData.fechaInicio}
                            onChange={(e) => handleInputChange("fechaInicio", e.target.value)}
                            className="flex-1 text-black"
                          />
                          <Input
                            type="time"
                            value={formData.horaInicio}
                            onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                            className="w-32 text-black"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-black">Fin</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={formData.fechaFin}
                            onChange={(e) => handleInputChange("fechaFin", e.target.value)}
                            className="flex-1 text-black"
                          />
                          <Input
                            type="time"
                            value={formData.horaFin}
                            onChange={(e) => handleInputChange("horaFin", e.target.value)}
                            className="w-32 text-black"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-black">Trabajos</Label>
                      <Textarea
                        value={formData.trabajos}
                        onChange={(e) => handleInputChange("trabajos", e.target.value)}
                        placeholder="Describa los trabajos realizados..."
                        className="min-h-[100px] text-black"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-black">Compromisos</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recordarCompromiso"
                            checked={formData.recordarCompromiso}
                            onCheckedChange={(checked) => handleInputChange("recordarCompromiso", checked)}
                          />
                          <Label htmlFor="recordarCompromiso" className="text-black">
                            Recordar
                          </Label>
                        </div>
                      </div>
                      <Textarea
                        value={formData.compromisos}
                        onChange={(e) => handleInputChange("compromisos", e.target.value)}
                        placeholder="Describa los compromisos..."
                        className="min-h-[100px] text-black"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-black">Recomendaciones</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recordarRecomendaciones"
                            checked={formData.recordarRecomendaciones}
                            onCheckedChange={(checked) => handleInputChange("recordarRecomendaciones", checked)}
                          />
                          <Label htmlFor="recordarRecomendaciones" className="text-black">
                            Recordar
                          </Label>
                        </div>
                      </div>
                      <Textarea
                        value={formData.recomendaciones}
                        onChange={(e) => handleInputChange("recomendaciones", e.target.value)}
                        placeholder="Describa las recomendaciones..."
                        className="min-h-[100px] text-black"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Técnicos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Técnico</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-black">Técnico</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mostrarGrupo"
                            checked={formData.mostrarGrupo}
                            onCheckedChange={(checked) => handleInputChange("mostrarGrupo", checked)}
                          />
                          <Label htmlFor="mostrarGrupo" className="text-black">
                            Mostrar técnicos del mismo grupo
                          </Label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={formData.tecnicoSeleccionado}
                          onValueChange={(value) => handleInputChange("tecnicoSeleccionado", value)}
                        >
                          <SelectTrigger className="flex-1 text-black">
                            <SelectValue placeholder="Seleccione un técnico" />
                          </SelectTrigger>
                          <SelectContent>
                            {tecnicos.map((tecnico) => (
                              <SelectItem key={tecnico.id} value={tecnico.id}>
                                {tecnico.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAgregarTecnico} disabled={!formData.tecnicoSeleccionado}>
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {tecnicosAsignados.length > 0 && (
                      <div>
                        <Label className="text-black mb-2 block">Técnicos Asignados</Label>
                        <div className="space-y-2">
                          {tecnicosAsignados.map((tecnico) => (
                            <div
                              key={tecnico.id}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <span className="text-black font-medium">{tecnico.nombre}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEliminarTecnico(tecnico.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Listas de Chequeo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Listas de chequeo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label className="text-black">Listas de chequeo</Label>
                      <Select
                        value={formData.listaChequeo}
                        onValueChange={(value) => handleInputChange("listaChequeo", value)}
                      >
                        <SelectTrigger className="text-black">
                          <SelectValue placeholder="Seleccione una lista" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">DATOS DEL SERVICIO</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-yellow-600 text-sm mt-2">
                        Esta lista de chequeo ya fue registrada para esta orden de trabajo
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tiempos y Actividades */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Tiempos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-black">Actividad</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mostrarTodo"
                              checked={formData.mostrarTodo}
                              onCheckedChange={(checked) => handleInputChange("mostrarTodo", checked)}
                            />
                            <Label htmlFor="mostrarTodo" className="text-black">
                              Mostrar Todo
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="seleccionarTodo"
                              checked={formData.seleccionarTodo}
                              onCheckedChange={(checked) => {
                                handleInputChange("seleccionarTodo", checked)
                                handleSeleccionarTodo()
                              }}
                            />
                            <Label htmlFor="seleccionarTodo" className="text-black">
                              Seleccionar Todo
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-80 overflow-y-auto border rounded-lg p-4">
                        <div className="font-bold text-black text-sm mb-2">CATEGORIA</div>
                        {actividades.map((actividad) => (
                          <div key={actividad.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={`actividad-${actividad.id}`}
                              checked={actividadesSeleccionadas.includes(actividad.id)}
                              onCheckedChange={(checked) => handleActividadChange(actividad.id, checked as boolean)}
                            />
                            <Label htmlFor={`actividad-${actividad.id}`} className="text-sm leading-tight text-black">
                              {actividad.nombre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Evaluación */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Evaluación</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-black">Persona Encuestada</Label>
                      <Input
                        value={formData.personaEncuestada}
                        onChange={(e) => handleInputChange("personaEncuestada", e.target.value)}
                        placeholder="Nombre de la persona encuestada"
                        className="text-black"
                      />
                    </div>
                    <div>
                      <Label className="text-black">Encuesta</Label>
                      <Select
                        value={formData.tipoEvaluacion}
                        onValueChange={(value) => handleInputChange("tipoEvaluacion", value)}
                      >
                        <SelectTrigger className="text-black">
                          <SelectValue placeholder="Seleccione una encuesta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Evaluación Del Servicio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Firma */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-black">Firma del Técnico</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div>
                        <p className="text-sm text-black mb-2">Capture la firma del técnico responsable del servicio</p>
                        <SignatureCapture onSignatureSave={handleSignatureSave} currentSignature={signature} />
                      </div>
                      {signature && (
                        <div className="ml-0 md:ml-4 mt-4 md:mt-0">
                          <p className="text-sm text-green-600 mb-2">Firma capturada</p>
                          <img
                            src={signature || "/placeholder.svg"}
                            alt="Firma capturada"
                            className="border border-gray-300 rounded max-w-[200px] max-h-[80px]"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Opciones de Exportación PDF */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl mt-6">
          <CardHeader>
            <CardTitle className="text-black">Opciones de Exportación PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeFullReport"
                checked={pdfExportOptions.includeFullReport}
                onCheckedChange={(checked) =>
                  setPdfExportOptions((prev) => ({ ...prev, includeFullReport: checked as boolean }))
                }
              />
              <Label htmlFor="includeFullReport" className="text-black">
                Incluir Reporte Completo
              </Label>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => {}} variant="outline" size="lg" className="flex items-center gap-2">
            <Files className="w-5 h-5" />
            Archivos
          </Button>
          <Button onClick={handleGuardar} size="lg" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Save className="w-5 h-5" />
            Guardar
          </Button>
          <Button
            onClick={handleGuardarYFirmar}
            size="lg"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <PenTool className="w-5 h-5" />
            Guardar y firmar
          </Button>
          <Button onClick={handleCancelar} variant="destructive" size="lg" className="flex items-center gap-2">
            <X className="w-5 h-5" />
            Cancelar
          </Button>
        </div>
      </div>

      {/* Div oculto para la exportación de PDF */}
      <div id="pdf-full-report-content" style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <PdfReportContent
          formData={formData}
          signature={signature || ""}
          tecnicosAsignados={tecnicosAsignados}
          actividadesSeleccionadas={actividadesSeleccionadas}
          actividadesList={actividades}
          pdfExportOptions={pdfExportOptions}
        />
      </div>
    </div>
  )
}
