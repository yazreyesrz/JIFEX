import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 🌟 1. OBTENER TODOS LOS CLIENTES
export async function GET() {
  try {
    const clientes = await prisma.usuario.findMany({
      where: { rol: "CLIENTE" },
      include: { vehiculosComprados: true },
      // 🌟 SOLUCIÓN: Eliminamos el 'orderBy: { createdAt: 'desc' }'
      // que estaba haciendo chocar a Prisma por si tu tabla no tiene esa columna.
    });
    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.error("🔴 ERROR CRÍTICO AL OBTENER CLIENTES:", error.message);
    return NextResponse.json(
      { error: "Error al obtener clientes" },
      { status: 500 },
    );
  }
}

// 🌟 2. CREAR UN NUEVO CLIENTE
export async function POST(request) {
  try {
    const data = await request.json();

    const emailLimpio = data.correo?.trim() === "" ? null : data.correo?.trim();
    const telefonoLimpio =
      data.telefono?.trim() === "" ? null : data.telefono?.trim();
    const direccionLimpia =
      data.direccion?.trim() === "" ? null : data.direccion?.trim();

    // Crear el usuario y conectar los vehículos AL MISMO TIEMPO
    const nuevoCliente = await prisma.usuario.create({
      data: {
        id: `USR-${Date.now()}`,
        username: data.username.trim(),
        passwordHash: data.password,
        nombre: data.nombre.trim(),
        email: emailLimpio,
        telefono: telefonoLimpio,
        direccion: direccionLimpia,
        rol: "CLIENTE",
        vehiculosComprados:
          data.vins && data.vins.length > 0
            ? { connect: data.vins.map((vin) => ({ vin: vin })) }
            : undefined,
      },
      include: { vehiculosComprados: true },
    });

    return NextResponse.json(nuevoCliente, { status: 201 });
  } catch (error) {
    console.error(
      "🔴 ERROR CRÍTICO AL CREAR CLIENTE EN PRISMA:",
      error.message,
    );
    return NextResponse.json(
      {
        error: "Error interno al crear el cliente.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

// 🌟 3. ACTUALIZAR UN CLIENTE EXISTENTE (EDITAR)
export async function PUT(request) {
  try {
    const data = await request.json();

    const emailLimpio = data.correo?.trim() === "" ? null : data.correo?.trim();
    const telefonoLimpio =
      data.telefono?.trim() === "" ? null : data.telefono?.trim();
    const direccionLimpia =
      data.direccion?.trim() === "" ? null : data.direccion?.trim();

    // Preparamos los datos base para actualizar
    const updateData = {
      nombre: data.nombre.trim(),
      email: emailLimpio,
      telefono: telefonoLimpio,
      direccion: direccionLimpia,
      // Reemplazamos los autos asignados anteriores por los nuevos que marcaste
      vehiculosComprados: {
        set:
          data.vins && data.vins.length > 0
            ? data.vins.map((vin) => ({ vin }))
            : [],
      },
    };

    // Solo actualizamos la contraseña si el manager escribió una nueva
    if (data.password && data.password.trim() !== "") {
      updateData.passwordHash = data.password;
    }

    const clienteActualizado = await prisma.usuario.update({
      where: { id: data.id },
      data: updateData,
      include: { vehiculosComprados: true },
    });

    return NextResponse.json(clienteActualizado, { status: 200 });
  } catch (error) {
    console.error("🔴 ERROR CRÍTICO AL ACTUALIZAR CLIENTE:", error.message);
    return NextResponse.json(
      {
        error: "Error interno al actualizar el cliente.",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
