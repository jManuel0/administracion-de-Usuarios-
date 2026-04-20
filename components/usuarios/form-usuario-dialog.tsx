"use client"

import { useEffect, useMemo, useState } from "react"
import { Usuario } from "@/types/usuario"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function generarId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return String(Date.now())
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function FormUsuarioDialog({
  open,
  onOpenChange,
  usuario,
  usuarios,
  onGuardar,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  usuario: Usuario | null
  usuarios: Usuario[]
  onGuardar: (usuario: Usuario) => void
}) {
  const modoEdicion = Boolean(usuario)

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [rol, setRol] = useState<Usuario["rol"]>("visor")
  const [estado, setEstado] = useState<Usuario["estado"]>("activo")

  useEffect(() => {
    if (!open) return

    setNombre(usuario?.nombre ?? "")
    setApellido(usuario?.apellido ?? "")
    setEmail(usuario?.email ?? "")
    setRol(usuario?.rol ?? "visor")
    setEstado(usuario?.estado ?? "activo")
  }, [open, usuario])

  const emailValido = useMemo(() => {
    if (!email.trim()) return false
    return /^\S+@\S+\.\S+$/.test(email.trim())
  }, [email])

  const emailDuplicado = useMemo(() => {
    const emailNormalizado = email.trim().toLowerCase()
    if (!emailNormalizado) return false

    return usuarios.some(
      (u) =>
        u.id !== (usuario?.id ?? "") &&
        u.email.trim().toLowerCase() === emailNormalizado
    )
  }, [email, usuarios, usuario?.id])

  const puedeGuardar =
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    emailValido &&
    !emailDuplicado &&
    rol.length > 0 &&
    estado.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!puedeGuardar) return

    onGuardar({
      id: usuario?.id ?? generarId(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
      rol,
      estado,
      fechaCreacion: usuario?.fechaCreacion ?? hoyISO(),
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {modoEdicion ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
          <DialogDescription>
            {modoEdicion
              ? "Actualiza los datos del usuario."
              : "Completa los datos para crear un usuario."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Carlos"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ramírez"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@empresa.com"
              autoComplete="email"
            />
            {!emailValido && email.trim().length > 0 && (
              <p className="text-xs text-destructive">
                Escribe un correo válido.
              </p>
            )}
            {emailDuplicado && (
              <p className="text-xs text-destructive">Ese correo ya existe.</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={rol} onValueChange={(v) => setRol(v as Usuario["rol"])}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="editor">editor</SelectItem>
                  <SelectItem value="visor">visor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={estado}
                onValueChange={(v) => setEstado(v as Usuario["estado"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">activo</SelectItem>
                  <SelectItem value="inactivo">inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!puedeGuardar}>
              {modoEdicion ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
