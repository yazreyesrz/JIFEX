"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

import {
  Database,
  ListTodo,
  LogOut,
  Sun,
  Moon,
  Ship,
  Users,
  Sliders,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import TicketsManagerView from "@/components/views/manager/TicketsManagerView";
import CatalogoManagerView from "@/components/views/manager/CatalogoManagerView";
import TrackingManagerView from "@/components/views/manager/TrackingManagerView";
import ClientesManagerView from "@/components/views/manager/ClientesManagerView";
import ConfiguracionManagerView from "@/components/views/manager/ConfiguracionManagerView";

export default function ManagerDashboard() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const [currentView, setCurrentView] = useState("tickets");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("jifex_theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
      localStorage.setItem("jifex_theme", "light");
    }

    const savedLanguage = localStorage.getItem("jifex_language");
    if (savedLanguage && i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("jifex_theme", !isDarkMode ? "dark" : "light");
  };

  const handleLogout = () => {
    logout();
  };

  const changeView = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-slate-50 text-[#0f172a]"}`}
    >
      <div
        className={`md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-30 ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-2xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            JIF<span className="text-blue-500">EX</span>
          </span>
          <span className="text-[9px] uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-md font-black">
            Manager
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`p-2 rounded-xl border outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b] border-slate-700 text-white" : "bg-slate-100 border-slate-200 text-slate-800"}`}
        >
          <Menu size={20} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 🌟 AQUÍ ESTÁ LA CORRECCIÓN: md:sticky md:top-0 h-screen overflow-y-auto */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:sticky md:top-0 md:translate-x-0 transition-transform duration-300 ease-in-out border-r shrink-0 flex flex-col justify-between p-5 h-screen overflow-y-auto shadow-2xl md:shadow-none ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <div className="space-y-8">
          <div
            className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
          >
            <div className="flex items-center gap-2 hidden md:flex">
              <span
                className={`text-2xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                JIF<span className="text-blue-500">EX</span>
              </span>
              <span className="text-[9px] uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-md font-black">
                Manager
              </span>
            </div>

            <div className="md:hidden font-black text-lg">Menú Principal</div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`md:hidden p-1.5 rounded-lg border outline-none active:scale-95 ${isDarkMode ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"}`}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => changeView("tickets")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "tickets" ? "bg-blue-500/10 text-blue-500 border-l-4 border-blue-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <ListTodo size={18} /> Help Desk
            </button>
            <button
              onClick={() => changeView("catalogo")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "catalogo" ? "bg-blue-500/10 text-blue-500 border-l-4 border-blue-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Database size={18} /> Catálogo
            </button>
            <button
              onClick={() => changeView("tracking")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "tracking" ? "bg-blue-500/10 text-blue-500 border-l-4 border-blue-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Ship size={18} /> Tracking
            </button>
            <button
              onClick={() => changeView("clientes")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "clientes" ? "bg-blue-500/10 text-blue-500 border-l-4 border-blue-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Users size={18} /> Clientes
            </button>
            <button
              onClick={() => changeView("configuracion")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "configuracion" ? "bg-blue-500/10 text-blue-500 border-l-4 border-blue-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Sliders size={18} /> Ajustes Globales
            </button>
          </nav>
        </div>

        <div
          className={`space-y-4 border-t pt-4 mt-8 md:mt-0 shrink-0 ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
        >
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition duration-200 outline-none active:scale-[0.97] ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800 text-amber-400" : "bg-slate-50 border-slate-200 text-amber-600"}`}
          >
            <span className="flex items-center gap-2">
              {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}{" "}
              {isDarkMode ? "Modo Oscuro" : "Modo Claro"}
            </span>
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide rounded-xl border transition-colors outline-none active:scale-95 ${isDarkMode ? "text-red-400 border-red-900/30 bg-red-500/5 hover:bg-red-500/10" : "text-red-600 border-red-200 bg-red-50 hover:bg-red-100"}`}
          >
            <LogOut size={14} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {currentView === "tickets" && (
          <TicketsManagerView isDarkMode={isDarkMode} />
        )}
        {currentView === "catalogo" && (
          <CatalogoManagerView isDarkMode={isDarkMode} />
        )}
        {currentView === "tracking" && (
          <TrackingManagerView isDarkMode={isDarkMode} />
        )}
        {currentView === "clientes" && (
          <ClientesManagerView isDarkMode={isDarkMode} />
        )}
        {currentView === "configuracion" && (
          <ConfiguracionManagerView isDarkMode={isDarkMode} />
        )}
      </main>
    </div>
  );
}
