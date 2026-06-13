import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // 1. OBTENER KPIs PRINCIPALES
    const totalClientes = await prisma.usuario.count({
      where: { rol: "CLIENTE" },
    });

    const totalVehiculos = await prisma.vehiculo.count();

    const vehiculosEnTransito = await prisma.vehiculo.count({
      where: { estadoActual: { in: ["EN_TRANSITO", "EMBARCADO"] } },
    });

    const vehiculosEntregados = await prisma.vehiculo.count({
      where: { estadoActual: "ENTREGADO" },
    });

    // 2. DATOS PARA LA GRÁFICA DE PASTEL (Autos por Estado)
    const agrupadosPorEstado = await prisma.vehiculo.groupBy({
      by: ["estadoActual"],
      _count: { estadoActual: true },
    });

    const datosEstados = agrupadosPorEstado.map((item) => ({
      name: item.estadoActual.replace("_", " "),
      value: item._count.estadoActual,
    }));

    // 3. DATOS PARA LA GRÁFICA DE BARRAS (Top 5 Marcas)
    const agrupadosPorMarca = await prisma.vehiculo.groupBy({
      by: ["marca"],
      _count: { marca: true },
      orderBy: { _count: { marca: "desc" } },
      take: 5,
    });

    const datosMarcas = agrupadosPorMarca.map((item) => ({
      name: item.marca,
      Total: item._count.marca,
    }));

    // Retornamos todo empacado al frontend
    return NextResponse.json(
      {
        kpis: {
          totalClientes,
          totalVehiculos,
          vehiculosEnTransito,
          vehiculosEntregados,
        },
        charts: {
          estados: datosEstados,
          marcas: datosMarcas,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en Dashboard Admin API:", error);
    return NextResponse.json(
      { error: "Error al obtener datos del dashboard" },
      { status: 500 },
    );
  }
}
