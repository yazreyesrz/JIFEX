import React from "react";
import {
  Ship,
  Compass,
  MapPin,
  Anchor,
  Gauge,
  Hourglass,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TrackingView({ isDarkMode }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div
        className={`border-b pb-3 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <h2
          className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <Ship className="text-amber-500" size={22} /> {t("tracking.title")}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t("tracking.subtitle")}</p>
      </div>

      <div
        className={`rounded-2xl border p-6 space-y-4 shadow-xl ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "border-slate-200 bg-white"}`}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Compass size={14} className="text-amber-500" />{" "}
          {t("tracking.coordinates")}: Buque JFX-Carrier I
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
              {t("tracking.japan")}
            </span>
          </div>
          <div
            className={`relative z-10 flex flex-col items-center border p-2.5 rounded-xl animate-bounce shadow-md ${isDarkMode ? "bg-[#1e293b] border-slate-700/60" : "bg-white border-slate-200"}`}
          >
            <Ship size={18} className="text-amber-400" />
            <span className="text-[8px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
              {t("tracking.in_transit")}
            </span>
          </div>
          <div
            className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-lg border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
          >
            <Anchor size={15} className="text-slate-400" />
            <span
              className={`text-[10px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}
            >
              {t("tracking.pakistan")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
        >
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Compass size={14} className="text-amber-500" />{" "}
            {t("tracking.telemetry")}
          </h4>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">{t("tracking.coords")}</span>
              <span className="font-mono font-bold text-amber-500">
                22.41° N, 70.18° E
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">{t("tracking.speed")}</span>
              <span className="font-bold flex items-center gap-1">
                <Gauge size={12} className="text-slate-400" /> 15.4 knots
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t("tracking.time_left")}</span>
              <span className="font-bold flex items-center gap-1">
                <Hourglass size={12} className="text-slate-400" /> ~5{" "}
                {t("fleet.days")}
              </span>
            </div>
          </div>
        </div>
        <div
          className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
        >
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Ship size={14} className="text-amber-500" />{" "}
            {t("tracking.vessel_data")}
          </h4>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">
                {t("tracking.vessel_name")}
              </span>
              <span
                className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
              >
                MV JFX Pioneer III
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">
                {t("tracking.shipping_line")}
              </span>
              <span
                className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
              >
                Ocean Network (ONE)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">
                {t("tracking.fleet_units")}
              </span>
              <span className="font-bold text-amber-500">14</span>
            </div>
          </div>
        </div>
        <div
          className={`rounded-2xl border p-5 space-y-3 shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
        >
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Anchor size={14} className="text-amber-500" />{" "}
            {t("tracking.destination")}
          </h4>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">
                {t("tracking.port_arrival")}
              </span>
              <span
                className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
              >
                Karachi Port
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
              <span className="text-slate-400">{t("tracking.eta")}</span>
              <span
                className={`font-bold flex items-center gap-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
              >
                <Calendar size={12} className="text-slate-400" /> 30/05/2026
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t("tracking.conditions")}</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                OK
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl border p-6 space-y-4 shadow-xl overflow-hidden ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "bg-white border-slate-200"}`}
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          {t("tracking.log")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap min-w-full">
            <thead>
              <tr
                className={`border-b font-bold text-slate-400 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
              >
                <th className="pb-3 px-2 font-mono">
                  {t("tracking.date_time")}
                </th>
                <th className="pb-3 px-2">{t("tracking.location")}</th>
                <th className="pb-3 px-2">{t("tracking.event")}</th>
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
                <td className="py-3 px-2 text-amber-500">Control OK</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                  18/05/2026 14:00
                </td>
                <td className="py-3 px-2 text-slate-400">Singapore Port</td>
                <td className="py-3 px-2 text-slate-400">Zarpado (Departed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
