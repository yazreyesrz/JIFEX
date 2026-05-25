"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  KeyRound,
  User,
  AlertCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { login } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("jifex_theme");
    if (savedTheme === "light") setIsDarkMode(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
      }
    }, 800); // Ligeramente más tiempo para una sensación de procesamiento más "pesada" y profesional
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 transition-colors duration-500 ${
        isDarkMode ? "bg-[#020617]" : "bg-slate-100"
      }`}
    >
      {/* Contenedor con Glow sutil */}
      <div
        className={`w-full max-w-md space-y-8 rounded-3xl border p-10 shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)] transition-all duration-500 ${
          isDarkMode
            ? "border-slate-800 bg-[#0b121f]/80 backdrop-blur-xl"
            : "border-slate-200 bg-white shadow-xl"
        }`}
      >
        <div className="text-center space-y-1">
          <h1
            className={`text-5xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            JIF<span className="text-amber-500">EX</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Plataforma de Inventario
          </p>
        </div>

        {/* Guía visual refinada */}
        <div
          className={`rounded-2xl border p-4 text-xs space-y-3 ${
            isDarkMode
              ? "bg-slate-900/50 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <p className="font-bold flex items-center gap-2 text-amber-500/80">
            <ShieldCheck size={14} /> Acceso Evaluador
          </p>
          <div className="grid grid-cols-1 gap-2 font-mono text-[10px] opacity-70">
            <p>
              • <span className="text-amber-500">CLIENTE123</span> / jifex2026
            </p>
            <p>
              • <span className="text-amber-500">ADMINJIFEX</span> / admin2026
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${
                isDarkMode
                  ? "bg-red-950/20 border-red-900/50 text-red-400"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
              Usuario
            </label>
            <div className="relative group">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors"
                size={16}
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu ID"
                disabled={isLoading}
                className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-amber-500/20 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-950 text-white placeholder-slate-700 focus:border-amber-500"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-amber-500"
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <KeyRound
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors"
                size={16}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className={`w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:scale-[1.01] focus:ring-2 focus:ring-amber-500/20 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-950 text-white placeholder-slate-700 focus:border-amber-500"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-amber-500"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3.5 text-sm font-black text-black transition-all hover:bg-amber-400 disabled:opacity-50 shadow-[0_4px_20px_-5px_rgba(245,158,11,0.4)]"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              "ACCEDER A JIFEX"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
