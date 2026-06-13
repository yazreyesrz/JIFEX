import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode("JIFEX_SUPER_SECRET_KEY_2026");

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // 🌟 CORRECCIÓN: Esperamos a que la promesa de cookies se resuelva (Requisito de Next.js 15)
    const cookieStore = await cookies();

    // Buscar usuario en la base de datos
    const user = await prisma.usuario.findFirst({
      where: { username: username },
    });

    // Validar si existe y la contraseña es correcta
    if (!user || user.passwordHash !== password) {
      return NextResponse.json(
        { error: "Credenciales incorrectas o usuario no encontrado" },
        { status: 401 },
      );
    }

    // Crear el Gafete (Token) para el cliente
    const token = await new SignJWT({
      id: user.id,
      username: user.username,
      rol: user.rol,
      nombre: user.nombre,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secretKey);

    // Guardarlo en las cookies usando el cookieStore ya resuelto
    cookieStore.set("jifex_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    const { passwordHash, ...userSinPassword } = user;
    return NextResponse.json({ user: userSinPassword }, { status: 200 });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
