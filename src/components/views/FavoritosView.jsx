import React from "react";
import { Heart } from "lucide-react";
import CarGrid from "../shared/CarGrid";
import { mockVehicles } from "@/data/mockVehicles";

export default function FavoritosView({
  isDarkMode,
  favorites,
  toggleFavorite,
  convertPrice,
  setCurrentView,
  compradoMock,
}) {
  // Filtramos solo los favoritos que no sean el auto comprado
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
          <Heart className="text-red-500 fill-red-500/20" size={22} /> Mis
          Vehículos Favoritos
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Unidades que has guardado para seguimiento o futura compra.
        </p>
      </div>

      {favoriteVehicles.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed ${isDarkMode ? "border-slate-800 bg-[#1e293b]/20" : "border-slate-300 bg-slate-50"}`}
        >
          <Heart size={48} className="text-slate-500 mb-4 opacity-50" />
          <p className="text-lg font-bold text-slate-400">
            Aún no tienes favoritos
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Explora el catálogo y guarda los vehículos que te interesen.
          </p>
          <button
            onClick={() => setCurrentView("inventario")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
          >
            Ir al Catálogo
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
