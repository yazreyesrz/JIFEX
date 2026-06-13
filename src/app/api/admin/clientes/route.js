import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 🌟 OBTENER LISTA DE CLIENTES REALES (GET)
export async function GET() {
  try {
    const clientes = await prisma.usuario.findMany({
      where: { rol: "CLIENTE" },
      include: {
        _count: {
          select: { vehiculosComprados: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const clientesFormateados = clientes.map((c) => ({
      // 🌟 CORRECCIÓN: Conservamos el ID completo y único para que React no marque error
      id: c.id,
      // Creamos un ID visual cortito solo para mostrarlo en la tabla
      displayId: c.id
        ? c.id.length > 15
          ? c.id.slice(0, 8).toUpperCase()
          : c.id.toUpperCase()
        : "N/A",
      nombre: c.nombre,
      contacto: `@${c.username}`,
      email: c.email,
      telefono: c.telefono || "Sin teléfono",
      compras: c._count.vehiculosComprados,
      status: c._count.vehiculosComprados >= 3 ? "VIP" : "Activo",
    }));

    return NextResponse.json(clientesFormateados, { status: 200 });
  } catch (error) {
    console.error("Error en API Admin Clientes:", error);
    return NextResponse.json(
      { error: "Error al cargar la lista de clientes desde Supabase" },
      { status: 500 },
    );
  }
}

// 🌟 ELIMINAR UN CLIENTE DE LA BASE DE DATOS (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID del cliente a eliminar" },
        { status: 400 },
      );
    }

    await prisma.usuario.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en DELETE Admin Clientes:", error);
    return NextResponse.json(
      {
        error:
          "No se pudo eliminar al cliente. Verifica si tiene autos asignados primero.",
      },
      { status: 500 },
    );
  }
}
