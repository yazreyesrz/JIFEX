"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, KeyRound, ShieldCheck, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useAuth } from "@/context/AuthContext"; // 🌟 Conectamos con tu sistema de autenticación

export default function LoginPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { login } = useAuth(); // Extraemos la función login del contexto

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    // Forzamos la página para que se lea en inglés al entrar, a menos que el usuario ya haya elegido otro manualmente.
    const savedLanguage = localStorage.getItem("jifex_language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Limpiamos errores previos

    // Llamamos a la función de tu contexto
    const result = login(username, password);

    // Si falla, mostramos el error en pantalla
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-1">
            JIF<span className="text-[#f59e0b]">EX</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {t("login.subtitle")}
          </p>
        </div>

        <div className="mb-8 p-4 rounded-2xl border border-amber-500/20 bg-amber-50/50">
          <p className="text-xs font-bold text-amber-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck size={14} /> {t("login.evaluator_access")}
          </p>
          <div className="space-y-1 font-mono text-[10px] text-amber-600/80">
            <p>• CLIENTE123 : jifex2026</p>
            <p>• MANAGERJIFEX: manager2026</p>
            <p>• ADMINJIFEX : admin2026</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
              {t("login.username")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-slate-100/80 border-none py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                placeholder="CLIENTE123"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
              {t("login.password")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound size={16} className="text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-100/80 border-none py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all tracking-widest"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Mensaje de error dinámico */}
          {error && (
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle size={14} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] outline-none"
          >
            {t("login.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
