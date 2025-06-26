"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, FileText, Download, Eye, Edit, Trash2, Filter } from "lucide-react"

interface KaikaDocumentsProps {
  onBack: () => void
}

export default function KaikaDocuments({ onBack }: KaikaDocumentsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const documentTypes = [
    { value: "all", label: "Todos los documentos" },
    { value: "ot", label: "Órdenes de Trabajo" },
    { value: "mantenimiento", label: "Mantenimiento" },
    { value: "contrato", label: "Contratos" },
    { value: "reporte", label: "Reportes" },
    { value: "certificado", label: "Certificados" },
  ]

  const documents = [
    {
      id: "OT-2024-001",
      type: "ot",
      title: "Mantenimiento Preventivo - Autoclave Lab Central",
      client: "Hospital San José",
      equipment: "Autoclave Tuttnauer 3870EA",
      status: "En Proceso",
      priority: "Alta",
      created: "2024-01-15",
      technician: "Carlos Rodríguez",
    },
    {
      id: "OT-2024-002",
      type: "ot",
      title: "Reparación - Monitor de Signos Vitales",
      client: "Clínica del Norte",
      equipment: "Monitor Philips IntelliVue MP70",
      status: "Completado",
      priority: "Media",
      created: "2024-01-14",
      technician: "Ana García",
    },
    {
      id: "CT-2024-003",
      type: "contrato",
      title: "Contrato de Mantenimiento Anual",
      client: "Hospital Universitario",
      equipment: "Equipos de Quirófano",
      status: "Vigente",
      priority: "Media",
      created: "2024-01-10",
      technician: "Luis Martínez",
    },
    {
      id: "RP-2024-004",
      type: "reporte",
      title: "Reporte Mensual de Mantenimientos",
      client: "Administración",
      equipment: "Todos los equipos",
      status: "Generado",
      priority: "Baja",
      created: "2024-01-12",
      technician: "Sistema",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completado":
      case "vigente":
      case "generado":
        return "bg-green-100 text-green-800"
      case "en proceso":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "vencido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baja":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    return matchesSearch && matchesType
  })

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Crear Nueva Orden de Trabajo</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                  className="text-white hover:bg-blue-700"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital-san-jose">Hospital San José</SelectItem>
                        <SelectItem value="clinica-norte">Clínica del Norte</SelectItem>
                        <SelectItem value="hospital-universitario">Hospital Universitario</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar equipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="autoclave">Autoclave</SelectItem>
                        <SelectItem value="monitor">Monitor de Signos Vitales</SelectItem>
                        <SelectItem value="ventilador">Ventilador Mecánico</SelectItem>
                        <SelectItem value="rayos-x">Equipo de Rayos X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Servicio</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventivo">Mantenimiento Preventivo</SelectItem>
                        <SelectItem value="correctivo">Mantenimiento Correctivo</SelectItem>
                        <SelectItem value="calibracion">Calibración</SelectItem>
                        <SelectItem value="instalacion">Instalación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technician">Técnico Asignado</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar técnico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carlos">Carlos Rodríguez</SelectItem>
                        <SelectItem value="ana">Ana García</SelectItem>
                        <SelectItem value="luis">Luis Martínez</SelectItem>
                        <SelectItem value="maria">María López</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha Programada</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción del Trabajo</Label>
                  <Textarea placeholder="Describe detalladamente el trabajo a realizar..." className="min-h-[100px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations">Observaciones</Label>
                  <Textarea placeholder="Observaciones adicionales..." className="min-h-[80px]" />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Crear Orden de Trabajo
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={onBack} className="text-white hover:bg-blue-700 mb-2">
              ← Volver al Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">Gestión de Documentos</h1>
            <p className="text-blue-100">Órdenes de Trabajo y Documentos del Sistema</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="bg-white text-blue-600 hover:bg-blue-50">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Orden de Trabajo
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por título, cliente o equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avanzados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos ({filteredDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={doc.title}>
                          {doc.title}
                        </div>
                      </TableCell>
                      <TableCell>{doc.client}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={doc.equipment}>
                          {doc.equipment}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(doc.priority)}>{doc.priority}</Badge>
                      </TableCell>
                      <TableCell>{doc.technician}</TableCell>
                      <TableCell>{doc.created}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
