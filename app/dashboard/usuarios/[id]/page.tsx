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
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">Detalle de usuario</h1>
          <p className="text-muted-foreground text-sm">{usuario.email}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/dashboard/usuarios">Volver</Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
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

      <div className="rounded-md border bg-background p-4 md:p-6 space-y-4">
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
