import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("JIFEX_SUPER_SECRET_KEY_2026");

export async function GET() {
  try {
    // 🌟 CORRECCIÓN: Next.js 15 exige 'await'
    const cookieStore = await cookies();
    const token = cookieStore.get("jifex_session")?.value;

    if (!token)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { payload } = await jwtVerify(token, secretKey);
    return NextResponse.json({ user: payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
