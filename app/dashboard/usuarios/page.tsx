"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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
  const router = useRouter()

  const [usuarios, setUsuarios] = useState<Usuario[]>(datosIniciales)
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState<Usuario | null>(null)
  const [abrirFormulario, setAbrirFormulario] = useState(false)
  const [tablaKey, setTablaKey] = useState(0)
  const [edicionDesdeDetalle, setEdicionDesdeDetalle] = useState<{
    id: string
    returnTo: string | null
  } | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const editId = params.get("edit")
    if (!editId) return

    setEdicionDesdeDetalle({
      id: editId,
      returnTo: params.get("returnTo"),
    })
  }, [])

  useEffect(() => {
    if (!edicionDesdeDetalle) return

    const usuario = usuarios.find((u) => u.id === edicionDesdeDetalle.id) ?? null
    if (!usuario) {
      toast.error("Usuario no encontrado.")
      router.replace("/dashboard/usuarios")
      setEdicionDesdeDetalle(null)
      return
    }

    setUsuarioEditar(usuario)
    setAbrirFormulario(true)
  }, [edicionDesdeDetalle, router, usuarios])

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

    toast.success(existe ? "Usuario actualizado." : "Usuario creado.")

    if (edicionDesdeDetalle?.returnTo) {
      router.push(edicionDesdeDetalle.returnTo)
      setEdicionDesdeDetalle(null)
    } else if (edicionDesdeDetalle) {
      router.replace("/dashboard/usuarios")
      setEdicionDesdeDetalle(null)
    }
  }

  const confirmarEliminar = () => {
    if (!usuarioEliminar) return
    setUsuarios((prev) => prev.filter((u) => u.id !== usuarioEliminar.id))
    toast.success("Usuario eliminado.")
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
        onOpenChange={(open) => {
          setAbrirFormulario(open)
          if (!open) {
            setUsuarioEditar(null)
            if (edicionDesdeDetalle) {
              router.replace("/dashboard/usuarios")
              setEdicionDesdeDetalle(null)
            }
          }
        }}
        usuario={usuarioEditar}
        usuarios={usuarios}
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
