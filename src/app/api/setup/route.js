import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // 1. Buscamos y creamos al Administrador Global
    let admin = await prisma.usuario.findFirst({
      where: { username: "ADMINJIFEX" },
    });

    if (!admin) {
      admin = await prisma.usuario.create({
        data: {
          id: "ADMIN-001",
          username: "ADMINJIFEX",
          passwordHash: "admin2026",
          nombre: "Director JIFEX",
          rol: "ADMIN",
          email: "admin@jifex.com", // 🌟 AGREGAMOS EL CORREO OBLIGATORIO
        },
      });
    }

    // 2. Buscamos y creamos al Manager Logístico
    let manager = await prisma.usuario.findFirst({
      where: { username: "MANAGERJIFEX" },
    });

    if (!manager) {
      manager = await prisma.usuario.create({
        data: {
          id: "MANAGER-001",
          username: "MANAGERJIFEX",
          passwordHash: "manager2026",
          nombre: "Manager Logístico",
          rol: "MANAGER",
          email: "manager@jifex.com", // 🌟 AGREGAMOS EL CORREO OBLIGATORIO
        },
      });
    }

    // Si todo sale bien, devolvemos el mensaje de éxito
    return NextResponse.json(
      {
        success: true,
        message: "¡Cuentas maestras inyectadas con éxito en Supabase!",
        cuentas: [admin, manager],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al inyectar cuentas:", error);
    return NextResponse.json(
      {
        error: "No se pudieron inyectar las cuentas",
        detalle: error ? String(error) : "Error desconocido",
      },
      { status: 500 },
    );
  }
}
