import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// 1. OBTENER AUTOS (GET)
export async function GET() {
  try {
    const vehiculos = await prisma.vehiculo.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        cliente: {
          select: { nombre: true, username: true, email: true },
        },
        documentos: true,
      },
    });
    return NextResponse.json(vehiculos, { status: 200 });
  } catch (error) {
    console.error("Error en GET vehiculos:", error);
    return NextResponse.json(
      { error: "Error al obtener el catálogo" },
      { status: 500 },
    );
  }
}

// 2. CREAR UN AUTO NUEVO (POST)
export async function POST(request) {
  try {
    const data = await request.json();

    const docsToCreate = [];
    if (data.documentos) {
      if (data.documentos.auctionSheet?.urlArchivo) {
        docsToCreate.push({
          tipo: "HOJA_SUBASTA",
          urlArchivo: data.documentos.auctionSheet.urlArchivo,
        });
      }
      if (data.documentos.jaai?.urlArchivo) {
        docsToCreate.push({
          tipo: "JAAI",
          urlArchivo: data.documentos.jaai.urlArchivo,
        });
      }
      if (data.documentos.bl?.urlArchivo) {
        docsToCreate.push({
          tipo: "BL",
          urlArchivo: data.documentos.bl.urlArchivo,
        });
      }
    }

    const nuevoVehiculo = await prisma.vehiculo.create({
      data: {
        vin: data.vin,
        idInterno: data.vin.slice(-6),
        marca: data.marca,
        modelo: data.modelo,
        ano: data.ano ? parseInt(data.ano) : new Date().getFullYear(),
        precioCNF: data.precioCNF,
        estadoActual: data.estadoActual || "DISPONIBLE",
        kilometraje: data.kilometraje,
        combustible: data.combustible,
        transmision: data.transmision,
        traccion: data.traccion,
        colorExterior: data.colorExterior,
        gradoSubasta: data.gradoSubasta,
        pasajeros: data.pasajeros,
        puertas: data.puertas,
        equipamiento: data.equipamiento || [],
        inspectorReport: data.inspectorReport,
        fotos:
          data.fotos?.length > 0
            ? data.fotos
            : [
                "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop",
              ],
        documentos: {
          create: docsToCreate,
        },
      },
    });

    return NextResponse.json(nuevoVehiculo, { status: 201 });
  } catch (error) {
    console.error("Error en POST vehiculos:", error);
    return NextResponse.json(
      {
        error: "Hubo un error. Verifica que el chasis (VIN) no esté repetido.",
      },
      { status: 500 },
    );
  }
}

// 3. ELIMINAR UN AUTO (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vin = searchParams.get("vin");

    if (!vin) {
      return NextResponse.json({ error: "Falta el VIN" }, { status: 400 });
    }

    await prisma.vehiculo.delete({
      where: { vin },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en DELETE vehiculos:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

// 🌟 4. ACTUALIZAR UN AUTO EXISTENTE (PUT)
export async function PUT(request) {
  try {
    const data = await request.json();

    if (!data.vin) {
      return NextResponse.json(
        { error: "Falta el VIN del vehículo a actualizar" },
        { status: 400 },
      );
    }

    const docsToCreate = [];
    if (data.documentos) {
      // Limpiamos los anteriores para no duplicar
      await prisma.documento.deleteMany({ where: { vehiculoVin: data.vin } });

      if (data.documentos.auctionSheet?.urlArchivo)
        docsToCreate.push({
          tipo: "HOJA_SUBASTA",
          urlArchivo: data.documentos.auctionSheet.urlArchivo,
        });
      if (data.documentos.jaai?.urlArchivo)
        docsToCreate.push({
          tipo: "JAAI",
          urlArchivo: data.documentos.jaai.urlArchivo,
        });
      if (data.documentos.bl?.urlArchivo)
        docsToCreate.push({
          tipo: "BL",
          urlArchivo: data.documentos.bl.urlArchivo,
        });
    }

    // 🌟 AHORA SÍ GUARDAMOS ABSOLUTAMENTE TODO LO QUE EL MANAGER EDITE EN EL FORMULARIO
    const updatedVehiculo = await prisma.vehiculo.update({
      where: { vin: data.vin },
      data: {
        marca: data.marca,
        modelo: data.modelo,
        ano: data.ano ? parseInt(data.ano) : undefined,
        precioCNF: data.precioCNF,
        estadoActual: data.estadoActual || undefined,
        kilometraje: data.kilometraje,
        combustible: data.combustible,
        transmision: data.transmision,
        traccion: data.traccion,
        colorExterior: data.colorExterior,
        gradoSubasta: data.gradoSubasta,
        pasajeros: data.pasajeros,
        puertas: data.puertas,
        equipamiento: data.equipamiento,
        inspectorReport: data.inspectorReport,
        tracking: data.tracking || undefined,
        clienteId: data.clienteId !== undefined ? data.clienteId : undefined,
        fotos: data.fotos?.length > 0 ? data.fotos : undefined,
        documentos: {
          create: docsToCreate,
        },
      },
      include: { cliente: true },
    });

    return NextResponse.json(updatedVehiculo, { status: 200 });
  } catch (error) {
    console.error("Error en PUT vehiculos:", error);
    return NextResponse.json(
      { error: "Error al actualizar el vehículo en la base de datos" },
      { status: 500 },
    );
  }
}
