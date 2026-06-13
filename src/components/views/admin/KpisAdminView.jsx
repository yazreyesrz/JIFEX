"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Car,
  Ship,
  CheckCircle,
  TrendingUp,
  Percent,
  TrendingDown,
  ShieldCheck,
  Building,
  Loader2,
  Briefcase,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export default function KpisAdminView({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error cargando los KPIs avanzados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKpiData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 size={48} className="text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
          Compilando analíticas avanzadas...
        </p>
      </div>
    );
  }

  // 🌟 VARIABLES PARA LOS CÁLCULOS AVANZADOS EN TIEMPO REAL
  const ingresos = data?.kpis?.ingresosTotales || 0;
  const totalAutos = data?.kpis?.totalVehiculos || 0;
  const entregados = data?.kpis?.vehiculosEntregados || 0;
  const clientes = data?.kpis?.totalClientes || 0;
  const enTransito = data?.kpis?.vehiculosEnTransito || 0;

  // 📊 Cálculo 1: Ticket Promedio de Venta (Ingresos / Autos Vendidos)
  const autosVendidos =
    totalAutos -
    (data?.charts?.estados?.find((e) => e.name.toUpperCase() === "DISPONIBLE")
      ?.value || 0);
  const ticketPromedio =
    autosVendidos > 0 ? Math.round(ingresos / autosVendidos) : 0;

  // 📊 Cálculo 2: Tasa de Eficiencia Logística (% de autos entregados vs totales)
  const tasaEntrega =
    totalAutos > 0 ? Math.round((entregados / totalAutos) * 100) : 0;

  // 📊 Cálculo 3: Distribución Operativa (Porcentaje de flota en movimiento)
  const tasaTransito =
    totalAutos > 0 ? Math.round((enTransito / totalAutos) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER DE LA PANTALLA */}
      <div>
        <h1
          className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          Panel de Control Operativo (KPIs)
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
          Indicadores clave de rendimiento financiero y logístico global
        </p>
      </div>

      {/* 🚀 BLOQUE 1: KPIs FINANCIEROS Y COMERCIALES TOP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI: INGRESOS TOTALES */}
        <div
          className={`p-6 rounded-3xl border transition-all hover:shadow-xl relative overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <DollarSign size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-0.5">
              <TrendingUp size={10} /> Real
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Ingresos de Flota Vendida
            </p>
            <h3 className="text-3xl font-black text-emerald-500 tracking-tight">
              ${ingresos.toLocaleString()} USD
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Facturación acumulada en base de datos
            </p>
          </div>
        </div>

        {/* KPI: TICKET PROMEDIO */}
        <div
          className={`p-6 rounded-3xl border transition-all hover:shadow-xl relative overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Briefcase size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
              Valor Medio
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Ticket Promedio por Auto
            </p>
            <h3
              className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              ${ticketPromedio.toLocaleString()} USD
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Costo promedio de adquisición por unidad
            </p>
          </div>
        </div>

        {/* KPI: VOLUMEN DE CLIENTES */}
        <div
          className={`p-6 rounded-3xl border transition-all hover:shadow-xl relative overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
              <Users size={24} />
            </div>
            <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
              B2B Corp
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Cuentas Importadoras
            </p>
            <h3
              className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              {clientes} Clientes
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Empresas con permisos de importación activos
            </p>
          </div>
        </div>
      </div>

      {/* 🚢 BLOQUE 2: METRICAS OPERATIVAS Y DE CONTROL LOGÍSTICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TARJETA DE TOTAL DE AUTOS */}
        <div
          className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#1e293b]/20 border-slate-800" : "bg-slate-50/50 border-slate-100"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Car className="text-slate-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Inventario Registrado
            </span>
          </div>
          <h4
            className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {totalAutos} Unidades
          </h4>
        </div>

        {/* TARJETA DE EFICIENCIA LOGÍSTICA */}
        <div
          className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#1e293b]/20 border-slate-800" : "bg-slate-50/50 border-slate-100"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Percent className="text-indigo-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Tasa de Entrega Final
            </span>
          </div>
          <h4 className="text-xl font-black text-indigo-500">
            {tasaEntrega}% Eficiencia
          </h4>
        </div>

        {/* TARJETA DE AUTOS EN MAR */}
        <div
          className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#1e293b]/20 border-slate-800" : "bg-slate-50/50 border-slate-100"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Ship className="text-amber-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Flota en Tránsito
            </span>
          </div>
          <h4 className="text-xl font-black text-amber-500">
            {enTransito} en Ruta Marítima
          </h4>
        </div>

        {/* TARJETA DE TASA DE TRÁNSITO */}
        <div
          className={`p-5 rounded-2xl border ${isDarkMode ? "bg-[#1e293b]/20 border-slate-800" : "bg-slate-50/50 border-slate-100"}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <Layers className="text-blue-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Densidad Operativa
            </span>
          </div>
          <h4 className="text-xl font-black text-blue-400">
            {tasaTransito}% Activo en Mar
          </h4>
        </div>
      </div>

      {/* 📊 BLOQUE 3: ANÁLISIS ESTRATÉGICO Y SALUD DEL SISTEMA */}
      <div
        className={`rounded-3xl border p-6 md:p-8 shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <h3
          className={`text-md font-black uppercase tracking-wider flex items-center gap-2 mb-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <ShieldCheck className="text-blue-500" size={18} /> Diagnóstico de
          Salud del Negocio JIFEX
        </h3>

        <div className="space-y-4">
          {/* Fila 1: Salud Logística */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${isDarkMode ? "bg-[#0b121f]/40 border-slate-800" : "bg-slate-50/60 border-slate-100"}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 mt-0.5">
                <Ship size={16} />
              </div>
              <div>
                <p
                  className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Capacidad Logística Internacional
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mide qué tan rápido se procesan y entregan las unidades desde
                  los puertos de Japón.
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${tasaEntrega >= 60 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
            >
              {tasaEntrega >= 60 ? "Excelente" : "Estable"}
            </span>
          </div>

          {/* Fila 2: Salud Comercial */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${isDarkMode ? "bg-[#0b121f]/40 border-slate-800" : "bg-slate-50/60 border-slate-100"}`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 mt-0.5">
                <DollarSign size={16} />
              </div>
              <div>
                <p
                  className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Rendimiento y Volumen Comercial
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Analiza el flujo de caja activo proveniente de las ventas
                  consolidadas en el catálogo.
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${ingresos > 50000 ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"}`}
            >
              {ingresos > 50000 ? "Alto Rendimiento" : "Óptimo"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
