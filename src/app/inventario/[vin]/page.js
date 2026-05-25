"use client";

import { use, useState, useEffect } from "react";
import { mockVehicles } from "@/data/mockVehicles";
import Sidebar from "@/components/Sidebar";
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Ship,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Compass,
  MapPin,
  Anchor,
  Info,
  HelpCircle,
  ShieldAlert,
  Clock,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DetalleVehiculoPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const vehicle = mockVehicles.find(
    (v) => v.vin.toLowerCase() === unwrappedParams.vin.toLowerCase(),
  );

  const [currentView, setCurrentView] = useState("inventario");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [alertModal, setAlertModal] = useState({
    open: false,
    title: "",
    message: "",
    iconType: "info",
  });
  const [logoutModal, setLogoutModal] = useState(false);

  const compradoMock = mockVehicles[0];
  const esVehiculoComprado =
    vehicle && vehicle.vin.toLowerCase() === compradoMock.vin.toLowerCase();

  useEffect(() => {
    const savedTheme = localStorage.getItem("jifex_theme");
    if (savedTheme === "light") setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("jifex_theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    if (currentView !== "inventario") {
      localStorage.setItem("jifex_target_view", currentView);
      router.push("/inventario");
    }
  }, [currentView, router]);

  if (!vehicle) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"}`}
      >
        <p className="text-md text-red-400 font-bold">
          Vehículo no encontrado.
        </p>
        <Link
          href="/inventario"
          className="text-sm text-amber-500 underline mt-2"
        >
          Regresar al Inventario
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === vehicle.fotos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? vehicle.fotos.length - 1 : prev - 1,
    );
  };

  const handleConsultarClick = () => {
    if (esVehiculoComprado) {
      setAlertModal({
        open: true,
        title: "SOLICITUD DE ESTATUS",
        message: `Tu requerimiento de información para el chasis ${vehicle.vin} ha sido enviado al departamento de logística de JIFEX. Te enviaremos un reporte detallado del contenedor a tu WhatsApp en los próximos 15 minutos.`,
        iconType: "clock",
      });
    } else {
      setAlertModal({
        open: true,
        title: "CONSULTA COMERCIAL",
        message: `Tu asesor comercial de JIFEX ha sido notificado sobre tu interés en adquirir el chasis ${vehicle.vin}. Se pondrá en contacto contigo en breve para enviarte la cotización CNF final.`,
        iconType: "info",
      });
    }
  };

  const getStepStyles = (nombreFase, completado) => {
    if (!completado) {
      return isDarkMode
        ? "bg-[#1e293b]/20 border-slate-800 text-slate-600 opacity-40"
        : "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
    }
    const fase = nombreFase.toLowerCase();
    if (fase.includes("disponible"))
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 font-bold";
    if (fase.includes("exportación"))
      return "bg-amber-500/10 border-amber-500/30 text-amber-500 font-bold";
    if (fase.includes("embarcado"))
      return "bg-blue-500/10 border-blue-500/30 text-blue-500 font-bold";
    if (fase.includes("tránsito"))
      return "bg-indigo-500/10 border-indigo-500/30 text-indigo-500 font-bold shadow-sm";
    return isDarkMode
      ? "bg-slate-500/10 border-slate-500/30 text-slate-300"
      : "bg-slate-100 border-slate-300 text-slate-700";
  };

  return (
    <div
      className={`min-h-screen pb-20 font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-[#f8fafc] text-[#0f172a]"}`}
    >
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setAlertModal={setAlertModal}
        setLogoutModal={setLogoutModal}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
      />

      {/* 🌟 LA MAGIA OCURRE AQUÍ TAMBIÉN */}
      <div className="md:ml-64">
        <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
          <div className="pt-2">
            <Link
              href="/inventario"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-200 shadow-md group cursor-pointer ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/80 text-slate-300 hover:bg-[#1e293b]/80 hover:text-amber-500" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-amber-600"}`}
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              <span>Volver al Inventario</span>
            </Link>
          </div>

          <nav className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Link
              href="/inventario"
              className="hover:text-amber-500 transition"
            >
              Inventario
            </Link>
            <span>/</span>
            <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>
              {vehicle.modelo}
            </span>
          </nav>

          <div
            className={`rounded-2xl border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/40 backdrop-blur-sm" : "bg-white border-slate-200"}`}
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                {esVehiculoComprado
                  ? "ADQUIRIDO por ti"
                  : vehicle.version || "Especificación Estándar"}
              </span>
              <h1
                className={`text-3xl font-black tracking-tight mt-2 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-900"}`}
              >
                {vehicle.modelo}
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Chasis: {vehicle.vin} | Ref: {vehicle.idInterno}
              </p>
            </div>
            <div
              className={`border px-6 py-3.5 rounded-xl shadow-inner transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f]/60 border-slate-800" : "bg-slate-50 border-slate-100"}`}
            >
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Costo Neto CNF Pakistán
              </p>
              <p className="text-2xl font-black text-amber-500 tracking-tight mt-0.5">
                {vehicle.precioCNF}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className={`lg:col-span-2 relative rounded-2xl border p-2 shadow-2xl overflow-hidden group transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
            >
              <div
                className={`relative h-[440px] w-full rounded-xl overflow-hidden ${isDarkMode ? "bg-[#0b121f]" : "bg-slate-100"}`}
              >
                <img
                  src={vehicle.fotos[currentImageIndex]}
                  alt={`${vehicle.modelo} view`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <button
                  onClick={prevImage}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-slate-300 hover:text-amber-500 transition shadow-md z-10 cursor-pointer ${isDarkMode ? "bg-[#0b121f]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-slate-300 hover:text-amber-500 transition shadow-md z-10 cursor-pointer ${isDarkMode ? "bg-[#0b121f]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                  {vehicle.fotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-5 bg-amber-500" : "w-1.5 bg-white/60 hover:bg-white"}`}
                    />
                  ))}
                </div>
                <span
                  className={`absolute bottom-4 right-4 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border shadow-md z-10 ${isDarkMode ? "text-[#f8fafc] bg-[#0b121f] border-slate-800" : "text-slate-700 bg-white border-slate-200"}`}
                >
                  {currentImageIndex + 1} / {vehicle.fotos.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div
                className={`rounded-2xl border p-5 space-y-3 shadow-xl flex-1 transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText size={14} className="text-amber-500" /> Expediente
                  Logístico
                </h3>
                {[
                  "Hoja de Subasta Original",
                  "Certificado Inspección JAAI",
                  "Bill of Lading (B/L)",
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setAlertModal({
                        open: true,
                        title: doc,
                        message: `Simulación v1.0: Descarga de archivo digital. En la Fase 2 abrirá el documento verificado en formato PDF.`,
                        iconType: "info",
                      })
                    }
                    className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-xs font-bold transition cursor-pointer group ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800 text-slate-300 hover:bg-[#1e293b]/60 hover:text-[#f8fafc]" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText
                        size={15}
                        className="text-slate-400 group-hover:text-amber-500"
                      />{" "}
                      {doc}
                    </span>
                    <Download size={14} className="text-slate-400" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleConsultarClick}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 text-sm font-bold text-white shadow-lg shadow-orange-950/40 hover:from-amber-400 hover:to-orange-500 transition cursor-pointer transform active:scale-[0.99]"
              >
                <MessageSquare size={16} />
                <span>
                  {esVehiculoComprado
                    ? "Solicitar Estatus de Envío"
                    : "Consultar este vehículo"}
                </span>
              </button>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sliders size={15} className="text-amber-500" /> Trazabilidad en
              Tiempo Real
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {Object.keys(vehicle.tracking).map((key, index) => {
                const step = vehicle.tracking[key];
                const dynamicStyle = getStepStyles(
                  step.nombre,
                  step.completado,
                );
                return (
                  <div
                    key={index}
                    className={`flex flex-col p-4 rounded-xl border transition-all duration-300 ${dynamicStyle}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold opacity-40">
                        Fase 0{index + 1}
                      </span>
                      {step.completado && (
                        <CheckCircle2 size={14} className="shrink-0" />
                      )}
                    </div>
                    <p className="text-xs font-bold tracking-tight uppercase">
                      {step.nombre}
                    </p>
                    <p className="text-[11px] font-normal opacity-70 mt-1">
                      {step.fecha}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Compass size={15} className="text-amber-500" /> Ruta de Tránsito
              Marítimo Estimada
            </h2>
            <div
              className={`relative h-28 w-full border rounded-xl overflow-hidden flex items-center justify-between px-10 sm:px-16 transition-colors ${isDarkMode ? "bg-[#0b121f]/80 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              <div className="absolute left-24 right-24 border-t border-dashed border-slate-300/40 top-1/2 -translate-y-1/2 z-0" />
              {vehicle.estadoActual === "En tránsito" && (
                <div className="absolute left-24 w-[55%] border-t-2 border-amber-500 top-1/2 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse" />
              )}
              <div
                className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-lg border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
              >
                <MapPin size={15} className="text-slate-400" />
                <span className="text-[10px] font-bold">Japón</span>
              </div>
              <div
                className={`relative z-10 flex flex-col items-center border p-2.5 rounded-xl ${vehicle.estadoActual === "En tránsito" ? "animate-bounce shadow-md" : "opacity-30"} ${isDarkMode ? "bg-[#1e293b] border-slate-700/60" : "bg-white border-slate-200"}`}
              >
                <Ship size={18} className="text-amber-400" />
                <span className="text-[8px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
                  En Tránsito
                </span>
              </div>
              <div
                className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-lg border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
              >
                <Anchor size={15} className="text-slate-400" />
                <span className="text-[10px] font-bold">Pakistán</span>
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Check size={14} className="text-amber-500" /> Equipamiento
              Destacado de Fábrica
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                "Faros LED Inteligentes",
                "Cámara de Reversa 360°",
                "Smart Key / Botón Encendido",
                "Asientos Calefaccionados",
                "Frenado Autónomo de Emergencia",
                "Climatizador Automático",
                "Sensor de Punto Ciego",
                "Conectividad Apple CarPlay",
              ].map((eq, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800/60 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                >
                  <Check size={12} className="text-emerald-500 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info size={14} className="text-amber-500" /> Dictamen del
              Inspector en Subasta Japonesa
            </h3>
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed font-mono ${isDarkMode ? "bg-[#0b121f]/60 border-slate-800/80 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
            >
              <p className="font-bold text-amber-500 mb-1.5">
                // OBSERVACIONES OFICIALES (TRADUCCIÓN DEL JAPONÉS):
              </p>
              <p>
                • Carrocería con pintura original de fábrica en excelentes
                condiciones. Neumáticos con 85% de vida útil restante.
              </p>
              <p>
                • Interior limpio sin quemaduras ni olores de tabaco.
                Salpicadero intacto, sistemas electrónicos escaneados sin
                códigos de error activos.
              </p>
              <p>
                • Motor y transmisión CVT operando con compresión óptima.
                Historial de mantenimientos al día en agencia oficial Apple Miwa
                Japón.
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-6 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
          >
            <div className="border-b border-slate-800/40 pb-3 flex items-center gap-2 text-slate-400">
              <Info size={16} />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Especificaciones de Inspección
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-8 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Kilometraje</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.kilometraje}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Año de Fabricación</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.ano}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">
                  Tracción (Drive Train)
                </p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.traccion || "2WD"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Transmisión</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.transmision}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Combustible</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.combustible}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Color Exterior</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  {vehicle.colorExterior}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Número de Puertas</p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  5 puertas
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">
                  Capacidad Pasajeros
                </p>
                <p
                  className={`font-bold text-sm mt-0.5 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-800"}`}
                >
                  5 Asientos
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Grado de Subasta</p>
                <p className="text-amber-500 font-bold text-sm mt-0.5">
                  {vehicle.gradoSubasta} / 5
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODALES CENTRALES */}
      {alertModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl text-center space-y-4 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-200 bg-white"}`}
          >
            <div
              className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center border ${alertModal.iconType === "clock" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 animate-pulse" : "bg-amber-500/10 border-amber-500/20 text-amber-500"}`}
            >
              {alertModal.iconType === "clock" ? (
                <Clock size={22} />
              ) : (
                <HelpCircle size={22} />
              )}
            </div>
            <div className="space-y-1">
              <h3
                className={`text-md font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}
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
                setAlertModal({
                  open: false,
                  title: "",
                  message: "",
                  iconType: "info",
                })
              }
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl text-center space-y-4 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-200 bg-white"}`}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <ShieldAlert size={22} />
            </div>
            <div className="space-y-1">
              <h3
                className={`text-md font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Cerrar Sesión
              </h3>
              <p
                className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                ¿Estás seguro de que deseas salir del portal de tracking de
                JIFEX?
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setLogoutModal(false)}
                className={`flex-1 rounded-xl border font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setLogoutModal(false);
                  router.push("/");
                }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
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
