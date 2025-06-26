"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Settings, FileText, Calendar, BarChart3, Bell, LogOut, Menu, X } from "lucide-react"
import KaikaDocuments from "./kaika-documents"
import KaikaUsers from "./kaika-users"
import KaikaReportForm from "./kaika-report-form" // Updated import

interface KaikaDashboardProps {
  onLogout: () => void
}

export default function KaikaDashboard({ onLogout }: KaikaDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false) // Updated state name

  const menuItems = [
    { icon: Home, label: "Inicio", active: true, action: "home" },
    { icon: Users, label: "Usuarios", count: 12, action: "users" },
    { icon: FileText, label: "Documentos", count: 45, action: "documents" },
    { icon: Calendar, label: "Mantenimiento", count: 8, action: "maintenance" }, // Action for the new form
    { icon: BarChart3, label: "Reportes", action: "reports" },
    { icon: Settings, label: "Configuración", action: "settings" },
  ]

  const handleMenuItemClick = (action: string) => {
    setShowDocuments(false)
    setShowUsers(false)
    setShowReportForm(false) // Reset all other module states
    switch (action) {
      case "documents":
        setShowDocuments(true)
        break
      case "users":
        setShowUsers(true)
        break
      case "maintenance": // Handle click for Maintenance to show the new form
        setShowReportForm(true)
        break
      default:
        // For 'home' or other non-module specific clicks, stay on dashboard
        break
    }
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  if (showDocuments) {
    return <KaikaDocuments onBack={() => setShowDocuments(false)} />
  }

  if (showUsers) {
    return <KaikaUsers onBack={() => setShowUsers(false)} />
  }

  if (showReportForm) {
    return <KaikaReportForm onBack={() => setShowReportForm(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">👨‍⚕️</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">⚡</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs">📋</span>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs">⚙️</span>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-blue-800">KAIKA</h1>
                <p className="text-xs text-gray-600">Sistema de Gestión SAMMS</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm shadow-xl transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 pt-20 md:pt-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    item.active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => handleMenuItemClick(item.action)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                  {item.count && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Panel de Control</h2>
              <p className="text-blue-100">Bienvenido al Sistema SAMMS - Gestión de Equipos Médicos</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Equipos Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <p className="text-xs text-green-600">+12% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Mantenimientos Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <p className="text-xs text-red-600">Requieren atención</p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Contratos Vigentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <p className="text-xs text-gray-600">Próximos a vencer: 5</p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Técnicos Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <p className="text-xs text-green-600">En servicio: 8</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Mantenimiento completado</p>
                        <p className="text-xs text-gray-600">Equipo de rayos X - Sala 3</p>
                      </div>
                      <span className="text-xs text-gray-500">Hace 2h</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Alerta de mantenimiento</p>
                        <p className="text-xs text-gray-600">Ventilador mecánico - UCI</p>
                      </div>
                      <span className="text-xs text-gray-500">Hace 4h</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nuevo contrato registrado</p>
                        <p className="text-xs text-gray-600">Hospital San José</p>
                      </div>
                      <span className="text-xs text-gray-500">Ayer</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">Próximos Mantenimientos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                      <div>
                        <p className="text-sm font-medium">Autoclave - Lab Central</p>
                        <p className="text-xs text-gray-600">Mantenimiento preventivo</p>
                      </div>
                      <Badge variant="destructive">Hoy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                      <div>
                        <p className="text-sm font-medium">Monitor de signos vitales</p>
                        <p className="text-xs text-gray-600">Calibración anual</p>
                      </div>
                      <Badge variant="secondary">Mañana</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <div>
                        <p className="text-sm font-medium">Equipo de anestesia</p>
                        <p className="text-xs text-gray-600">Revisión trimestral</p>
                      </div>
                      <Badge variant="outline">15 Ene</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
