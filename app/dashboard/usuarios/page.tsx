"use client"

import { useState } from "react"
import { usuarios as datosIniciales } from "@/lib/datos"
import { Usuario } from "@/types/usuario"
import TablaUsuarios from "@/components/usuarios/tabla-usuarios"
import FormUsuarioDialog from "@/components/usuarios/form-usuario-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(datosIniciales)
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState<Usuario | null>(null)
  const [abrirFormulario, setAbrirFormulario] = useState(false)
  const [tablaKey, setTablaKey] = useState(0)

  const handleEliminar = (usuario: Usuario) => {
    setUsuarioEliminar(usuario)
  }

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario)
    setAbrirFormulario(true)
  }

  const handleGuardar = (usuario: Usuario) => {
    const existe = usuarios.some((u) => u.id === usuario.id)
    setUsuarios((prev) => {
      if (existe) return prev.map((u) => (u.id === usuario.id ? usuario : u))
      return [usuario, ...prev]
    })

    if (!existe) setTablaKey((k) => k + 1)
  }

  const confirmarEliminar = () => {
    if (!usuarioEliminar) return
    setUsuarios((prev) => prev.filter((u) => u.id !== usuarioEliminar.id))
    setUsuarioEliminar(null)
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
        <Button
          onClick={() => {
            setUsuarioEditar(null)
            setAbrirFormulario(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo usuario
        </Button>
      </div>

      <TablaUsuarios
        key={tablaKey}
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <FormUsuarioDialog
        open={abrirFormulario}
        onOpenChange={setAbrirFormulario}
        usuario={usuarioEditar}
        onGuardar={handleGuardar}
      />

      <AlertDialog
        open={Boolean(usuarioEliminar)}
        onOpenChange={(open) => {
          if (!open) setUsuarioEliminar(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
            <AlertDialogDescription>
              {usuarioEliminar
                ? `Se eliminará a ${usuarioEliminar.nombre} ${usuarioEliminar.apellido}.`
                : "Se eliminará este usuario."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmarEliminar}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
