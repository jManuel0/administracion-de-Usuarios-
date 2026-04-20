"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, Eye, Plus } from "lucide-react"
import { Usuario } from "@/types/usuario"

interface Props {
  usuarios: Usuario[]
  onEditar: (usuario: Usuario) => void
  onEliminar: (usuario: Usuario) => void
}

const ITEMS_POR_PAGINA = 5

export default function TablaUsuarios({ usuarios, onEditar, onEliminar }: Props) {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState("")
  const [pagina, setPagina] = useState(1)

  const filtrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA)
  const inicio = (pagina - 1) * ITEMS_POR_PAGINA
  const paginados = filtrados.slice(inicio, inicio + ITEMS_POR_PAGINA)

  const iniciales = (nombre: string, apellido: string) =>
    `${nombre[0]}${apellido[0]}`.toUpperCase()

  const colorRol: Record<string, string> = {
    admin: "bg-red-100 text-red-700",
    editor: "bg-blue-100 text-blue-700",
    visor: "bg-gray-100 text-gray-700",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Buscar por nombre o correo..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value)
            setPagina(1)
          }}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              paginados.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {iniciales(usuario.nombre, usuario.apellido)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {usuario.nombre} {usuario.apellido}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {usuario.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${colorRol[usuario.rol]}`}
                    >
                      {usuario.rol}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={usuario.estado === "activo" ? "default" : "secondary"}
                    >
                      {usuario.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(usuario.fechaCreacion).toLocaleDateString("es-CO")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/dashboard/usuarios/${usuario.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditar(usuario)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEliminar(usuario)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Mostrando {filtrados.length === 0 ? 0 : inicio + 1}–
          {Math.min(inicio + ITEMS_POR_PAGINA, filtrados.length)} de {filtrados.length} usuarios
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina === totalPaginas || totalPaginas === 0}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}