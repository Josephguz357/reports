"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import KaikaDashboard from "./kaika-dashboard"

export default function Component() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberPassword, setRememberPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return <KaikaDashboard onLogout={() => setIsLoggedIn(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b">
            <div className="flex items-center justify-between">
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
              <div className="text-right">
                <h1 className="text-2xl font-bold text-blue-800">KAIKA</h1>
                <p className="text-xs text-gray-600">Desde 1957</p>
                <p className="text-xs text-gray-600">Equipos Médicos - Quirúrgicos,</p>
                <p className="text-xs text-gray-600">Odontológicos, de Laboratorio e Industria</p>
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 min-h-[400px]">
              {/* Left Section - New Users */}
              <div className="bg-blue-100/50 p-6 border-r">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-800 bg-blue-200 py-2 px-4 rounded">NUEVOS USUARIOS</h2>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>SAMMS</strong> es el Sistema Especializado de Gestión y Administración de Mantenimiento,
                    Contratos y Servicios de todos los equipos y externos de su empresa con un solo lugar centralizado
                    para su operación de servicio.
                  </p>
                  <p>
                    <strong>SAMMS</strong> es un producto desarrollado bajo la disponibilidad de su información, en todo
                    momento y lugar bajo el soporte Colombia.
                  </p>
                </div>
              </div>

              {/* Right Section - User Access */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-blue-800 bg-blue-200 py-2 px-4 rounded">
                    ACCESO A USUARIOS
                  </h2>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                      Login Usuario:
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Contraseña:
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-600">KAIKA 4.7.5</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberPassword}
                      onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-700">
                      Recordar Contraseña
                    </Label>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    onClick={() => {
                      if (username.trim() && password.trim()) {
                        setIsLoggedIn(true)
                      } else {
                        alert("Por favor ingrese usuario y contraseña")
                      }
                    }}
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <div className="bg-gray-100 px-6 py-3 text-center text-xs text-gray-600 border-t">
            <p>
              copyright © Isde soluciones 2017{" "}
              <a href="#" className="text-blue-600 hover:underline">
                www.isdesoluciones.com
              </a>
            </p>
            <p>Ver: 4.7.5.0 (3.3.2.4.5)</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
