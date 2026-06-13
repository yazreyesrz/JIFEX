import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 1. OBTENER TODOS LOS TICKETS
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        mensajes: { orderBy: { createdAt: "asc" } },
        cliente: {
          select: { nombre: true, username: true, email: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error en GET tickets:", error);
    return NextResponse.json(
      { error: "Error al obtener tickets" },
      { status: 500 },
    );
  }
}

// 2. CREAR TICKET O RESPONDER
export async function POST(request) {
  try {
    const data = await request.json();

    // A) Si es un TICKET NUEVO (Desde el cliente)
    if (data.action === "NEW_TICKET") {
      // 🌟 SALVAVIDAS ANTI-CRASH: Si no hay usuario logueado, usamos uno temporal
      let idClienteReal = data.clienteId;
      let nombreReal = data.clienteNombre;
      let usuarioReal = data.clienteUsuario;

      if (!idClienteReal) {
        // Buscamos o creamos un usuario "Invitado" de emergencia
        let invitado = await prisma.usuario.findFirst({
          where: { email: "invitado@jifex.com" },
        });
        if (!invitado) {
          invitado = await prisma.usuario.create({
            data: {
              id: "USR-INVITADO-001",
              nombre: "Usuario Invitado",
              username: "invitado",
              email: "invitado@jifex.com",
              passwordHash: "123",
              rol: "CLIENTE",
            },
          });
        }
        idClienteReal = invitado.id;
        nombreReal = invitado.nombre;
        usuarioReal = invitado.username;
      }

      // 🌟 CREAMOS EL TICKET Y LO CONECTAMOS AL DUEÑO
      const nuevoTicket = await prisma.ticket.create({
        data: {
          id: `TK-${Math.floor(100 + Math.random() * 900)}`,
          asunto: data.asunto,
          estado: "ABIERTO",
          vinReferencia: data.vin || null,
          vin: data.vin || null,
          clienteNombre: nombreReal,
          clienteUsuario: usuarioReal,
          // Prisma exige conectar la relación de forma estricta:
          cliente: {
            connect: { id: idClienteReal },
          },
          mensajes: {
            create: {
              id: `MSG-${Date.now()}`,
              texto: data.mensaje,
              remitente: "CLIENTE",
              usuarioId: idClienteReal,
            },
          },
        },
        include: { mensajes: true, cliente: true },
      });

      return NextResponse.json(nuevoTicket, { status: 201 });
    }

    // B) Si es una RESPUESTA (Desde el Manager o Cliente)
    if (data.action === "REPLY") {
      const nuevoMensaje = await prisma.mensaje.create({
        data: {
          id: `MSG-${Date.now()}`,
          texto: data.mensaje,
          remitente: data.remitente,
          ticketId: data.ticketId,
          usuarioId: data.usuarioId || undefined,
        },
      });

      // Actualizamos el estado del ticket cuando alguien responde
      await prisma.ticket.update({
        where: { id: data.ticketId },
        data: {
          estado: data.remitente === "MANAGER" ? "RESUELTO" : "ABIERTO",
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(nuevoMensaje, { status: 201 });
    }
  } catch (error) {
    console.error("Error en POST tickets:", error);
    return NextResponse.json(
      { error: "Error interno al guardar el ticket" },
      { status: 500 },
    );
  }
}

// 3. ELIMINAR UN TICKET (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID del ticket" },
        { status: 400 },
      );
    }

    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en DELETE tickets:", error);
    return NextResponse.json(
      { error: "Error al eliminar el ticket" },
      { status: 500 },
    );
  }
}
