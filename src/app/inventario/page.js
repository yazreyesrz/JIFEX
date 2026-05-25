"use client";

import { useState, useEffect } from "react";
import { mockVehicles } from "@/data/mockVehicles";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  Gauge,
  ArrowRight,
  Car,
  Briefcase,
  Ship,
  Compass,
  MapPin,
  Anchor,
  HelpCircle,
  ShieldAlert,
  Hourglass,
} from "lucide-react";

export default function InventarioPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState("inventario");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Estados para modales personalizados
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [logoutModal, setLogoutModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [yearFilter, setYearFilter] = useState("Todos");
  const [priceFilter, setPriceFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  // Sincronización de persistencia de tema local y redirección inteligente
  useEffect(() => {
    const savedTheme = localStorage.getItem("jifex_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }

    const targetView = localStorage.getItem("jifex_target_view");
    if (targetView) {
      setCurrentView(targetView);
      localStorage.removeItem("jifex_target_view");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("jifex_theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentView]);

  const compradoMock = mockVehicles[0]; // Daihatsu Mira e:S

  // Exclusión por software: Oculta la unidad comprada del catálogo público
  const filteredVehicles = mockVehicles.filter((car) => {
    const esAutoComprado =
      car.vin.toLowerCase() === compradoMock.vin.toLowerCase();
    if (esAutoComprado) return false;

    const matchesSearch =
      car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos" || car.estadoActual === statusFilter;
    const matchesYear =
      yearFilter === "Todos" || car.ano.toString() === yearFilter;

    const numericPrice = parseInt(car.precioCNF.replace(/[^0-9]/g, ""));
    const matchesPrice =
      priceFilter === "Todos" ||
      (priceFilter === "bajo" && numericPrice < 7000) ||
      (priceFilter === "alto" && numericPrice >= 7000);

    return matchesSearch && matchesStatus && matchesYear && matchesPrice;
  });

  // Algoritmo de ordenamiento avanzado (Incluye Cercanía de Entrega)
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === "cercania") {
      return (a.diasParaEntrega || 0) - (b.diasParaEntrega || 0);
    }
    const priceA = parseInt(a.precioCNF.replace(/[^0-9]/g, ""));
    const priceB = parseInt(b.precioCNF.replace(/[^0-9]/g, ""));
    if (sortBy === "precio-asc") return priceA - priceB;
    if (sortBy === "precio-desc") return priceB - priceA;
    if (sortBy === "ano-desc") return b.ano - a.ano;
    return 0;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#0b121f] text-[#f1f5f9]"
          : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setAlertModal={setAlertModal}
        setLogoutModal={setLogoutModal}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
      />

      {/* 🌟 CONTENEDOR DE ADAPTABILIDAD: md:ml-64 respeta el Sidebar */}
      <div className="md:ml-64">
        {/* El MAIN centra perfectamente el contenido en el espacio restante */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* ================= VISTA 1: INVENTARIO ================= */}
          {currentView === "inventario" && (
            <>
              <div
                className={`backdrop-blur-md p-5 rounded-2xl border transition-colors duration-300 shadow-xl space-y-4 ${
                  isDarkMode
                    ? "bg-[#1e293b]/40 border-slate-800/60"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Buscar por modelo o número de chasis (VIN)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-500 transition ${
                        isDarkMode
                          ? "border-slate-800 bg-[#0b121f]/60 text-white placeholder-slate-500"
                          : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs outline-none focus:border-amber-500 cursor-pointer ${isDarkMode ? "border-slate-800 bg-[#0b121f] text-slate-300" : "border-slate-200 bg-white text-slate-700"}`}
                    >
                      <option value="Todos">Todos los Estados</option>
                      <option value="Disponible">Disponible</option>
                      <option value="En tránsito">En tránsito</option>
                    </select>
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs outline-none focus:border-amber-500 cursor-pointer ${isDarkMode ? "border-slate-800 bg-[#0b121f] text-slate-300" : "border-slate-200 bg-white text-slate-700"}`}
                    >
                      <option value="Todos">Todos los Años</option>
                      <option value="2022">Año: 2022</option>
                      <option value="2023">Año: 2023</option>
                    </select>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs outline-none focus:border-amber-500 cursor-pointer ${isDarkMode ? "border-slate-800 bg-[#0b121f] text-slate-300" : "border-slate-200 bg-white text-slate-700"}`}
                    >
                      <option value="Todos">Cualquier Precio</option>
                      <option value="bajo">Menos de $7,000 USD</option>
                      <option value="alto">$7,000 USD o más</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-bold outline-none focus:border-amber-500 cursor-pointer ${isDarkMode ? "border-slate-700 bg-[#0b121f] text-amber-400" : "border-slate-200 bg-white text-amber-600"}`}
                    >
                      <option value="default">Ordenar por: Defecto</option>
                      <option value="cercania">⌛ Cercanía a Entrega</option>
                      <option value="precio-asc">Precio: Menor a Mayor</option>
                      <option value="precio-desc">Precio: Mayor a Menor</option>
                      <option value="ano-desc">Más Recientes</option>
                    </select>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className={`rounded-2xl border p-5 space-y-4 animate-pulse ${isDarkMode ? "border-slate-800 bg-[#1e293b]/20" : "border-slate-200 bg-slate-100"}`}
                    >
                      <div
                        className={`h-44 rounded-xl w-full ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`}
                      />
                      <div
                        className={`h-5 rounded w-2/3 ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`}
                      />
                      <div
                        className={`h-12 rounded-xl w-full ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedVehicles.map((car) => (
                    <div
                      key={car.vin}
                      className={`overflow-hidden rounded-2xl border transition duration-300 shadow-lg flex flex-col justify-between ${
                        isDarkMode
                          ? "border-slate-800 bg-[#1e293b]/40 backdrop-blur-sm hover:border-slate-700"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl"
                      }`}
                    >
                      <div
                        className={`relative h-44 w-full ${isDarkMode ? "bg-[#0b121f]" : "bg-slate-100"}`}
                      >
                        <img
                          src={car.fotos[0]}
                          alt={car.modelo}
                          className="h-full w-full object-cover"
                        />
                        <span
                          className={`absolute top-4 right-4 px-2.5 py-1 text-[9px] font-black rounded-full border uppercase tracking-wider ${
                            car.estadoActual === "Disponible"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }`}
                        >
                          {car.estadoActual}
                        </span>
                      </div>
                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-md font-bold tracking-tight ${isDarkMode ? "text-[#f8fafc]" : "text-slate-900"}`}
                          >
                            {car.modelo}
                          </h3>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                            CHASIS: {car.vin}
                          </p>
                        </div>

                        {sortBy === "cercania" && (
                          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/10 w-fit">
                            <Hourglass size={12} />
                            <span>
                              Arribo estimado: {car.diasParaEntrega || 25} días
                            </span>
                          </div>
                        )}

                        <div
                          className={`grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl border ${isDarkMode ? "text-slate-400 bg-[#0b121f]/60 border-slate-800/60" : "text-slate-600 bg-slate-50 border-slate-200"}`}
                        >
                          <div className="flex items-center gap-1">
                            <Calendar size={13} className="text-slate-400" />
                            <span>Año: {car.ano}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge size={13} className="text-slate-400" />
                            <span>{car.kilometraje}</span>
                          </div>
                        </div>
                        <div className="border-t border-slate-800/40 pt-3.5 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                              Costo CNF
                            </p>
                            <p className="text-md font-bold text-amber-500 tracking-tight">
                              {car.precioCNF}
                            </p>
                          </div>
                          <Link
                            href={`/inventario/${car.vin}`}
                            className={`inline-flex items-center gap-1 rounded-xl border px-3.5 py-2 text-xs font-bold text-amber-500 transition cursor-pointer ${isDarkMode ? "bg-[#0b121f] border-slate-700 hover:bg-amber-500 hover:text-white" : "bg-slate-50 border-slate-200 hover:bg-amber-500 hover:text-white"}`}
                          >
                            Detalles <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ================= VISTA 2: MIS COMPRAS ================= */}
          {currentView === "compras" && (
            <div className="space-y-6">
              <div
                className={`border-b pb-3 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
              >
                <h2
                  className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  <Briefcase className="text-amber-500" size={22} /> Mis
                  Adquisiciones
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Historial de vehículos adquiridos vinculados a tu cuenta de
                  importación
                </p>
              </div>

              <div
                className={`rounded-2xl border p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "border-slate-200 bg-white"}`}
              >
                <img
                  src={compradoMock.fotos[0]}
                  alt={compradoMock.modelo}
                  className={`w-full md:w-48 h-32 object-cover rounded-xl border ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
                />
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {compradoMock.modelo}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        VIN: {compradoMock.vin}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-black bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full uppercase tracking-wider">
                      {compradoMock.estadoActual}
                    </span>
                  </div>
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs border-t ${isDarkMode ? "text-slate-400 border-slate-800/60" : "text-slate-600 border-slate-200"}`}
                  >
                    <div>
                      <p className="text-slate-400">Precio Neto</p>
                      <p
                        className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}
                      >
                        {compradoMock.precioCNF}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Fecha de Carga</p>
                      <p
                        className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}
                      >
                        02/05/2026
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Puerto de Entrada</p>
                      <p className="font-bold text-amber-500 text-sm">
                        Karachi Port
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Link
                      href={`/inventario/${compradoMock.vin}`}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold text-amber-500 transition ${isDarkMode ? "bg-[#0b121f] border-slate-700 hover:bg-amber-500" : "bg-slate-50 border-slate-200 hover:bg-amber-500 hover:text-white"}`}
                    >
                      Ver Tracking Completo <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VISTA 3: TRACKING GLOBAL (ENRIQUECIDO) ================= */}
          {currentView === "tracking" && (
            <div className="space-y-6">
              <div
                className={`border-b pb-3 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
              >
                <h2
                  className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  <Ship className="text-amber-500" size={22} /> Posicionamiento
                  Logístico
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Localización de barcos cargueros en alta mar rumbo a Pakistán
                </p>
              </div>

              {/* Mapa de Ruta Original */}
              <div
                className={`rounded-2xl border p-6 space-y-4 shadow-xl ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "border-slate-200 bg-white"}`}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Compass size={14} className="text-amber-500" /> Coordenadas
                  Estimadas: Buque JFX-Carrier I
                </h3>
                <div
                  className={`relative h-28 w-full rounded-xl border overflow-hidden flex items-center justify-between px-10 sm:px-16 transition-colors ${isDarkMode ? "bg-[#0b121f]/80 border-slate-800" : "bg-slate-50 border-slate-200"}`}
                >
                  <div className="absolute left-24 right-24 border-t border-dashed border-slate-300/40 top-1/2 -translate-y-1/2 z-0" />
                  <div className="absolute left-24 w-[55%] border-t-2 border-amber-500 top-1/2 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse" />
                  <div
                    className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-lg border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
                  >
                    <MapPin size={15} className="text-slate-400" />
                    <span
                      className={`text-[10px] font-bold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                    >
                      Japón
                    </span>
                  </div>
                  <div
                    className={`relative z-10 flex flex-col items-center border p-2.5 rounded-xl animate-bounce shadow-md ${isDarkMode ? "bg-[#1e293b] border-slate-700/60" : "bg-white border-slate-200"}`}
                  >
                    <Ship size={18} className="text-amber-400" />
                    <span className="text-[8px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
                      En Tránsito
                    </span>
                  </div>
                  <div
                    className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-lg border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
                  >
                    <Anchor size={15} className="text-slate-400" />
                    <span
                      className={`text-[10px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}
                    >
                      Pakistán
                    </span>
                  </div>
                </div>
              </div>

              {/* 🌟 Cuadrícula de Telemetría Marina y Datos del Buque */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Telemetría de Navegación */}
                <div
                  className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
                >
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Compass size={14} className="text-amber-500" /> Telemetría
                    de Ruta
                  </h4>
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">Coordenadas:</span>
                      <span className="font-mono font-bold text-amber-500">
                        22.41° N, 70.18° E
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">Velocidad:</span>
                      <span className="font-bold flex items-center gap-1">
                        <Gauge size={12} className="text-slate-400" /> 15.4
                        nudos
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tiempo Restante:</span>
                      <span className="font-bold flex items-center gap-1">
                        <Hourglass size={12} className="text-slate-400" /> ~5
                        días hábiles
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Detalles Técnicos del Carguero */}
                <div
                  className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
                >
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Ship size={14} className="text-amber-500" /> Datos del
                    Carguero
                  </h4>
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">Nombre Oficial:</span>
                      <span className="font-bold text-slate-200">
                        MV JFX Pioneer III
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">Línea Naviera:</span>
                      <span className="font-bold text-slate-200">
                        Ocean Network (ONE)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Unidades Flota:</span>
                      <span className="font-bold text-amber-500">
                        14 en Alta Mar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Estatus del Puerto Destino */}
                <div
                  className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
                >
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Anchor size={14} className="text-amber-500" /> Puerto
                    Destino
                  </h4>
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">Puerto Arribo:</span>
                      <span className="font-bold text-slate-200">
                        Karachi Port (Pakistán)
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
                      <span className="text-slate-400">ETA Oficial:</span>
                      <span className="font-bold text-slate-200 flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" />{" "}
                        30/05/2026
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Condiciones:</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        Operando Normal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🌟 NUEVO: Bitácora de Eventos Logísticos de la Flota (Log de Eventos) */}
              <div
                className={`rounded-2xl border p-6 space-y-4 shadow-xl overflow-hidden ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "bg-white border-slate-200"}`}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Bitácora Global de Movimientos Marítimos
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap min-w-full">
                    <thead>
                      <tr
                        className={`border-b font-bold text-slate-400 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
                      >
                        <th className="pb-3 px-2 font-mono">FECHA / HORA</th>
                        <th className="pb-3 px-2">UBICACIÓN</th>
                        <th className="pb-3 px-2">EVENTO LOGÍSTICO RECIENTE</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`font-medium divide-y ${isDarkMode ? "divide-slate-800/50 text-slate-300" : "divide-slate-200 text-slate-700"}`}
                    >
                      <tr>
                        <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                          25/05/2026 09:30
                        </td>
                        <td className="py-3 px-2 font-semibold text-slate-400">
                          Mar de Arabia
                        </td>
                        <td className="py-3 px-2 text-amber-500">
                          Buque JFX-Carrier I reporta paso de control exitoso
                          sin novedades meteorológicas.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                          18/05/2026 14:00
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Puerto de Singapur
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Parada técnica completada. Zarpado del buque e ingreso
                          a la ruta directa hacia aguas de Pakistán.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                          02/05/2026 11:15
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Puerto de Yokohama
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Carga e izado de contenedores finalizado en Yard de
                          subasta. Maniobra de zarpe completada.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                          18/04/2026 08:00
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Yard de Inspección
                        </td>
                        <td className="py-3 px-2 text-slate-400">
                          Aprobación de la inspección física obligatoria JAAI de
                          exportación y liberación de documentación.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALES CENTRALES */}
      {alertModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl text-center space-y-4 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-200 bg-white"}`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <HelpCircle size={22} />
            </div>
            <div className="space-y-1">
              <h3
                className={`text-md font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {alertModal.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {alertModal.message}
              </p>
            </div>
            <button
              onClick={() =>
                setAlertModal({ open: false, title: "", message: "" })
              }
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl text-center space-y-4 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-200 bg-white"}`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <ShieldAlert size={22} />
            </div>
            <div className="space-y-1">
              <h3
                className={`text-md font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Cerrar Sesión
              </h3>
              <p
                className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                ¿Estás seguro de que deseas salir del portal de tracking de
                JIFEX?
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setLogoutModal(false)}
                className={`flex-1 rounded-xl border font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setLogoutModal(false);
                  router.push("/");
                }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
