"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import {
  Coins,
  ChevronDown,
  HelpCircle,
  ShieldAlert,
  Globe,
} from "lucide-react";
import { mockVehicles } from "@/data/mockVehicles";

// 🌟 IMPORTAMOS LA CONFIGURACIÓN DE I18N
import "@/i18n/config";
import { useTranslation } from "react-i18next";

import CatalogoView from "@/components/views/CatalogoView";
import FavoritosView from "@/components/views/FavoritosView";
import ComprasView from "@/components/views/ComprasView";
import TrackingView from "@/components/views/TrackingView";

// Componente Dropdown Exclusivo para la Moneda
const CurrencyDropdown = ({ currency, setCurrency, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "USD ($)", value: "USD" },
    { label: "JPY (¥)", value: "JPY" },
    { label: "PKR (₨)", value: "PKR" },
  ];
  const selectedLabel =
    options.find((o) => o.value === currency)?.label || "USD ($)";

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-amber-500/40 active:scale-95 cursor-pointer ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700/80 hover:border-amber-500/50 text-white" : "bg-white border-slate-200 hover:border-amber-400 text-slate-800"}`}
      >
        <Coins size={14} className="text-amber-500" />
        <span className="text-[11px] font-bold tracking-wider">
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180 text-amber-500" : "text-slate-400"}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-32 rounded-2xl border shadow-2xl overflow-hidden py-1 ${isDarkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-100"}`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setCurrency(opt.value);
                localStorage.setItem("jifex_currency", opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${currency === opt.value ? (isDarkMode ? "bg-amber-500/10 text-amber-500 font-black" : "bg-amber-50 text-amber-600 font-black") : isDarkMode ? "text-slate-300 hover:bg-slate-800/80 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// 🌟 NUEVO: Componente Dropdown Exclusivo para el Idioma
const LanguageDropdown = ({ isDarkMode }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Español (ES)", value: "es" },
    { label: "English (EN)", value: "en" },
    { label: "日本語 (JA)", value: "ja" },
    { label: "한국어 (KO)", value: "ko" },
  ];

  const selectedLabel =
    options.find((o) => o.value === i18n.language)?.label || "Español (ES)";

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("jifex_language", lng);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-95 cursor-pointer ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700/80 hover:border-blue-500/50 text-white" : "bg-white border-slate-200 hover:border-blue-400 text-slate-800"}`}
      >
        <Globe size={14} className="text-blue-500" />
        <span className="text-[11px] font-bold tracking-wider">
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180 text-blue-500" : "text-slate-400"}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-36 rounded-2xl border shadow-2xl overflow-hidden py-1 ${isDarkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-100"}`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleLanguageChange(opt.value)}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${i18n.language === opt.value ? (isDarkMode ? "bg-blue-500/10 text-blue-500 font-black" : "bg-blue-50 text-blue-600 font-black") : isDarkMode ? "text-slate-300 hover:bg-slate-800/80 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function InventarioPage() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [currentView, setCurrentView] = useState("inventario");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("jifex_theme");
    if (savedTheme === "dark") setIsDarkMode(true);
    else if (savedTheme === "light") setIsDarkMode(false);

    setFavorites(JSON.parse(localStorage.getItem("jifex_favorites") || "[]"));
    const savedCurrency = localStorage.getItem("jifex_currency");
    if (savedCurrency) setCurrency(savedCurrency);

    // Recuperar idioma guardado
    const savedLanguage = localStorage.getItem("jifex_language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    const targetView = localStorage.getItem("jifex_target_view");
    if (targetView) {
      setCurrentView(targetView);
      localStorage.removeItem("jifex_target_view");
    }
  }, [i18n]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("jifex_theme", newTheme ? "dark" : "light");
  };

  const toggleFavorite = (vin) => {
    const newFavorites = favorites.includes(vin)
      ? favorites.filter((id) => id !== vin)
      : [...favorites, vin];
    setFavorites(newFavorites);
    localStorage.setItem("jifex_favorites", JSON.stringify(newFavorites));
  };

  const convertPrice = (priceUSDStr) => {
    const numericPrice = parseInt(priceUSDStr.replace(/[^0-9]/g, ""));
    if (currency === "PKR") return `₨ ${(numericPrice * 285).toLocaleString()}`;
    if (currency === "JPY") return `¥ ${(numericPrice * 162).toLocaleString()}`;
    return priceUSDStr;
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-slate-50 text-[#0f172a]"}`}
    >
      <Sidebar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === "inventario") setSelectedBrand(null);
        }}
        setAlertModal={setAlertModal}
        setLogoutModal={setLogoutModal}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
      />

      <div className="md:ml-64 flex-1 w-full">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* HEADER GLOBAL CON SELECTORES */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-end mb-4 gap-3 relative z-40">
            <LanguageDropdown isDarkMode={isDarkMode} />
            <CurrencyDropdown
              currency={currency}
              setCurrency={setCurrency}
              isDarkMode={isDarkMode}
            />
          </div>

          {currentView === "inventario" && (
            <CatalogoView
              isDarkMode={isDarkMode}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              convertPrice={convertPrice}
              compradoMock={mockVehicles[0]}
            />
          )}
          {currentView === "favoritos" && (
            <FavoritosView
              isDarkMode={isDarkMode}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              convertPrice={convertPrice}
              setCurrentView={setCurrentView}
              compradoMock={mockVehicles[0]}
            />
          )}
          {currentView === "compras" && (
            <ComprasView
              isDarkMode={isDarkMode}
              compradoMock={mockVehicles[0]}
              convertPrice={convertPrice}
            />
          )}
          {currentView === "tracking" && (
            <TrackingView isDarkMode={isDarkMode} />
          )}
        </main>
      </div>

      {alertModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
          <div
            className={`w-full max-w-sm rounded-3xl border p-7 shadow-2xl text-center space-y-5 transform transition-all duration-300 scale-100 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-100 bg-white"}`}
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <HelpCircle size={26} />
            </div>
            <div className="space-y-1.5">
              <h3
                className={`text-lg font-black uppercase tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
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
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-95 shadow-md shadow-amber-500/10"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
          <div
            className={`w-full max-w-sm rounded-3xl border p-7 shadow-2xl text-center space-y-5 transform transition-all duration-300 scale-100 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-100 bg-white"}`}
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <ShieldAlert size={26} />
            </div>
            <div className="space-y-1.5">
              <h3
                className={`text-lg font-black uppercase tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Cerrar Sesión
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                ¿Estás seguro de que deseas salir del portal de JIFEX?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setLogoutModal(false)}
                className={`flex-1 rounded-xl border font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-95 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setLogoutModal(false);
                  router.push("/");
                }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg active:scale-95"
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
