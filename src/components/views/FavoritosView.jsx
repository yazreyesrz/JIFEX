import React from "react";
import { Heart } from "lucide-react";
import CarGrid from "../shared/CarGrid";
import { mockVehicles } from "@/data/mockVehicles";
import { useTranslation } from "react-i18next";

export default function FavoritosView({
  isDarkMode,
  favorites,
  toggleFavorite,
  convertPrice,
  setCurrentView,
  compradoMock,
}) {
  const { t } = useTranslation();
  const favoriteVehicles = mockVehicles.filter(
    (car) => favorites.includes(car.vin) && car.vin !== compradoMock.vin,
  );

  return (
    <div className="space-y-6">
      <div
        className={`border-b pb-3 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <h2
          className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
        >
          <Heart className="text-red-500 fill-red-500/20" size={22} />{" "}
          {t("favorites.title")}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{t("favorites.subtitle")}</p>
      </div>

      {favoriteVehicles.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed ${isDarkMode ? "border-slate-800 bg-[#1e293b]/20" : "border-slate-300 bg-slate-50"}`}
        >
          <Heart size={48} className="text-slate-500 mb-4 opacity-50" />
          <p className="text-lg font-bold text-slate-400">
            {t("favorites.empty_title")}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {t("favorites.empty_subtitle")}
          </p>
          <button
            onClick={() => setCurrentView("inventario")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer outline-none active:scale-95"
          >
            {t("favorites.go_catalog")}
          </button>
        </div>
      ) : (
        <CarGrid
          vehicles={favoriteVehicles}
          isDarkMode={isDarkMode}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          convertPrice={convertPrice}
          sortBy="default"
        />
      )}
    </div>
  );
}
