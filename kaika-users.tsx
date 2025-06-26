"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, User, Eye, Edit, Trash2 } from "lucide-react"

interface KaikaUsersProps {
  onBack: () => void
}

export default function KaikaUsers({ onBack }: KaikaUsersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const userRoles = [
    { value: "all", label: "Todos los Roles" },
    { value: "administrador", label: "Administrador" },
    { value: "tecnico", label: "Técnico" },
    { value: "cliente", label: "Cliente" },
    { value: "supervisor", label: "Supervisor" },
  ]

  const users = [
    {
      id: "USR-001",
      name: "Carlos Rodríguez",
      email: "carlos.r@kaika.com",
      role: "Técnico",
      status: "Activo",
      lastLogin: "2024-01-20",
      phone: "+57 310 123 4567",
    },
    {
      id: "USR-002",
      name: "Ana García",
      email: "ana.g@kaika.com",
      role: "Técnico",
      status: "Activo",
      lastLogin: "2024-01-19",
      phone: "+57 311 987 6543",
    },
    {
      id: "USR-003",
      name: "Luis Martínez",
      email: "luis.m@kaika.com",
      role: "Administrador",
      status: "Activo",
      lastLogin: "2024-01-20",
      phone: "+57 300 555 1234",
    },
    {
      id: "USR-004",
      name: "María López",
      email: "maria.l@hospital.com",
      role: "Cliente",
      status: "Inactivo",
      lastLogin: "2023-12-01",
      phone: "+57 320 111 2233",
    },
    {
      id: "USR-005",
      name: "Pedro Sánchez",
      email: "pedro.s@kaika.com",
      role: "Supervisor",
      status: "Activo",
      lastLogin: "2024-01-18",
      phone: "+57 315 444 5566",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "activo":
        return "bg-green-100 text-green-800"
      case "inactivo":
        return "bg-red-100 text-red-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole
    return matchesSearch && matchesRole
  })

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Crear Nuevo Usuario</CardTitle>
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
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="Ej: juan.perez@dominio.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="Ej: +57 3XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrador">Administrador</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="Mínimo 8 caracteres" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <Input id="confirm-password" type="password" placeholder="Repita la contraseña" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Crear Usuario
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
            <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
            <p className="text-blue-100">Administración de usuarios del sistema SAMMS</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="bg-white text-blue-600 hover:bg-blue-50">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
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
                    placeholder="Buscar por nombre, email o rol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Usuarios ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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
