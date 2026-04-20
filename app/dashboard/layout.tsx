"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, LogOut, LayoutDashboard } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    router.push("/login")
  }

  const enlaces = [
    {
      href: "/dashboard/usuarios",
      label: "Usuarios",
      icono: Users,
    },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Barra lateral */}
      <aside className="w-64 border-r bg-background flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <span className="font-semibold text-lg">AdminPanel</span>
          </div>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-1">
          {enlaces.map((enlace) => {
            const Icono = enlace.icono
            const activo = pathname.startsWith(enlace.href)
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activo
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icono className="h-4 w-4" />
                {enlace.label}
              </Link>
            )
          })}
        </nav>

        <Separator />

        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-muted/40">
        {children}
      </main>
    </div>
  )
}