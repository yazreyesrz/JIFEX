import React, { useState } from "react";
import {
  Navigation,
  Calendar,
  ArrowLeft,
  MapPin,
  Anchor,
  Compass,
  Ship,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function TrackingView({ isDarkMode, vehicles = [] }) {
  const [selectedCar, setSelectedCar] = useState(null);

  // 🌟 NO filtramos nada extra aquí, mostramos los que el manager asignó
  const misAutos = vehicles || [];

  // 🌟 HELPER ACTUALIZADO A ENUMS DE POSTGRESQL PARA LOS COLORES
  const getBadgeColor = (estado) => {
    if (!estado) return "bg-emerald-500/10 text-emerald-500";
    if (estado === "EN_EXPORTACION") return "bg-indigo-500/10 text-indigo-400";
    if (estado === "EMBARCADO") return "bg-blue-500/10 text-blue-500";
    if (estado === "EN_TRANSITO") return "bg-amber-500/10 text-amber-500";
    if (estado === "ENTREGADO") return "bg-emerald-500/10 text-emerald-500";
    return "bg-slate-500/10 text-slate-500";
  };

  const getEstimatedDays = (estado) => {
    if (!estado) return "25";
    if (estado === "EN_EXPORTACION") return "22";
    if (estado === "EMBARCADO") return "15";
    if (estado === "EN_TRANSITO") return "7";
    if (estado === "ENTREGADO") return "0";
    return "25";
  };

  const getShipPosition = (estado) => {
    if (!estado) return "15%";
    if (estado === "EN_EXPORTACION") return "25%";
    if (estado === "EMBARCADO") return "50%";
    if (estado === "EN_TRANSITO") return "75%";
    if (estado === "ENTREGADO") return "100%";
    return "15%";
  };

  // 🌟 FUNCIÓN PARA QUE EL TEXTO SEA LEGIBLE ("EN_TRANSITO" -> "EN TRANSITO")
  const formatEstado = (estado) => {
    if (!estado) return "DISPONIBLE";
    return estado.replace("_", " ");
  };

  if (!selectedCar) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div
          className={`pb-6 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <h1
            className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
          >
            <Navigation className="text-blue-500" size={28} />
            Selecciona un Vehículo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Elige una de tus importaciones en curso para ver su telemetría.
          </p>
        </div>

        {misAutos.length === 0 ? (
          <div
            className={`p-16 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center ${isDarkMode ? "border-slate-800 bg-[#1e293b]/10" : "border-slate-300 bg-slate-50"}`}
          >
            <Ship size={48} className="text-slate-400 mb-4 opacity-50" />
            <p
              className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              No hay vehículos en tránsito
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Tus vehículos aparecerán aquí una vez que inicie su proceso de
              exportación.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {misAutos.map((car) => (
              <div
                key={car.vin}
                className={`flex flex-col sm:flex-row rounded-[2rem] border p-4 gap-5 shadow-sm transition-all duration-300 hover:shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
              >
                {/* Imagen */}
                <div className="w-full sm:w-40 h-32 shrink-0 rounded-[1.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={
                      car.fotos?.[0] ||
                      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop"
                    }
                    alt={car.modelo}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3
                        className={`text-xl font-black leading-tight ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
                      >
                        {car.modelo}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getBadgeColor(car.estadoActual)}`}
                      >
                        {formatEstado(car.estadoActual)}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-wider">
                      VIN: {car.vin}
                    </p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                        Llegada Est.
                      </p>
                      <p
                        className={`text-sm font-black flex items-center gap-1.5 ${isDarkMode ? "text-amber-500" : "text-amber-600"}`}
                      >
                        <Calendar size={14} /> En{" "}
                        {car.tracking?.tiempoRestante ||
                          `${getEstimatedDays(car.estadoActual)} días`}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCar(car)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 text-xs font-black uppercase tracking-wider transition-colors outline-none active:scale-95 cursor-pointer ${isDarkMode ? "border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-slate-900" : "border-amber-400 text-amber-500 hover:bg-amber-50 hover:border-amber-500"}`}
                    >
                      Rastrear <Navigation size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 🌟 EXTRAEMOS LOS DATOS REALES DE LA BASE DE DATOS
  const trackData = selectedCar.tracking || {};

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500 pb-10">
      <div
        className={`flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
          >
            <Ship className="text-amber-500" size={28} />
            Posicionamiento Logístico
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Ubicación de buques de carga en alta mar.
          </p>
        </div>
        <button
          onClick={() => setSelectedCar(null)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors outline-none active:scale-95 cursor-pointer ${isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
        >
          <ArrowLeft size={16} /> Volver a la Lista
        </button>
      </div>

      <div
        className={`rounded-3xl border p-8 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-8 flex items-center gap-2">
          <Compass size={14} /> Coordenadas Estimadas: {selectedCar.modelo}
        </p>

        <div className="relative px-4 sm:px-12 py-4">
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />

          <div
            className="absolute left-10 top-1/2 -translate-y-1/2 border-t-2 border-amber-400 transition-all duration-1000 ease-out"
            style={{
              width: `calc(${getShipPosition(selectedCar.estadoActual)} - 2.5rem)`,
            }}
          />

          <div className="flex justify-between items-center relative z-10">
            <div
              className={`flex flex-col items-center p-3 rounded-2xl border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
            >
              <MapPin size={20} className="text-slate-400 mb-1" />
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Japón
              </span>
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out flex flex-col items-center"
              style={{
                left: getShipPosition(selectedCar.estadoActual),
                transform: "translateX(-50%)",
              }}
            >
              <div className="bg-white dark:bg-[#1e293b] border border-amber-400 rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center animate-bounce">
                <Ship size={24} className="text-amber-500 mb-1" />
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest whitespace-nowrap">
                  {formatEstado(selectedCar.estadoActual)}
                </span>
              </div>
            </div>

            <div
              className={`flex flex-col items-center p-3 rounded-2xl border ${isDarkMode ? "bg-[#0b121f] border-slate-800" : "bg-white border-slate-200"}`}
            >
              <Anchor size={20} className="text-slate-400 mb-1" />
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Pakistán
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`rounded-3xl border p-6 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-5 flex items-center gap-2">
            <Compass size={14} /> Telemetría de Ruta
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">Coordenadas:</span>
              <span
                className={`text-xs font-bold font-mono ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {trackData.coordenadas || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">Velocidad:</span>
              <span
                className={`text-xs font-bold font-mono flex items-center gap-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                <Clock size={12} /> {trackData.velocidad || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="text-xs text-slate-500">Tiempo Restante:</span>
              <span
                className={`text-xs font-bold font-mono flex items-center gap-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {trackData.tiempoRestante ||
                  `~${getEstimatedDays(selectedCar.estadoActual)} días`}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-3xl border p-6 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-5 flex items-center gap-2">
            <Ship size={14} /> Datos del Buque
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">Nombre Oficial:</span>
              <span
                className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {trackData.nombreBarco || "No Asignado"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">Línea Naviera:</span>
              <span
                className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {trackData.lineaNaviera || "No Asignada"}
              </span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="text-xs text-slate-500">Unidades de Flota:</span>
              <span className="text-xs font-black text-amber-500">
                {trackData.unidades || "-"}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-3xl border p-6 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-5 flex items-center gap-2">
            <Anchor size={14} /> Puerto de Destino
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">Puerto de Arribo:</span>
              <span
                className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {trackData.puertoDestino || "No Asignado"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 dark:border-slate-800">
              <span className="text-xs text-slate-500">ETA Oficial:</span>
              <span
                className={`text-xs font-bold font-mono flex items-center gap-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                <Calendar size={12} /> {trackData.eta || "Por Confirmar"}
              </span>
            </div>
            <div className="flex justify-between items-center pb-1">
              <span className="text-xs text-slate-500">Condiciones:</span>
              <span className="text-xs font-black text-emerald-500">
                {trackData.condiciones || "Pendiente"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <div
          className={`px-6 py-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
            Registro de Movimiento Global
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead
              className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? "text-slate-500 border-slate-800 bg-[#0b121f]/50" : "text-slate-400 border-slate-200 bg-slate-50"} border-b`}
            >
              <tr>
                <th className="px-6 py-4">Fecha / Hora</th>
                <th className="px-6 py-4">Ubicación</th>
                <th className="px-6 py-4">Evento Logístico</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
            >
              {trackData.logs?.length > 0 ? (
                trackData.logs.map((log) => (
                  <tr
                    key={log.id}
                    className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                  >
                    <td
                      className={`px-6 py-4 font-mono text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                    >
                      {log.fechaHora}
                    </td>
                    <td
                      className={`px-6 py-4 font-bold text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {log.ubicacion}
                    </td>
                    <td
                      className={`px-6 py-4 font-bold text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                    >
                      {log.evento}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-8 text-center text-xs font-bold uppercase tracking-wider text-slate-400"
                  >
                    Aún no hay registros en la bitácora logística
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
