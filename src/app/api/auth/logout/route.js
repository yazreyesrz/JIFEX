import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // 🌟 CORRECCIÓN: Next.js 15 exige 'await'
  const cookieStore = await cookies();
  cookieStore.delete("jifex_session");

  return NextResponse.json({ success: true }, { status: 200 });
}
