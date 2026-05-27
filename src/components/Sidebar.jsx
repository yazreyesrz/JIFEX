"use client";

import React, { useState } from "react";
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

  const buttonClasses = (isActive) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 uppercase tracking-wider text-left cursor-pointer ${
      isActive
        ? "bg-[#1e293b] text-[#f59e0b] shadow-md border-l-4 border-[#f59e0b]"
        : isDarkMode
          ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {/* CABECERA PARA MÓVIL */}
      <div
        className={`md:hidden flex items-center justify-between border-b px-4 py-4 sticky top-0 z-50 transition-colors ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <button
          onClick={() => setCurrentView("inventario")}
          className="flex items-center gap-2"
        >
          <span
            className={`text-xl font-bold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            JIF<span className="text-[#f59e0b]">EX</span>
          </span>
        </button>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-slate-400 hover:text-white focus:outline-none p-1 rounded-lg"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* PANEL LATERAL SIDEBAR */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r flex flex-col justify-between p-5 transform transition-transform duration-300 md:translate-x-0 ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
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
              className="flex items-center gap-2 text-left"
            >
              <span
                className={`text-2xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                JIF<span className="text-[#f59e0b]">EX</span>
              </span>
              <span className="text-[9px] uppercase bg-[#1e293b] text-slate-400 px-2 py-0.5 rounded-md font-mono">
                v1.0
              </span>
            </button>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setCurrentView("inventario");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "inventario")}
            >
              <Car size={18} className="shrink-0" />
              <span>Catálogo</span>
            </button>

            {/* 🌟 NUEVO BOTÓN DE FAVORITOS */}
            <button
              onClick={() => {
                setCurrentView("favoritos");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "favoritos")}
            >
              <Heart size={18} className="shrink-0" />
              <span>Favoritos</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("compras");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "compras")}
            >
              <Briefcase size={18} className="shrink-0" />
              <span>Mis Compras</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("tracking");
                setIsMobileOpen(false);
              }}
              className={buttonClasses(currentView === "tracking")}
            >
              <Ship size={18} className="shrink-0" />
              <span>Tracking</span>
            </button>
          </nav>
        </div>

        <div
          className={`space-y-4 border-t pt-4 relative ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
        >
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition duration-200 cursor-pointer ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800 text-amber-400 hover:bg-[#1e293b]/60" : "bg-slate-50 border-slate-200 text-amber-600 hover:bg-slate-100"}`}
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
              <span>{isDarkMode ? "Modo Oscuro" : "Modo Claro"}</span>
            </span>
            <span className="text-[9px] text-slate-400 font-mono">Cambiar</span>
          </button>

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/80" : "bg-slate-50 border-slate-200"}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0"></div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
              Modo Evaluador
            </span>
          </div>

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
                onClick={() =>
                  setAlertModal({
                    open: true,
                    title: "Configuración de Cuenta",
                    message:
                      "Área protegida en v1.0. Gestiona tus datos desde aquí en la Fase 2.",
                  })
                }
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-left cursor-pointer ${isDarkMode ? "text-slate-300 hover:bg-[#1e293b] hover:text-[#f59e0b]" : "text-slate-600 hover:bg-slate-50 hover:text-amber-600"}`}
              >
                <User size={14} /> Ver mi cuenta
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsProfileOpen(false);
                  setLogoutModal(true);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide border-t mt-1 transition-colors text-left cursor-pointer ${isDarkMode ? "text-red-400 hover:bg-red-950/20 border-[#1e293b]" : "text-red-600 hover:bg-red-50 border-slate-100"}`}
              >
                <LogOut size={14} /> Cerrar sesión
              </button>
            </div>
          )}

          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center justify-between p-2 rounded-xl border transition duration-200 text-left focus:outline-none cursor-pointer ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800/80 hover:bg-[#1e293b]/60" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#f59e0b] text-[#0f172a] font-black flex items-center justify-center text-sm shadow-md">
                U
              </div>
              <div className="leading-tight">
                <p
                  className={`text-xs font-bold tracking-wide ${isDarkMode ? "text-white" : "text-slate-800"}`}
                >
                  Mi Cuenta
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Opciones
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
