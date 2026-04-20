export type Rol = "admin" | "editor" | "visor"

export type Estado = "activo" | "inactivo"

export interface Usuario {
  id: string
  nombre: string
  apellido: string
  email: string
  rol: Rol
  estado: Estado
  fechaCreacion: string
  avatar?: string
}