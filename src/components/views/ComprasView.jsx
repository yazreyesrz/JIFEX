import React from "react";
import Link from "next/link";
import {
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Ship,
  Clock,
  FileText,
  Calendar,
} from "lucide-react";
import { mockVehicles } from "@/data/mockVehicles";
import { useTranslation } from "react-i18next";

export default function ComprasView({ isDarkMode, convertPrice }) {
  const { t } = useTranslation();

  const activePurchases = [mockVehicles[0], mockVehicles[4]];
  const historyPurchases = mockVehicles.filter(
    (car) => car.estadoActual === "Entregado",
  );

  return (
    <div className="space-y-8">
      <div
        className={`border-b pb-4 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <h2
          className={`text-3xl font-black flex items-center gap-2 tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <Briefcase className="text-amber-500" size={26} /> {t("fleet.title")}
        </h2>
        <p className="text-sm text-slate-400 mt-1.5">{t("fleet.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <h3
          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          <Clock size={16} className="text-blue-500" /> {t("fleet.active")}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activePurchases.map((car) => (
            <div
              key={car.vin}
              className={`rounded-3xl border p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl transition-all duration-300 hover:shadow-2xl ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 hover:bg-[#1e293b]/60 hover:border-slate-700" : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div className="w-full sm:w-48 h-32 shrink-0">
                <img
                  src={car.fotos[0]}
                  alt={car.modelo}
                  className={`w-full h-full object-cover rounded-2xl border ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
                />
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {car.modelo}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      VIN: {car.vin}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-wider border ${car.estadoActual === "En tránsito" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}
                  >
                    {t(`states.${car.estadoActual}`)}
                  </span>
                </div>
                <div
                  className={`grid grid-cols-2 gap-4 pt-3 border-t ${isDarkMode ? "border-slate-800/60 text-slate-400" : "border-slate-100 text-slate-600"}`}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                      {t("fleet.total_cost")}
                    </p>
                    <p
                      className={`font-black text-sm mt-0.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                    >
                      {convertPrice(car.precioCNF)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                      {t("fleet.est_arrival")}
                    </p>
                    <p
                      className={`font-black text-sm mt-0.5 flex items-center gap-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                    >
                      <Calendar size={12} className="text-amber-500" />{" "}
                      {t("fleet.in_days")} {car.diasParaEntrega}{" "}
                      {t("fleet.days")}
                    </p>
                  </div>
                </div>
                <div className="pt-1 flex justify-end">
                  <Link
                    href={`/inventario/${car.vin}`}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition cursor-pointer outline-none active:scale-95 ${isDarkMode ? "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black" : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-500 hover:text-white"}`}
                  >
                    {t("fleet.track")} <Ship size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3
          className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          <CheckCircle2 size={16} className="text-emerald-500" />{" "}
          {t("fleet.history")}
        </h3>

        <div className="space-y-3">
          {historyPurchases.map((car) => (
            <div
              key={car.vin}
              className={`relative overflow-hidden flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isDarkMode ? "bg-[#0b121f]/60 border-slate-800/80 hover:bg-[#1e293b]/40" : "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-md"}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50"></div>
              <div className="w-full md:w-28 h-20 shrink-0">
                <img
                  src={car.fotos[0]}
                  alt={car.modelo}
                  className={`w-full h-full object-cover rounded-xl border ${isDarkMode ? "border-slate-700" : "border-slate-300"}`}
                />
              </div>
              <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4
                    className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {car.modelo}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] font-mono text-slate-500">
                      VIN: {car.vin}
                    </p>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      <CheckCircle2 size={10} />{" "}
                      {t(`states.${car.estadoActual}`)}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-6 sm:px-6 sm:border-x ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                      {t("fleet.final_investment")}
                    </p>
                    <p
                      className={`text-sm font-black mt-0.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {convertPrice(car.precioCNF)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                      {t("fleet.arrival_date")}
                    </p>
                    <p
                      className={`text-sm font-bold mt-0.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      Marzo 2026
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex justify-end w-full sm:w-auto">
                  <Link
                    href={`/inventario/${car.vin}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors border outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b] border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                  >
                    <FileText size={14} /> {t("fleet.dossier")}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {historyPurchases.length === 0 && (
            <div
              className={`text-center py-12 rounded-2xl border border-dashed ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-300 text-slate-400"}`}
            >
              <CheckCircle2 size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm font-bold">{t("fleet.empty_history")}</p>
              <p className="text-xs mt-1">{t("fleet.empty_desc")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
