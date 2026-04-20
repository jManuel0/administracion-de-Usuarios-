import Link from "next/link"
import { notFound } from "next/navigation"
import { obtenerUsuarioPorId } from "@/lib/datos"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function UsuarioDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const usuario = obtenerUsuarioPorId(id)

  if (!usuario) notFound()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Detalle de usuario</h1>
          <p className="text-muted-foreground text-sm">{usuario.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/usuarios">Volver</Link>
          </Button>
          <Button asChild>
            <Link
              href={`/dashboard/usuarios?edit=${encodeURIComponent(id)}&returnTo=${encodeURIComponent(
                `/dashboard/usuarios/${id}`
              )}`}
            >
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-background p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-medium">
              {usuario.nombre} {usuario.apellido}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rol</p>
            <p className="font-medium">{usuario.rol}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <Badge
              variant={usuario.estado === "activo" ? "default" : "secondary"}
            >
              {usuario.estado}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha de creación</p>
            <p className="font-medium">
              {new Date(usuario.fechaCreacion).toLocaleDateString("es-CO")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
