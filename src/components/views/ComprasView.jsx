import React from "react";
import Link from "next/link";
import {
  Ship,
  Package,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Gauge,
} from "lucide-react";

export default function ComprasView({ isDarkMode, convertPrice, vehicles }) {
  // 🌟 CONFIAMOS AL 100% EN LOS AUTOS ASIGNADOS DESDE LA BD
  const misAutos = vehicles || [];

  // 🌟 HELPER ACTUALIZADO A ENUMS DE POSTGRESQL PARA COLORES
  const getStatusColor = (estado) => {
    if (!estado)
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (estado === "EN_EXPORTACION")
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (estado === "EMBARCADO")
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (estado === "EN_TRANSITO")
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (estado === "ENTREGADO")
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
  };

  // 🌟 HELPER ACTUALIZADO PARA LA BARRA DE PROGRESO
  const getProgressWidth = (estado) => {
    if (!estado) return "15%";
    if (estado === "EN_EXPORTACION") return "25%";
    if (estado === "EMBARCADO") return "50%";
    if (estado === "EN_TRANSITO") return "75%";
    if (estado === "ENTREGADO") return "100%";
    return "15%"; // Progreso inicial seguro para autos recién asignados
  };

  // Formatear estado para que se vea bonito ("EN_TRANSITO" -> "EN TRANSITO")
  const formatEstado = (estado) => {
    if (!estado) return "PROCESANDO";
    return estado.replace("_", " ");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* CABECERA */}
      <div
        className={`pb-6 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <h1
          className={`text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <Package className="text-amber-500" size={32} />
          Mi Flota
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
          Control y seguimiento en tiempo real de todos los vehículos que has
          adquirido.
        </p>
      </div>

      {/* ESTADO VACÍO */}
      {misAutos.length === 0 ? (
        <div
          className={`p-16 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center ${isDarkMode ? "border-slate-800 bg-[#1e293b]/10" : "border-slate-300 bg-slate-50"}`}
        >
          <Ship size={48} className="text-slate-400 mb-4 opacity-50" />
          <p
            className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Aún no tienes vehículos en tránsito
          </p>
          <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm mx-auto">
            Cuando adquieras un vehículo con tu asesor comercial, aparecerá
            mágicamente aquí con todo su seguimiento logístico.
          </p>
          <Link
            href="/inventario"
            onClick={() => {
              if (typeof window !== "undefined") {
                const btn = document.querySelector(
                  'button[aria-label="Catálogo"]',
                );
                if (btn) btn.click();
              }
            }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 outline-none"
          >
            Ir al Catálogo <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* LISTADO DE FLOTA */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {misAutos.map((car) => (
            <div
              key={car.vin}
              className={`flex flex-col sm:flex-row rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              {/* Imagen */}
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-100 dark:bg-[#0b121f]">
                <img
                  src={
                    car.fotos?.[0] ||
                    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={car.modelo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg ${getStatusColor(car.estadoActual)}`}
                  >
                    {formatEstado(car.estadoActual)}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                        {car.marca}
                      </p>
                      <h3
                        className={`text-xl font-black leading-tight line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {car.modelo}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest">
                    VIN:{" "}
                    <span className="font-bold text-amber-500">{car.vin}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-[9px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                        <Gauge size={12} /> Kms
                      </p>
                      <p
                        className={`text-xs font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                      >
                        {car.kilometraje || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                        <MapPin size={12} /> Origen
                      </p>
                      <p
                        className={`text-xs font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                      >
                        Japón
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini Barra de Tracking */}
                <div
                  className={`mt-auto pt-5 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
                >
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Progreso Logístico
                    </p>
                    {car.estadoActual === "ENTREGADO" && (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                  <div
                    className={`h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}
                  >
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${car.estadoActual === "ENTREGADO" ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: getProgressWidth(car.estadoActual) }}
                    />
                  </div>

                  <div className="mt-5 flex justify-end">
                    {/* 🌟 AQUÍ ESTÁ EL CAMBIO: AHORA ES UN ENLACE DIRECTO A LOS DETALLES DEL AUTO */}
                    <Link
                      href={`/inventario/${car.vin}`}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 border cursor-pointer ${isDarkMode ? "bg-[#0b121f] border-slate-700 text-slate-300 hover:text-amber-500 hover:border-amber-500" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-300"}`}
                    >
                      Ver Detalles del Auto <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
