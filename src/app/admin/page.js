"use client";

import Navbar from "@/components/Navbar";
import {
  TrendingUp,
  Ship,
  Users,
  CheckCircle2,
  Target,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0b121f] text-slate-300 font-sans antialiased">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* ENCABEZADO DEL DASHBOARD */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Panel Operativo JIFEX
            </h1>
            <p className="text-[11px] font-mono text-slate-400 mt-1.5 uppercase tracking-widest">
              Monitoreo Global • Japón ➔ Pakistán
            </p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 text-xs font-bold text-amber-500 transition-all hover:bg-amber-500 hover:text-[#0b121f] shadow-lg shadow-amber-500/5 cursor-pointer">
              Descargar Reporte <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* TARJETAS DE INDICADORES CLAVE (KPIs) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md transition-all hover:border-slate-700/80 hover:bg-[#1e293b]/60">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Meta Anual
                </p>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  180{" "}
                  <span className="text-sm text-slate-500 font-medium">
                    Autos
                  </span>
                </h3>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/5 blur-2xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md transition-all hover:border-slate-700/80 hover:bg-[#1e293b]/60">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Ship size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  En Alta Mar
                </p>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  14{" "}
                  <span className="text-sm text-slate-500 font-medium">
                    Unids
                  </span>
                </h3>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-500/5 blur-2xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md transition-all hover:border-slate-700/80 hover:bg-[#1e293b]/60">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Entregados
                </p>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  42{" "}
                  <span className="text-sm text-slate-500 font-medium">
                    Autos
                  </span>
                </h3>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-500/5 blur-2xl"></div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md transition-all hover:border-slate-700/80 hover:bg-[#1e293b]/60">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                <Users size={22} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Prospectos
                </p>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  28{" "}
                  <span className="text-sm text-slate-500 font-medium">
                    Activos
                  </span>
                </h3>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-indigo-500/5 blur-2xl"></div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL: DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TABLA DE ACTIVIDAD RECIENTE (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} className="text-emerald-500" /> Movimientos
                Logísticos Recientes
              </h3>
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Clock size={12} /> Actualizado en vivo
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="text-[10px] text-slate-500 uppercase tracking-wider border-b border-slate-800/40">
                    <th className="pb-3 px-2 font-medium">Chasis / VIN</th>
                    <th className="pb-3 px-2 font-medium">Modelo</th>
                    <th className="pb-3 px-2 font-medium">Nuevo Estatus</th>
                    <th className="pb-3 px-2 font-medium text-right">
                      Actualización
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-2 font-mono font-semibold text-slate-400">
                      LA350S-123456
                    </td>
                    <td className="py-3 px-2">Daihatsu Mira e:S</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] uppercase font-bold tracking-wider">
                        En Tránsito
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-500 font-mono text-[10px]">
                      Hace 12 min
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-2 font-mono font-semibold text-slate-400">
                      MXAA54-667788
                    </td>
                    <td className="py-3 px-2">Toyota RAV4 Adv.</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[9px] uppercase font-bold tracking-wider">
                        Entregado
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-500 font-mono text-[10px]">
                      Hace 2 horas
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-2 font-mono font-semibold text-slate-400">
                      NKE165-445566
                    </td>
                    <td className="py-3 px-2">Toyota Corolla Axio</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] uppercase font-bold tracking-wider">
                        En Exportación
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-500 font-mono text-[10px]">
                      Hace 5 horas
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 px-2 font-mono font-semibold text-slate-400">
                      S321V-987654
                    </td>
                    <td className="py-3 px-2">Daihatsu Hijet Cargo</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-wider">
                        Disponible
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-500 font-mono text-[10px]">
                      Ayer
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* GRÁFICO DE DISTRIBUCIÓN (Ocupa 1 columna) */}
          <div className="rounded-2xl border border-slate-800/60 bg-[#1e293b]/40 p-6 shadow-xl backdrop-blur-md space-y-6 flex flex-col justify-between">
            <div className="border-b border-slate-800/60 pb-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Target size={16} className="text-amber-500" /> Distribución por
                Destino
              </h3>
            </div>

            <div className="space-y-5 flex-1 pt-2">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  <span>
                    Karachi{" "}
                    <span className="text-slate-500 font-medium capitalize">
                      (Puerto Base)
                    </span>
                  </span>
                  <span className="text-blue-400">65%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-1.5 mt-[1px] ml-[1px] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  <span>
                    Lahore{" "}
                    <span className="text-slate-500 font-medium capitalize">
                      (Showrooms)
                    </span>
                  </span>
                  <span className="text-amber-500">25%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-1.5 mt-[1px] ml-[1px] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  <span>
                    Islamabad{" "}
                    <span className="text-slate-500 font-medium capitalize">
                      (Directo)
                    </span>
                  </span>
                  <span className="text-indigo-400">10%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-1.5 mt-[1px] ml-[1px] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60">
              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                Datos analíticos basados en facturación CNF acumulada del
                presente año fiscal.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
