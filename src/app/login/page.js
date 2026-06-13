"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/i18n/config";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // 🌟 EXTRAEMOS VARIABLES CRUCIALES DEL CONTEXTO DE AUTENTICACIÓN
  const { login, user, isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. 🌟 SI YA TIENE SESIÓN INICIADA, LO REDIRIGIMOS AUTOMÁTICAMENTE A SU VISTA CORRECTA
  useEffect(() => {
    if (user) {
      if (user.rol === "ADMIN") {
        router.push("/admin");
      } else if (user.rol === "MANAGER") {
        router.push("/manager");
      } else {
        router.push("/inventario");
      }
    }
  }, [user, router]);

  // 2. RECUPERAR EL IDIOMA DEL USUARIO
  useEffect(() => {
    const savedLanguage = localStorage.getItem("jifex_language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage("es"); // Por defecto a español para LATAM/ES
    }
  }, [i18n]);

  // 3. FUNCIÓN DE INICIO DE SESIÓN ASÍNCRONA CONECTADA A LA API
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Esperamos la respuesta real de la base de datos
    const result = await login(username, password);

    if (!result.success) {
      // Si falla, mostramos el error y detenemos el spinner del botón
      setError(
        result.error || "Credenciales incorrectas o usuario no encontrado",
      );
      setIsSubmitting(false);
    }
  };

  // 4. PANTALLA DE CARGA (Para evitar un "destello" del login si ya tiene sesión activa)
  if (isLoading || user) {
    return (
      <div className="min-h-screen bg-[#0b121f] flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b121f] font-sans p-4">
      <div className="w-full max-w-md bg-[#1e293b]/40 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-slate-800">
        {/* CABECERA */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black tracking-tight text-white mb-1">
            JIF<span className="text-amber-500">EX</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {t("login.subtitle", "Plataforma Logística B2B")}
          </p>
        </div>

        {/* TARJETA DE AYUDA PARA EL EVALUADOR */}
        <div className="mb-8 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10">
          <p className="text-xs font-bold text-amber-500 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck size={14} />{" "}
            {t("login.evaluator_access", "Accesos de Prueba")}
          </p>
          <div className="space-y-1.5 font-mono text-[10px] text-amber-500/80">
            <p>• Min : 12345</p>
            <p>• MANAGERJIFEX: manager2026</p>
            <p>• ADMINJIFEX : admin2026</p>
          </div>
        </div>

        {/* FORMULARIO DE ACCESO */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
              {t("login.username", "Usuario (Login ID)")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-[#0b121f]/50 border border-slate-700 py-3.5 pl-11 pr-4 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-slate-600"
                placeholder="CLIENTE123"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
              {t("login.password", "Contraseña")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound size={16} className="text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-[#0b121f]/50 border border-slate-700 py-3.5 pl-11 pr-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-amber-500/50 transition-all tracking-widest placeholder-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* MENSAJE DE ERROR FLOTANTE */}
          {error && (
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={14} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* BOTÓN CON SPINNER DE CARGA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] outline-none disabled:opacity-70 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : null}
            {isSubmitting
              ? t("login.loading", "Verificando...")
              : t("login.submit", "Iniciar Sesión")}
          </button>
        </form>
      </div>
    </div>
  );
}
