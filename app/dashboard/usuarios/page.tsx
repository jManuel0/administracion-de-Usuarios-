"use client"

import { useState } from "react"
import { usuarios as datosIniciales } from "@/lib/datos"
import { Usuario } from "@/types/usuario"
import TablaUsuarios from "@/components/usuarios/tabla-usuarios"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(datosIniciales)
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState<Usuario | null>(null)
  const [abrirFormulario, setAbrirFormulario] = useState(false)

  const handleEliminar = (usuario: Usuario) => {
    setUsuarioEliminar(usuario)
  }

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario)
    setAbrirFormulario(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Usuarios</h1>
          <p className="text-muted-foreground text-sm">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Button onClick={() => { setUsuarioEditar(null); setAbrirFormulario(true) }}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo usuario
        </Button>
      </div>

      <TablaUsuarios
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  )
}