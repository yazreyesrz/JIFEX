"use client";

import { use, useState, useEffect } from "react";
import { mockVehicles } from "@/data/mockVehicles";
import Sidebar from "@/components/Sidebar";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Ship,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Anchor,
  Info,
  HelpCircle,
  ShieldAlert,
  Clock,
  Check,
  Gauge,
  Fuel,
  Settings2,
  CarFront,
  Palette,
  Users,
  Award,
  DoorOpen,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DetalleVehiculoPage({ params }) {
  const router = useRouter();
  const { t } = useTranslation();
  const unwrappedParams = use(params);

  const vehicle = mockVehicles.find(
    (v) => v.vin.toLowerCase() === unwrappedParams.vin.toLowerCase(),
  );

  const [currentView, setCurrentView] = useState("inventario");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");
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
    if (savedTheme === "dark") setIsDarkMode(true);
    else if (savedTheme === "light") setIsDarkMode(false);

    const savedCurrency = localStorage.getItem("jifex_currency");
    if (savedCurrency) setCurrency(savedCurrency);
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

  const convertPrice = (priceUSDStr) => {
    const numericPrice = parseInt(priceUSDStr.replace(/[^0-9]/g, ""));
    if (currency === "PKR") return `₨ ${(numericPrice * 285).toLocaleString()}`;
    if (currency === "JPY") return `¥ ${(numericPrice * 162).toLocaleString()}`;
    return priceUSDStr;
  };

  const tVal = (value) => {
    if (!value) return "";
    return t(`specValues.${value}`, { defaultValue: value });
  };

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

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === vehicle.fotos.length - 1 ? 0 : prev + 1,
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? vehicle.fotos.length - 1 : prev - 1,
    );

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

  return (
    <div
      className={`min-h-screen pb-20 font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b121f] text-[#f1f5f9]" : "bg-slate-50 text-[#0f172a]"}`}
    >
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setAlertModal={setAlertModal}
        setLogoutModal={setLogoutModal}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
      />

      <div className="md:ml-64">
        <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
          <div className="pt-2">
            <Link
              href="/inventario"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition duration-200 shadow-sm group cursor-pointer outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/80 text-slate-300 hover:bg-[#1e293b]/80 hover:text-amber-500" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-amber-600"}`}
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              <span>{t("vehicle.back")}</span>
            </Link>
          </div>

          <nav className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Link
              href="/inventario"
              className="hover:text-amber-500 transition"
            >
              {t("sidebar.catalog")}
            </Link>
            <span>/</span>
            <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>
              {vehicle.modelo}
            </span>
          </nav>

          {/* HEADER DEL VEHÍCULO */}
          <div
            className={`rounded-3xl border p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl transition-colors duration-300 ${isDarkMode ? "border-slate-800/80 bg-[#1e293b]/40 backdrop-blur-sm" : "bg-white border-slate-200"}`}
          >
            <div>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border ${esVehiculoComprado ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-amber-500 bg-amber-500/10 border-amber-500/20"}`}
              >
                {esVehiculoComprado
                  ? t("vehicle.acquired")
                  : vehicle.version || t("vehicle.standard")}
              </span>
              <h1
                className={`text-3xl md:text-4xl font-black tracking-tight mt-3 ${isDarkMode ? "text-[#f8fafc]" : "text-slate-900"}`}
              >
                {vehicle.modelo}
              </h1>
              <p className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-widest">
                {t("carGrid.chassis")} {vehicle.vin}{" "}
                <span className="mx-2 opacity-50">|</span> Ref:{" "}
                {vehicle.idInterno}
              </p>
            </div>
            <div
              className={`border px-6 py-4 rounded-2xl shadow-inner transition-colors duration-300 w-full md:w-auto ${isDarkMode ? "bg-[#0b121f]/60 border-slate-800" : "bg-slate-50 border-slate-100"}`}
            >
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {t("vehicle.net_cost")}
              </p>
              <p className="text-2xl md:text-3xl font-black text-amber-500 tracking-tight mt-0.5">
                {convertPrice(vehicle.precioCNF)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GALERÍA DE IMÁGENES */}
            <div
              className={`lg:col-span-2 relative rounded-3xl border p-2 shadow-2xl overflow-hidden group transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/30" : "bg-white border-slate-200"}`}
            >
              <div
                className={`relative h-[300px] sm:h-[440px] w-full rounded-2xl overflow-hidden ${isDarkMode ? "bg-[#0b121f]" : "bg-slate-100"}`}
              >
                <img
                  src={vehicle.fotos[currentImageIndex]}
                  alt={`${vehicle.modelo} view`}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <button
                  onClick={prevImage}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-slate-300 hover:text-amber-500 transition shadow-md z-10 cursor-pointer outline-none active:scale-90 ${isDarkMode ? "bg-[#0b121f]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-slate-300 hover:text-amber-500 transition shadow-md z-10 cursor-pointer outline-none active:scale-90 ${isDarkMode ? "bg-[#0b121f]/90 border-slate-800" : "bg-white/90 border-slate-200"}`}
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                  {vehicle.fotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 outline-none ${idx === currentImageIndex ? "w-5 bg-amber-500" : "w-1.5 bg-white/60 hover:bg-white"}`}
                    />
                  ))}
                </div>
                <span
                  className={`absolute bottom-4 right-4 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border shadow-md z-10 ${isDarkMode ? "text-[#f8fafc] bg-[#0b121f] border-slate-800" : "text-slate-700 bg-white border-slate-200"}`}
                >
                  {currentImageIndex + 1} / {vehicle.fotos.length}
                </span>
              </div>
            </div>

            {/* EXPEDIENTE Y CONTACTO */}
            <div className="flex flex-col justify-between space-y-4">
              <div
                className={`rounded-3xl border p-6 md:p-8 space-y-4 shadow-xl flex-1 transition-colors duration-300 ${isDarkMode ? "border-slate-800/60 bg-[#1e293b]/40 backdrop-blur-md" : "bg-white border-slate-200"}`}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-amber-500" />{" "}
                  {t("vehicle.dossier")}
                </h3>
                {[
                  t("vehicle.docs.auction_sheet"),
                  t("vehicle.docs.jaai"),
                  t("vehicle.docs.bl"),
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setAlertModal({
                        open: true,
                        title: doc,
                        message: `Simulación v1.1: Descarga de archivo digital activa en Fase 2.`,
                        iconType: "info",
                      })
                    }
                    className={`w-full flex items-center justify-between rounded-2xl border p-4 text-xs font-bold transition cursor-pointer group outline-none active:scale-95 focus:ring-2 focus:ring-amber-500/30 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800 text-slate-300 hover:bg-[#1e293b]/60 hover:border-slate-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"}`}
                  >
                    <span className="truncate pr-2">{doc}</span>
                    <Download
                      size={14}
                      className="text-slate-400 shrink-0 group-hover:text-amber-500 transition-colors"
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={handleConsultarClick}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 py-4.5 text-sm font-black text-white uppercase tracking-wider shadow-lg shadow-orange-950/40 hover:from-amber-400 hover:to-orange-500 transition cursor-pointer transform outline-none active:scale-[0.98]"
              >
                <MessageSquare size={18} />
                <span>
                  {esVehiculoComprado
                    ? t("vehicle.request_status")
                    : t("vehicle.consult")}
                </span>
              </button>
            </div>
          </div>

          {/* ================= SECCIÓN: ESPECIFICACIONES TÉCNICAS ================= */}
          <div
            className={`rounded-3xl border p-6 md:p-8 shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-lg font-black flex items-center gap-2 mb-6 tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Settings2 className="text-amber-500" size={20} />{" "}
              {t("vehicle.specs_title")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Gauge size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.mileage")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {vehicle.kilometraje}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Fuel size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.fuel")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.combustible)}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Settings2 size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.transmission")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.transmision)}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <CarFront size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.traction")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.traccion || "2WD")}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Palette size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.color")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.colorExterior)}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Award size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.auction_grade")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {vehicle.gradoSubasta}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Users size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.passengers")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.pasajeros || "5 Plazas")}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}
              >
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <DoorOpen size={14} className="text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t("vehicle.doors")}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                >
                  {tVal(vehicle.puertas || "5 Puertas")}
                </span>
              </div>
            </div>
          </div>

          {/* ================= SECCIÓN: TRAZABILIDAD (TRACKING CORREGIDO) ================= */}
          <div
            className={`rounded-3xl border p-6 md:p-8 shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-lg font-black flex items-center gap-2 mb-8 tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Activity className="text-amber-500" size={20} />{" "}
              {t("vehicle.tracking_title")}
            </h3>
            <div className="relative pt-2">
              {/* 🌟 LÍNEA CONECTORA CORREGIDA: Ahora se detiene correctamente antes de los bordes */}
              <div
                className={`absolute left-[19px] top-[20px] bottom-0 w-0.5 md:w-[calc(100%-80px)] md:h-0.5 md:left-[40px] md:top-[20px] md:bottom-auto z-0 ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}
              ></div>

              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
                {Object.keys(vehicle.tracking).map((key, index) => {
                  const step = vehicle.tracking[key];

                  // Lógica limpia para determinar el estado visual del paso
                  const isCompleted = step.completado;
                  const isCurrent =
                    !isCompleted &&
                    index > 0 &&
                    vehicle.tracking[Object.keys(vehicle.tracking)[index - 1]]
                      .completado;
                  const isFirstPending = !isCompleted && index === 0;
                  const active = isCompleted || isCurrent || isFirstPending;

                  // 🌟 COLORES SÓLIDOS CORREGIDOS (Sin opacidades que oculten el texto)
                  let circleStyles = "";
                  if (isCompleted) {
                    circleStyles =
                      "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                  } else if (active) {
                    circleStyles =
                      "bg-[#0f172a] border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]";
                  } else {
                    circleStyles = isDarkMode
                      ? "bg-[#0b121f] border-slate-700 text-slate-500"
                      : "bg-white border-slate-300 text-slate-400";
                  }

                  const icons = [
                    <CheckCircle2 size={16} key="1" />,
                    <FileText size={16} key="2" />,
                    <Ship size={16} key="3" />,
                    <MapPin size={16} key="4" />,
                    <Anchor size={16} key="5" />,
                  ];

                  return (
                    <div
                      key={index}
                      className="flex md:flex-col items-start md:items-center gap-4 md:w-1/5 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500 z-10 ${circleStyles}`}
                      >
                        {icons[index]}
                      </div>
                      <div className="md:text-center mt-1">
                        <p
                          className={`text-[11px] font-bold uppercase tracking-wider ${active ? (isDarkMode ? "text-white" : "text-slate-800") : "text-slate-400"}`}
                        >
                          {t(`states.${step.nombre}`, {
                            defaultValue: step.nombre,
                          })}
                        </p>
                        <p
                          className={`text-[10px] font-mono mt-0.5 ${active ? "text-amber-500 font-bold" : "text-slate-400"}`}
                        >
                          {step.fecha !== "-"
                            ? step.fecha
                            : t("states.Pendiente")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RUTA DE TRÁNSITO MARÍTIMO TRADUCIDA */}
          <div
            className={`rounded-3xl border p-6 md:p-8 space-y-4 shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h2
              className={`text-lg font-black tracking-tight flex items-center gap-2 mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Compass size={20} className="text-amber-500" />{" "}
              {t("vehicle.route_title")}
            </h2>
            <div
              className={`relative h-28 w-full border rounded-2xl overflow-hidden flex items-center justify-between px-10 sm:px-16 transition-colors ${isDarkMode ? "bg-[#0b121f]/80 border-slate-800" : "bg-slate-50 border-slate-200"}`}
            >
              <div className="absolute left-24 right-24 border-t border-dashed border-slate-300/40 top-1/2 -translate-y-1/2 z-0" />
              {vehicle.estadoActual === "En tránsito" && (
                <div className="absolute left-24 w-[55%] border-t-2 border-amber-500 top-1/2 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse" />
              )}
              <div
                className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-xl border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
              >
                <MapPin size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("vehicle.japan")}
                </span>
              </div>
              <div
                className={`relative z-10 flex flex-col items-center border p-2.5 rounded-2xl ${vehicle.estadoActual === "En tránsito" ? "animate-bounce shadow-md" : "opacity-30"} ${isDarkMode ? "bg-[#1e293b] border-slate-700/60" : "bg-white border-slate-200"}`}
              >
                <Ship size={20} className="text-amber-400" />
                <span className="text-[8px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
                  {t("vehicle.in_transit")}
                </span>
              </div>
              <div
                className={`relative z-10 flex flex-col items-center space-y-1 p-2 rounded-xl border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
              >
                <Anchor size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("vehicle.pakistan")}
                </span>
              </div>
            </div>
          </div>

          {/* EQUIPAMIENTO Y DICTAMEN TRADUCIDOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`rounded-3xl border p-6 shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-md font-black uppercase tracking-tight flex items-center gap-2 mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <Check size={16} className="text-amber-500" />{" "}
                {t("vehicle.equipment_title")}
              </h3>
              <div className="flex flex-col gap-3 text-xs font-semibold">
                {[
                  t("vehicle.equipment.led"),
                  t("vehicle.equipment.camera"),
                  t("vehicle.equipment.smart_key"),
                  t("vehicle.equipment.heated_seats"),
                  t("vehicle.equipment.blind_spot"),
                ].map((eq, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800/60 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                  >
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`rounded-3xl border p-6 shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-md font-black uppercase tracking-tight flex items-center gap-2 mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <Info size={16} className="text-amber-500" />{" "}
                {t("vehicle.inspector_title")}
              </h3>
              <div
                className={`p-5 rounded-2xl border text-xs leading-relaxed font-mono ${isDarkMode ? "bg-[#0b121f]/60 border-slate-800/80 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
              >
                <p className="font-bold text-amber-500 mb-3">
                  {t("vehicle.inspector.obs_title")}
                </p>
                <p className="mb-2">{t("vehicle.inspector.obs1")}</p>
                <p className="mb-2">{t("vehicle.inspector.obs2")}</p>
                <p>{t("vehicle.inspector.obs3")}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODALES TRADUCIDOS */}
      {alertModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
          <div
            className={`w-full max-w-sm rounded-3xl border p-7 shadow-2xl text-center space-y-5 transform transition-all duration-300 scale-100 ${isDarkMode ? "border-slate-800 bg-[#111827]" : "border-slate-100 bg-white"}`}
          >
            <div
              className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center border ${alertModal.iconType === "clock" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 animate-pulse" : "bg-amber-500/10 border-amber-500/20 text-amber-500"}`}
            >
              {alertModal.iconType === "clock" ? (
                <Clock size={26} />
              ) : (
                <HelpCircle size={26} />
              )}
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
                setAlertModal({
                  open: false,
                  title: "",
                  message: "",
                  iconType: "info",
                })
              }
              className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-95 shadow-md shadow-amber-500/10"
            >
              {t("modals.understood")}
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
                {t("modals.logout_title")}
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {t("modals.logout_desc")}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setLogoutModal(false)}
                className={`flex-1 rounded-xl border font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none focus:outline-none focus:ring-0 active:scale-95 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"}`}
              >
                {t("modals.cancel")}
              </button>
              <button
                onClick={() => {
                  setLogoutModal(false);
                  router.push("/");
                }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg active:scale-95"
              >
                {t("modals.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
