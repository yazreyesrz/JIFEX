import React from "react";
import Link from "next/link";
import { Heart, Hourglass, Calendar, Gauge, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CarGrid({
  vehicles,
  isDarkMode,
  favorites,
  toggleFavorite,
  convertPrice,
  sortBy,
}) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((car) => (
        <div
          key={car.vin}
          className={`relative overflow-hidden rounded-2xl border transition duration-300 shadow-lg flex flex-col justify-between group ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40 backdrop-blur-sm hover:border-slate-700" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl"}`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(car.vin);
            }}
            className={`absolute top-4 left-4 z-10 p-2 rounded-full backdrop-blur-md transition-all border cursor-pointer outline-none focus:ring-0 active:scale-90 ${favorites.includes(car.vin) ? "bg-red-500/20 border-red-500/30" : "bg-black/40 border-white/10 hover:bg-black/60"}`}
          >
            <Heart
              size={16}
              className={`${favorites.includes(car.vin) ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </button>

          <div
            className={`relative h-44 w-full ${isDarkMode ? "bg-[#0b121f]" : "bg-slate-100"}`}
          >
            <img
              src={car.fotos[0]}
              alt={car.modelo}
              className="h-full w-full object-cover"
            />
            <span
              className={`absolute top-4 right-4 px-2.5 py-1 text-[9px] font-black rounded-full border uppercase tracking-wider ${car.estadoActual === "Disponible" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-md" : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 backdrop-blur-md"}`}
            >
              {t(`states.${car.estadoActual}`)}
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
                {t("carGrid.chassis")} {car.vin}
              </p>
            </div>

            {sortBy === "cercania" && (
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/10 w-fit">
                <Hourglass size={12} />
                <span>
                  {t("carGrid.arrival")} {car.diasParaEntrega || 25}{" "}
                  {t("carGrid.days")}
                </span>
              </div>
            )}

            <div
              className={`grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl border ${isDarkMode ? "text-slate-400 bg-[#0b121f]/60 border-slate-800/60" : "text-slate-600 bg-slate-50 border-slate-200"}`}
            >
              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                <span>
                  {t("carGrid.year")} {car.ano}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge size={13} className="text-slate-400" />
                <span>{car.kilometraje}</span>
              </div>
            </div>
            <div className="border-t border-slate-800/40 pt-3.5 flex items-center justify-between">
              <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                  {t("carGrid.cost")}
                </p>
                <p className="text-md font-bold text-amber-500 tracking-tight">
                  {convertPrice(car.precioCNF)}
                </p>
              </div>
              <Link
                href={`/inventario/${car.vin}`}
                className={`inline-flex items-center gap-1 rounded-xl border px-3.5 py-2 text-xs font-bold text-amber-500 transition cursor-pointer ${isDarkMode ? "bg-[#0b121f] border-slate-700 hover:bg-amber-500 hover:text-white" : "bg-slate-50 border-slate-200 hover:bg-amber-500 hover:text-white"}`}
              >
                {t("carGrid.details")} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
