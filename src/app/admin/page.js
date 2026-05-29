"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

import {
  BarChart4,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  Users,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import DashboardAdminView from "@/components/views/admin/DashboardAdminView";
import ClientesAdminView from "@/components/views/admin/ClientesAdminView";

export default function AdminDashboard() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");

  // 🌟 Inicializa en falso (Modo Claro)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }

    // 🌟 Lógica estricta para forzar el modo claro por defecto
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
  }, [i18n, user, router]);

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

  if (!user || user.role !== "admin") return null;

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-slate-50 text-[#0f172a]"}`}
    >
      <div
        className={`md:hidden flex items-center justify-between p-4 border-b sticky top-0 z-30 ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={24} className="text-indigo-500" />
          <span
            className={`text-2xl font-extrabold tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            JIF<span className="text-indigo-500">EX</span>
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

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out border-r shrink-0 flex flex-col justify-between p-5 md:h-screen shadow-2xl md:shadow-none ${isDarkMode ? "bg-[#0f172a] border-[#1e293b]" : "bg-white border-slate-200"}`}
      >
        <div className="space-y-8">
          <div
            className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
          >
            <div className="flex items-center gap-2 hidden md:flex">
              <ShieldCheck size={28} className="text-indigo-500" />
              <div>
                <span
                  className={`text-xl font-extrabold tracking-wider block leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  JIF<span className="text-indigo-500">EX</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                  Admin Portal
                </span>
              </div>
            </div>

            <div className="md:hidden font-black text-lg">Admin Menú</div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`md:hidden p-1.5 rounded-lg border outline-none active:scale-95 ${isDarkMode ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600"}`}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => changeView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "dashboard" ? "bg-indigo-500/10 text-indigo-500 border-l-4 border-indigo-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <BarChart4 size={18} /> Analíticas
            </button>
            <button
              onClick={() => changeView("clientes")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 uppercase tracking-wider outline-none active:scale-[0.97] ${currentView === "clientes" ? "bg-indigo-500/10 text-indigo-500 border-l-4 border-indigo-500" : isDarkMode ? "text-slate-400 hover:bg-[#1e293b]/50 hover:text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Users size={18} /> Directorio B2B
            </button>
          </nav>
        </div>

        <div
          className={`space-y-4 border-t pt-4 mt-8 md:mt-0 ${isDarkMode ? "border-[#1e293b]/60" : "border-slate-200"}`}
        >
          <div className="px-3 pb-2 mb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Logueado como
            </p>
            <p
              className={`text-xs font-black truncate mt-0.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              {user.name}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition duration-200 outline-none active:scale-[0.97] ${isDarkMode ? "bg-[#1e293b]/30 border-slate-800 text-indigo-400" : "bg-slate-50 border-slate-200 text-indigo-600"}`}
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
        {currentView === "dashboard" && (
          <DashboardAdminView isDarkMode={isDarkMode} />
        )}
        {currentView === "clientes" && (
          <ClientesAdminView isDarkMode={isDarkMode} />
        )}
      </main>
    </div>
  );
}
