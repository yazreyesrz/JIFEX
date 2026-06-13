import React from "react";
import Link from "next/link";
import { Heart, CarFront, MapPin, Gauge, ArrowRight } from "lucide-react";

export default function FavoritosView({
  isDarkMode,
  favorites,
  toggleFavorite,
  convertPrice,
  setCurrentView,
  vehicles,
}) {
  // 🌟 FILTRO MÁGICO: Cruzamos la base de datos real con la lista de favoritos del cliente
  const favoriteVehicles = vehicles.filter((car) =>
    favorites.includes(car.vin),
  );

  // Helper para pintar el estado del auto
  const getStatusColor = (estado) => {
    if (!estado) return "";
    const est = estado.toLowerCase();
    if (est.includes("disponible"))
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (est.includes("exportación"))
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (est.includes("embarcado"))
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (est.includes("tránsito"))
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (est.includes("entregado"))
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 🌟 CABECERA */}
      <div
        className={`pb-6 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <h1
          className={`text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <Heart className="text-red-500 fill-red-500" size={32} />
          Vehículos Guardados
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
          Tu lista de seguimiento personalizada. Aquí puedes monitorear los
          autos que te interesan.
        </p>
      </div>

      {/* 🌟 ESTADO VACÍO (Si no hay favoritos) */}
      {favoriteVehicles.length === 0 ? (
        <div
          className={`p-16 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center ${isDarkMode ? "border-slate-800 bg-[#1e293b]/10" : "border-slate-300 bg-slate-50"}`}
        >
          <Heart size={48} className="text-slate-400 mb-4 opacity-50" />
          <p
            className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            No tienes favoritos aún
          </p>
          <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm mx-auto">
            Explora nuestro catálogo y marca con un corazón los vehículos que te
            interesen para darles seguimiento.
          </p>
          <button
            onClick={() => setCurrentView("inventario")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 outline-none"
          >
            Explorar Catálogo <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        /* 🌟 GRID DE FAVORITOS */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favoriteVehicles.map((car) => {
            return (
              <div
                key={car.vin}
                className={`group flex flex-col rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 outline-none ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300"}`}
              >
                {/* Imagen y Botón de Favorito */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-[#0b121f]">
                  <img
                    src={
                      car.fotos?.[0] ||
                      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={car.modelo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Este botón ahora sirve para QUITARLO de favoritos */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(car.vin);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all active:scale-95 bg-red-500/20 border-red-500/30 text-red-500`}
                  >
                    <Heart size={18} className="fill-current" />
                  </button>

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border backdrop-blur-md shadow-lg ${getStatusColor(car.estadoActual)}`}
                    >
                      {car.estadoActual}
                    </span>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                        {car.marca}
                      </p>
                      <h3
                        className={`text-xl font-black leading-tight line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {car.modelo}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Gauge size={14} className="text-amber-500" />
                      <span className="text-xs font-semibold">
                        {car.kilometraje}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin size={14} className="text-blue-500" />
                      <span className="text-xs font-semibold">
                        {car.transmision}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`pt-5 mt-auto border-t flex items-center justify-between ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                        Precio Estimado
                      </p>
                      <p
                        className={`text-lg font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
                      >
                        {convertPrice(car.precioCNF)}
                      </p>
                    </div>

                    <Link
                      href={`/inventario/${car.vin}`}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl transition-transform active:scale-95 shadow-md shadow-amber-500/20"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
