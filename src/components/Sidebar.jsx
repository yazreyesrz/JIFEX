"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Car,
  Briefcase,
  Ship,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Heart,
  LayoutGrid,
} from "lucide-react";

export default function Sidebar({
  currentView,
  setCurrentView,
  setAlertModal,
  setLogoutModal,
  isDarkMode,
  setIsDarkMode,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 🌟 Inicializamos el hook de traducción
  const { t } = useTranslation();

  const buttonClasses = (isActive) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider text-left cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-[0.97] ${
      isActive
        ? "bg-[#1e293b] text-[#f59e0b] shadow-md border-l-4 border-[#f59e0b]"
        : isDarkMode
          ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white focus:bg-[#1e293b]/50"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100"
    }`;

  return (
    <>
      <div
        className={`md:hidden flex items-center justify-between border-b px-4 py-4 sticky top-0 z-50 transition-colors ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <button
          onClick={() => setCurrentView("inventario")}
          className="flex items-center gap-2 outline-none focus:outline-none focus:ring-0"
        >
          <span
            className={`text-xl font-bold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            JIF<span className="text-[#f59e0b]">EX</span>
          </span>
        </button>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-slate-400 hover:text-white focus:outline-none focus:ring-0 p-1 rounded-lg transition-colors active:scale-95"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r flex flex-col justify-between p-5 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="space-y-8">
          <div
            className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
          >
            <button
              onClick={() => {
                setCurrentView("inventario");
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-2 text-left outline-none focus:outline-none focus:ring-0 active:scale-95 transition-transform"
            >
              <span
                className={`text-2xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                JIF<span className="text-[#f59e0b]">EX</span>
              </span>
              <span className="text-[9px] uppercase bg-[#1e293b] text-slate-400 px-2 py-0.5 rounded-md font-mono">
                v1.1
              </span>
            </button>
          </div>

          <nav className="space-y-1.5">
            {/* 🌟 Usamos t('sidebar.llave') para inyectar el texto en el idioma correcto */}
            <button
              onClick={() => {
                setCurrentView("inventario");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "inventario")}
            >
              <LayoutGrid size={18} className="shrink-0" />
              <span>{t("sidebar.catalog")}</span>
            </button>
            <button
              onClick={() => {
                setCurrentView("favoritos");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "favoritos")}
            >
              <Heart size={18} className="shrink-0" />
              <span>{t("sidebar.favorites")}</span>
            </button>
            <button
              onClick={() => {
                setCurrentView("compras");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "compras")}
            >
              <Briefcase size={18} className="shrink-0" />
              <span>{t("sidebar.fleet")}</span>
            </button>
            <button
              onClick={() => {
                setCurrentView("tracking");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "tracking")}
            >
              <Ship size={18} className="shrink-0" />
              <span>{t("sidebar.tracking")}</span>
            </button>
          </nav>
        </div>

        <div
          className={`space-y-4 border-t pt-4 relative ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
        >
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition duration-200 cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-[0.97] ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800 text-amber-400 hover:bg-[#1e293b]/60" : "bg-slate-50 border-slate-200 text-amber-600 hover:bg-slate-100"}`}
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
              <span>
                {isDarkMode ? t("sidebar.dark_mode") : t("sidebar.light_mode")}
              </span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">
              {t("sidebar.change")}
            </span>
          </button>

          {isProfileOpen && (
            <div
              className={`absolute bottom-28 left-0 right-0 rounded-xl shadow-2xl py-1.5 border z-50 ${isDarkMode ? "bg-[#111827] border-[#1e293b]" : "bg-white border-slate-200"}`}
            >
              <div
                className={`px-4 py-2 border-b mb-1 ${isDarkMode ? "border-[#1e293b]" : "border-slate-100"}`}
              >
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Cliente Asignado
                </p>
                <p
                  className={`text-xs font-semibold truncate font-mono ${isDarkMode ? "text-white" : "text-slate-800"}`}
                >
                  usuario@jifex.com
                </p>
              </div>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-left cursor-pointer outline-none active:bg-slate-500/10 ${isDarkMode ? "text-slate-300 hover:bg-[#1e293b] hover:text-[#f59e0b]" : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"}`}
              >
                <User size={14} /> {t("sidebar.account")}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsProfileOpen(false);
                  setLogoutModal(true);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-t mt-1 transition-colors text-left cursor-pointer outline-none active:scale-95 ${isDarkMode ? "text-red-400 hover:bg-red-950/20 border-[#1e293b]" : "text-red-600 hover:bg-red-50 border-slate-100"}`}
              >
                <LogOut size={14} /> {t("sidebar.logout")}
              </button>
            </div>
          )}

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center justify-between p-2 rounded-xl border transition duration-200 text-left cursor-pointer active:scale-[0.97] outline-none ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800/80 hover:bg-[#1e293b]/60" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#f59e0b] text-[#0f172a] font-black flex items-center justify-center text-sm shadow-md">
                U
              </div>
              <div className="leading-tight">
                <p
                  className={`text-xs font-bold tracking-wide ${isDarkMode ? "text-white" : "text-slate-800"}`}
                >
                  {t("sidebar.account")}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {t("sidebar.options")}
                </p>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
