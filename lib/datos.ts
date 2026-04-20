import { Usuario } from "@/types/usuario"

export const usuarios: Usuario[] = [
  {
    id: "1",
    nombre: "Carlos",
    apellido: "Ramírez",
    email: "carlos.ramirez@email.com",
    rol: "admin",
    estado: "activo",
    fechaCreacion: "2024-01-15",
  },
  {
    id: "2",
    nombre: "Laura",
    apellido: "Gómez",
    email: "laura.gomez@email.com",
    rol: "editor",
    estado: "activo",
    fechaCreacion: "2024-02-20",
  },
  {
    id: "3",
    nombre: "Miguel",
    apellido: "Torres",
    email: "miguel.torres@email.com",
    rol: "visor",
    estado: "inactivo",
    fechaCreacion: "2024-03-10",
  },
  {
    id: "4",
    nombre: "Sofía",
    apellido: "Herrera",
    email: "sofia.herrera@email.com",
    rol: "editor",
    estado: "activo",
    fechaCreacion: "2024-04-05",
  },
  {
    id: "5",
    nombre: "Andrés",
    apellido: "Morales",
    email: "andres.morales@email.com",
    rol: "visor",
    estado: "activo",
    fechaCreacion: "2024-05-18",
  },
  {
    id: "6",
    nombre: "Valentina",
    apellido: "Castro",
    email: "valentina.castro@email.com",
    rol: "admin",
    estado: "inactivo",
    fechaCreacion: "2024-06-22",
  },
  {
    id: "7",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@email.com",
    rol: "editor",
    estado: "activo",
    fechaCreacion: "2024-07-30",
  },
  {
    id: "8",
    nombre: "Daniela",
    apellido: "Vargas",
    email: "daniela.vargas@email.com",
    rol: "visor",
    estado: "activo",
    fechaCreacion: "2024-08-14",
  },
]

export function obtenerUsuarioPorId(id: string): Usuario | undefined {
  return usuarios.find((u) => u.id === id)
}