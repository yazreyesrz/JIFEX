import prisma from "@/lib/db"; // Tu conexión a la BD

export const obtenerCatalogo = async (filtros) => {
  try {
    // Aquí puedes meter lógica de negocio, ej. "Si es cliente, solo mostrar disponibles"
    const vehiculos = await prisma.vehiculo.findMany({
      where: filtros,
      orderBy: { fechaIngreso: "desc" },
    });
    return { exito: true, data: vehiculos };
  } catch (error) {
    console.error("Error en VehiculoService:", error);
    return { exito: false, error: "Error al obtener el catálogo" };
  }
};
