import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Heart,
  CarFront,
  ArrowUpDown,
  FilterX,
  MapPin,
  Gauge,
} from "lucide-react";

export default function CatalogoView({
  isDarkMode,
  selectedBrand,
  setSelectedBrand,
  favorites,
  toggleFavorite,
  convertPrice,
  vehicles,
}) {
  // 🌟 ESTADOS PARA LOS FILTROS (Sección F2 del Brief)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [filterYear, setFilterYear] = useState("Todos");
  const [sortBy, setSortBy] = useState("recientes"); // recientes, precio_asc, precio_desc

  // 🌟 LÓGICA DE FILTRADO Y ORDENAMIENTO DINÁMICO
  const filteredAndSortedVehicles = useMemo(() => {
    let result = [...vehicles];

    // 1. Filtro por Marca (si se seleccionó una desde los íconos principales)
    if (selectedBrand) {
      result = result.filter(
        (v) => v.marca === selectedBrand || v.modelo.includes(selectedBrand),
      );
    }

    // 2. Buscador por VIN o Palabra Clave
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (v) =>
          v.modelo.toLowerCase().includes(term) ||
          v.vin.toLowerCase().includes(term) ||
          v.marca.toLowerCase().includes(term),
      );
    }

    // 3. Filtro por Estado
    if (filterStatus !== "Todos") {
      result = result.filter((v) => v.estadoActual === filterStatus);
    }

    // 4. Filtro por Año
    if (filterYear !== "Todos") {
      result = result.filter((v) => v.ano.toString() === filterYear);
    }

    // 5. Ordenamiento
    result.sort((a, b) => {
      if (sortBy === "recientes") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      // Limpiar el precio (quitar $, USD y comas) para ordenar matemáticamente
      const precioA = parseInt(a.precioCNF.replace(/[^0-9]/g, "")) || 0;
      const precioB = parseInt(b.precioCNF.replace(/[^0-9]/g, "")) || 0;

      if (sortBy === "precio_asc") return precioA - precioB;
      if (sortBy === "precio_desc") return precioB - precioA;
      return 0;
    });

    return result;
  }, [vehicles, selectedBrand, searchTerm, filterStatus, filterYear, sortBy]);

  // Años únicos para el filtro desplegable
  const uniqueYears = [...new Set(vehicles.map((v) => v.ano))].sort(
    (a, b) => b - a,
  );

  // Función para determinar el color del Badge según el estado (Regla del Brief)
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
      {/* 🌟 CABECERA Y BUSCADOR PRINCIPAL */}
      <div
        className={`flex flex-col lg:flex-row justify-between gap-6 pb-6 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Catálogo de Vehículos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
            Explora el inventario disponible y en tránsito hacia Pakistán.
          </p>
        </div>

        <div className="relative w-full lg:w-96 shrink-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por modelo, marca o chasis (VIN)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500/40 transition-all shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
          />
        </div>
      </div>

      {/* 🌟 BARRA DE FILTROS AVANZADOS (Sección F2) */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 items-center justify-between ${isDarkMode ? "bg-[#1e293b]/20 border-slate-800/60" : "bg-slate-50 border-slate-200"}`}
      >
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <SlidersHorizontal size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
              Filtros:
            </span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`rounded-xl border py-2 px-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${isDarkMode ? "bg-[#0b121f] border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
          >
            <option value="Todos">Todos los Estados</option>
            <option value="Disponible">Disponible (Japón)</option>
            <option value="En exportación">En Exportación</option>
            <option value="Embarcado">Embarcado</option>
            <option value="En tránsito">En Tránsito</option>
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className={`rounded-xl border py-2 px-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${isDarkMode ? "bg-[#0b121f] border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
          >
            <option value="Todos">Cualquier Año</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {(filterStatus !== "Todos" ||
            filterYear !== "Todos" ||
            selectedBrand) && (
            <button
              onClick={() => {
                setFilterStatus("Todos");
                setFilterYear("Todos");
                setSelectedBrand(null);
              }}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-500 transition-colors px-2"
            >
              <FilterX size={14} /> Limpiar
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <ArrowUpDown size={14} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`rounded-xl border py-2 px-3 text-xs font-semibold outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${isDarkMode ? "bg-[#0b121f] border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"}`}
          >
            <option value="recientes">Recién Agregados</option>
            <option value="precio_asc">Precio: Menor a Mayor</option>
            <option value="precio_desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* 🌟 GRID DE VEHÍCULOS (Tarjetas) */}
      {filteredAndSortedVehicles.length === 0 ? (
        <div
          className={`p-16 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center ${isDarkMode ? "border-slate-800 bg-[#1e293b]/10" : "border-slate-300 bg-slate-50"}`}
        >
          <CarFront size={48} className="text-slate-400 mb-4 opacity-50" />
          <p
            className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            No hay vehículos que coincidan
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Intenta ajustar los filtros de búsqueda o limpiar las opciones
            actuales.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAndSortedVehicles.map((car) => {
            const isFav = favorites.includes(car.vin);
            return (
              <div
                key={car.vin}
                className={`group flex flex-col rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 outline-none ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300"}`}
              >
                {/* Imagen y Favorito */}
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

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(car.vin);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all active:scale-95 ${isFav ? "bg-red-500/20 border-red-500/30 text-red-500" : "bg-black/20 border-white/10 text-white hover:bg-white/20"}`}
                  >
                    <Heart size={18} className={isFav ? "fill-current" : ""} />
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

                    {/* F3: Link hacia la Ficha de Detalle */}
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
