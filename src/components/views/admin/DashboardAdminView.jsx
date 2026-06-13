"use client";
import React from "react";
import {
  TrendingUp,
  Users,
  Car,
  Ship,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function DashboardAdminView({ isDarkMode }) {
  const stats = [
    {
      title: "Ingresos Totales (Mes)",
      value: "$142,500 USD",
      trend: "+12.5%",
      isUp: true,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Vehículos en Catálogo",
      value: "84 Unidades",
      trend: "-2.4%",
      isUp: false,
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Unidades en Tránsito",
      value: "32 Flotas",
      trend: "+18.2%",
      isUp: true,
      icon: Ship,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Clientes Activos B2B",
      value: "15 Empresas",
      trend: "+5.0%",
      isUp: true,
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* CABECERA RESPONSIVE */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Resumen Ejecutivo
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Métricas y rendimiento global de JIFEX
          </p>
        </div>
        <div
          className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-600"}`}
        >
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          Datos en Tiempo Real
        </div>
      </div>

      {/* TARJETAS DE KPIs RESPONSIVES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 transition-transform hover:-translate-y-1 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"}`}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}
              >
                <stat.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.isUp ? (isDarkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600") : isDarkMode ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"}`}
              >
                {stat.isUp ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3
                className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {stat.value}
              </h3>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mt-1">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN DE GRÁFICAS RESPONSIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          className={`lg:col-span-2 rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <h3
            className={`text-xs sm:text-sm font-black uppercase tracking-wider mb-5 sm:mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <BarChart3 size={16} className="text-blue-500" /> Distribución
            Logística del Inventario
          </h3>

          <div className="space-y-5 sm:space-y-6">
            <div>
              <div className="flex justify-between text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-2">
                <span
                  className={isDarkMode ? "text-slate-300" : "text-slate-700"}
                >
                  Disponibles en Japón
                </span>
                <span className="text-slate-400">45 Unidades (53%)</span>
              </div>
              <div
                className={`h-2 sm:h-3 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: "53%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-2">
                <span
                  className={isDarkMode ? "text-slate-300" : "text-slate-700"}
                >
                  En Tránsito Marítimo
                </span>
                <span className="text-slate-400">32 Unidades (38%)</span>
              </div>
              <div
                className={`h-2 sm:h-3 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "38%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-2">
                <span
                  className={isDarkMode ? "text-slate-300" : "text-slate-700"}
                >
                  Entregados (Este Mes)
                </span>
                <span className="text-slate-400">7 Unidades (9%)</span>
              </div>
              <div
                className={`h-2 sm:h-3 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "9%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <PieChart
            size={40}
            className="sm:w-12 sm:h-12 text-indigo-500 mb-3 sm:mb-4 opacity-80"
          />
          <h3
            className={`text-2xl sm:text-3xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Top Marcas
          </h3>
          <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-1 sm:mt-2 mb-4 sm:mb-6">
            Demanda por fabricante (Mes actual)
          </p>

          <div className="w-full space-y-2 sm:space-y-3">
            <div
              className={`flex justify-between items-center p-2.5 sm:p-3 rounded-xl border ${isDarkMode ? "border-slate-700 bg-[#0b121f]/50" : "border-slate-100 bg-slate-50"}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                Toyota
              </span>
              <span
                className={`text-[10px] sm:text-xs font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                45%
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-2.5 sm:p-3 rounded-xl border ${isDarkMode ? "border-slate-700 bg-[#0b121f]/50" : "border-slate-100 bg-slate-50"}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                Honda
              </span>
              <span
                className={`text-[10px] sm:text-xs font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                30%
              </span>
            </div>
            <div
              className={`flex justify-between items-center p-2.5 sm:p-3 rounded-xl border ${isDarkMode ? "border-slate-700 bg-[#0b121f]/50" : "border-slate-100 bg-slate-50"}`}
            >
              <span className="text-[10px] sm:text-xs font-bold text-slate-500">
                Daihatsu
              </span>
              <span
                className={`text-[10px] sm:text-xs font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                15%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
