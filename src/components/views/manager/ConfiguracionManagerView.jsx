import React, { useState, useEffect } from "react";
import {
  Sliders,
  Save,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Globe,
  AlertCircle,
} from "lucide-react";

export default function ConfiguracionManagerView({ isDarkMode }) {
  // Inicializamos los estados con los valores por defecto del mock o los guardados en localStorage
  const [rates, setRates] = useState({
    jpy: "162",
    pkr: "285",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedJPY = localStorage.getItem("jifex_rate_jpy") || "162";
    const savedPKR = localStorage.getItem("jifex_rate_pkr") || "285";
    setRates({ jpy: savedJPY, pkr: savedPKR });
  }, []);

  const handleChange = (e) => {
    setRates({ ...rates, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos un pequeño retraso de red para que se vea premium (Loader)
    setTimeout(() => {
      localStorage.setItem("jifex_rate_jpy", rates.jpy);
      localStorage.setItem("jifex_rate_pkr", rates.pkr);
      setLoading(false);
      setIsSaved(true);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CABECERA */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Ajustes Globales
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Configuración del sistema y tipos de cambio activos
          </p>
        </div>
      </div>

      {/* TARJETAS DE SPREAD / MERCADO ACTUAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`rounded-3xl border p-5 flex items-center justify-between shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Globe size={12} className="text-blue-500" /> Mercado USD / JPY
            </p>
            <h3
              className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              1 USD = <span className="text-blue-500">{rates.jpy} ¥</span>
            </h3>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <TrendingUp size={10} /> Operando con normalidad
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}
          >
            <span className="font-mono font-black text-sm">¥</span>
          </div>
        </div>

        <div
          className={`rounded-3xl border p-5 flex items-center justify-between shadow-md ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Globe size={12} className="text-emerald-500" /> Mercado USD / PKR
            </p>
            <h3
              className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              1 USD = <span className="text-emerald-500">₨ {rates.pkr}</span>
            </h3>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <TrendingUp size={10} /> Sincronización activa
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}
          >
            <span className="font-mono font-black text-sm">₨</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE TIPOS DE CAMBIO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`lg:col-span-2 rounded-3xl border p-6 md:p-8 shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <h3
            className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <Sliders size={16} className="text-amber-500" /> Control de
            Conversión de Monedas
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                  Valor de 1 USD en Yen Japonés (JPY)
                </label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-slate-400" />
                  </div>
                  <input
                    name="jpy"
                    type="number"
                    value={rates.jpy}
                    onChange={handleChange}
                    placeholder="162"
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs font-black text-slate-400">
                      JPY (¥)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                  Valor de 1 USD en Rupia Pakistaní (PKR)
                </label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign size={14} className="text-slate-400" />
                  </div>
                  <input
                    name="pkr"
                    type="number"
                    value={rates.pkr}
                    onChange={handleChange}
                    placeholder="285"
                    className={`w-full rounded-xl border py-2.5 pl-9 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs font-black text-slate-400">
                      PKR (₨)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AVISO INFORMATIVO */}
            <div
              className={`flex items-start gap-2.5 p-3 rounded-xl border ${isDarkMode ? "bg-blue-500/5 border-blue-500/20 text-slate-400" : "bg-blue-50/50 border-blue-100 text-slate-600"}`}
            >
              <AlertCircle
                size={14}
                className="text-blue-500 shrink-0 mt-0.5"
              />
              <p className="text-[10px] leading-normal font-medium">
                Al guardar estos valores, todos los precios CNF desplegados en
                el portal del Cliente se actualizarán automáticamente
                multiplicando el valor base en USD por el factor indicado aquí.
              </p>
            </div>

            {/* BOTÓN GUARDAR / ESTADOS */}
            <div className="flex justify-end pt-2 items-center gap-4">
              {isSaved && (
                <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 animate-in fade-in duration-200">
                  <CheckCircle2 size={14} /> ¡Tasas actualizadas globalmente!
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] outline-none cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {loading ? "Guardando..." : "Aplicar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Pequeño helper de ícono dinámico para evitar errores de compilación
function CheckCircle2(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
