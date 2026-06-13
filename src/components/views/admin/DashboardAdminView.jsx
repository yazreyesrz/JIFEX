"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Car,
  Ship,
  Activity,
  BarChart3,
  PieChart,
  CheckCircle,
  Loader2,
} from "lucide-react";
// Importamos los componentes de Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardAdminView({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Colores dinámicos para las gráficas
  const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#6366f1", "#8b5cf6"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error obteniendo data del dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Cargando métricas...
        </p>
      </div>
    );
  }

  // 1. Mapeo de KPIs Dinámicos
  const stats = [
    {
      title: "Clientes Activos",
      value: data?.kpis?.totalClientes || 0,
      trend: "Usuarios",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Vehículos en Catálogo",
      value: data?.kpis?.totalVehiculos || 0,
      trend: "Unidades totales",
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Unidades en Tránsito",
      value: data?.kpis?.vehiculosEnTransito || 0,
      trend: "En alta mar",
      icon: Ship,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Unidades Entregadas",
      value: data?.kpis?.vehiculosEntregados || 0,
      trend: "Histórico",
      icon: CheckCircle,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1
          className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          Visión General
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
          Métricas de importación en tiempo real
        </p>
      </div>

      {/* 🌟 SECCIÓN DE KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                {stat.title}
              </p>
              <h3
                className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {stat.value}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-bold text-slate-500">
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 SECCIÓN DE GRÁFICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRÁFICA DE BARRAS: TOP MARCAS */}
        <div
          className={`lg:col-span-2 rounded-3xl border p-6 md:p-8 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <h3
              className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <BarChart3 size={18} className="text-blue-500" /> Marcas Más
              Importadas
            </h3>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.charts?.marcas || []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: isDarkMode ? "#94a3b8" : "#64748b",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: isDarkMode ? "#94a3b8" : "#64748b",
                    fontSize: 12,
                  }}
                />
                <RechartsTooltip
                  cursor={{ fill: isDarkMode ? "#1e293b" : "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
                    color: isDarkMode ? "#fff" : "#000",
                    fontWeight: "bold",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="Total"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICA DE PASTEL: DISTRIBUCIÓN LOGÍSTICA */}
        <div
          className={`rounded-3xl border p-6 md:p-8 shadow-sm flex flex-col ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <PieChart size={18} className="text-amber-500" /> Estado Logístico
            </h3>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={data?.charts?.estados || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {(data?.charts?.estados || []).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
                      color: isDarkMode ? "#fff" : "#000",
                      fontWeight: "bold",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {(data?.charts?.estados || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-xs font-bold"
                >
                  <div className="flex items-center gap-2 text-slate-500">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></span>
                    {item.name}
                  </div>
                  <span
                    className={isDarkMode ? "text-white" : "text-slate-800"}
                  >
                    {item.value} Unidades
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
