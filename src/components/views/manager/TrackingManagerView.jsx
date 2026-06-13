"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Ship,
  Compass,
  MapPin,
  Anchor,
  Gauge,
  Calendar,
  Navigation,
  ArrowLeft,
  Plus,
  Save,
  CarFront,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Activity, // 🌟 Importado para el icono del nuevo menú
} from "lucide-react";

export default function TrackingManagerView({ isDarkMode }) {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // 🌟 AÑADIDO: estadoActual al trackingData para controlarlo dinámicamente
  const [trackingData, setTrackingData] = useState({
    estadoActual: "DISPONIBLE",
    coordenadas: "",
    velocidad: "",
    tiempoRestante: "",
    nombreBarco: "",
    lineaNaviera: "",
    unidades: "",
    puertoDestino: "",
    eta: "",
    condiciones: "OK",
    logs: [],
  });

  const [newLog, setNewLog] = useState({
    fechaHora: "",
    ubicacion: "",
    evento: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(
      () => setToast({ visible: false, message: "", type: "success" }),
      4000,
    );
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehiculos");
        if (res.ok) {
          const data = await res.json();
          setVehicles(data);
        }
      } catch (error) {
        console.error("Error al cargar los vehículos de tracking:", error);
        showToast("Error al cargar los vehículos", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(
    (car) =>
      car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedVehicles = filteredVehicles.reduce((acc, car) => {
    const brand = car.marca || car.modelo.split(" ")[0] || "Otras Marcas";
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(car);
    return acc;
  }, {});

  const handleEditTracking = (car) => {
    setSelectedCar(car);

    // 🌟 LÓGICA: Leemos de la base de datos o ponemos valores por defecto
    const estadoReal = car.estadoActual || "DISPONIBLE";

    if (car.tracking) {
      setTrackingData({
        ...car.tracking,
        estadoActual: estadoReal,
      });
    } else {
      const isTransit =
        estadoReal === "EN_TRANSITO" || estadoReal === "EMBARCADO";
      setTrackingData({
        estadoActual: estadoReal,
        coordenadas: isTransit ? "22.41° N, 70.18° E" : "",
        velocidad: isTransit ? "15.4 knots" : "",
        tiempoRestante: isTransit ? "~5 días" : "",
        nombreBarco: "MV JFX Pioneer III",
        lineaNaviera: "Ocean Network (ONE)",
        unidades: "14",
        puertoDestino: "Karachi Port",
        eta: "2026-05-30",
        condiciones: "OK",
        logs: isTransit
          ? [
              {
                id: 1,
                fechaHora: "25/05/2026 09:30",
                ubicacion: "Mar de Arabia",
                evento: "Control OK",
              },
              {
                id: 2,
                fechaHora: "18/05/2026 14:00",
                ubicacion: "Singapore Port",
                evento: "Zarpado (Departed)",
              },
            ]
          : [],
      });
    }
  };

  const handleTrackingChange = (e) => {
    setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
  };

  const handleAddLog = () => {
    if (!newLog.fechaHora || !newLog.ubicacion || !newLog.evento) return;
    setTrackingData({
      ...trackingData,
      logs: [{ id: Date.now(), ...newLog }, ...trackingData.logs],
    });
    setNewLog({ fechaHora: "", ubicacion: "", evento: "" });
  };

  const handleSaveTracking = async () => {
    setIsSaving(true);
    try {
      // 🌟 DINÁMICO: Mandamos a la base de datos el estado que elegiste en el Select
      const updatePayload = {
        vin: selectedCar.vin,
        estadoActual: trackingData.estadoActual,
        tracking: trackingData,
      };

      const res = await fetch("/api/vehiculos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (res.ok) {
        setVehicles(
          vehicles.map((v) =>
            v.vin === selectedCar.vin
              ? {
                  ...v,
                  tracking: trackingData,
                  estadoActual: trackingData.estadoActual,
                }
              : v,
          ),
        );
        showToast("Tracking actualizado correctamente", "success");
        setSelectedCar(null);
      } else {
        showToast("Hubo un error al guardar el tracking", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Error de conexión con el servidor", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (selectedCar) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div
          className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <div>
            <h2
              className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Ship className="text-amber-500" size={24} /> Actualizar Logística
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Vehículo:{" "}
              <span className="font-bold text-amber-500">
                {selectedCar.modelo}
              </span>{" "}
              | VIN: {selectedCar.vin}
            </p>
          </div>
          <button
            onClick={() => setSelectedCar(null)}
            className={`flex items-center gap-2 p-2 px-4 rounded-xl border transition-colors outline-none active:scale-95 text-xs font-bold uppercase tracking-wider ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🌟 NUEVO: SELECTOR DE ESTADO LOGÍSTICO */}
          <div
            className={`md:col-span-3 rounded-3xl border p-6 flex flex-col md:flex-row gap-6 items-center justify-between ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-slate-50 border-slate-200"}`}
          >
            <div>
              <h3
                className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <Activity size={16} className="text-blue-500" /> Estado
                Logístico Actual
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Modifica la fase en la que se encuentra la importación.
              </p>
            </div>
            <select
              name="estadoActual"
              value={trackingData.estadoActual}
              onChange={handleTrackingChange}
              className={`w-full md:w-64 rounded-xl border py-3 px-4 text-xs font-black uppercase tracking-wider outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f] border-slate-700 text-white" : "bg-white border-slate-300 text-slate-800"}`}
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="EN_EXPORTACION">En Exportación</option>
              <option value="EMBARCADO">Embarcado</option>
              <option value="EN_TRANSITO">En Tránsito</option>
              <option value="ENTREGADO">Entregado</option>
            </select>
          </div>

          <div
            className={`rounded-3xl border p-6 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Compass size={16} className="text-amber-500" /> Telemetría
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Coordenadas Actuales
                </label>
                <input
                  name="coordenadas"
                  value={trackingData.coordenadas}
                  onChange={handleTrackingChange}
                  placeholder="Ej. 22.41° N, 70.18° E"
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-amber-500" : "bg-slate-50 border-slate-200 text-amber-600"}`}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Velocidad
                </label>
                <div className="relative">
                  <Gauge
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="velocidad"
                    value={trackingData.velocidad}
                    onChange={handleTrackingChange}
                    placeholder="Ej. 15.4 knots"
                    className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Tiempo Restante Aprox.
                </label>
                <input
                  name="tiempoRestante"
                  value={trackingData.tiempoRestante}
                  onChange={handleTrackingChange}
                  placeholder="Ej. ~5 días"
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-6 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Ship size={16} className="text-amber-500" /> Datos del Carguero
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Nombre Oficial
                </label>
                <input
                  name="nombreBarco"
                  value={trackingData.nombreBarco}
                  onChange={handleTrackingChange}
                  placeholder="Ej. MV JFX Pioneer III"
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Línea Naviera
                </label>
                <input
                  name="lineaNaviera"
                  value={trackingData.lineaNaviera}
                  onChange={handleTrackingChange}
                  placeholder="Ej. Ocean Network (ONE)"
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Unidades JIFEX en Flota
                </label>
                <input
                  name="unidades"
                  type="number"
                  value={trackingData.unidades}
                  onChange={handleTrackingChange}
                  placeholder="Ej. 14"
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-6 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <Anchor size={16} className="text-amber-500" /> Puerto Destino
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Puerto de Arribo
                </label>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="puertoDestino"
                    value={trackingData.puertoDestino}
                    onChange={handleTrackingChange}
                    placeholder="Ej. Karachi Port"
                    className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  ETA Oficial (Estimación)
                </label>
                <div className="relative">
                  <Calendar
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="eta"
                    type="date"
                    value={trackingData.eta}
                    onChange={handleTrackingChange}
                    className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                  Condiciones / Estatus
                </label>
                <input
                  name="condiciones"
                  value={trackingData.condiciones}
                  onChange={handleTrackingChange}
                  placeholder="Ej. OK, Retrasado por clima..."
                  className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-emerald-400" : "bg-slate-50 border-slate-200 text-emerald-600"}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-3xl border p-6 overflow-hidden shadow-xl ${isDarkMode ? "border-slate-800 bg-[#1e293b]/40" : "bg-white border-slate-200"}`}
        >
          <h3
            className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <Navigation size={16} className="text-amber-500" /> Bitácora Global
            de Movimientos
          </h3>

          <div
            className={`flex flex-col md:flex-row items-end gap-4 p-4 rounded-2xl mb-6 border ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}
          >
            <div className="flex-1 w-full">
              <label className="text-[9px] font-bold uppercase text-slate-500 pl-1">
                Fecha / Hora
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY HH:MM"
                value={newLog.fechaHora}
                onChange={(e) =>
                  setNewLog({ ...newLog, fechaHora: e.target.value })
                }
                className={`mt-1 w-full rounded-lg border py-2 px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-amber-500 ${isDarkMode ? "bg-[#1e293b] border-slate-600 text-white" : "bg-white border-slate-300 text-slate-800"}`}
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-[9px] font-bold uppercase text-slate-500 pl-1">
                Ubicación
              </label>
              <input
                type="text"
                placeholder="Ej. Mar de Arabia"
                value={newLog.ubicacion}
                onChange={(e) =>
                  setNewLog({ ...newLog, ubicacion: e.target.value })
                }
                className={`mt-1 w-full rounded-lg border py-2 px-3 text-xs outline-none focus:ring-1 focus:ring-amber-500 ${isDarkMode ? "bg-[#1e293b] border-slate-600 text-white" : "bg-white border-slate-300 text-slate-800"}`}
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-[9px] font-bold uppercase text-slate-500 pl-1">
                Evento Logístico
              </label>
              <input
                type="text"
                placeholder="Ej. Control OK"
                value={newLog.evento}
                onChange={(e) =>
                  setNewLog({ ...newLog, evento: e.target.value })
                }
                className={`mt-1 w-full rounded-lg border py-2 px-3 text-xs outline-none focus:ring-1 focus:ring-amber-500 ${isDarkMode ? "bg-[#1e293b] border-slate-600 text-white" : "bg-white border-slate-300 text-slate-800"}`}
              />
            </div>
            <button
              onClick={handleAddLog}
              className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider py-2 px-4 rounded-lg transition-all active:scale-95 outline-none h-[34px]"
            >
              <Plus size={14} /> Registrar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap min-w-full">
              <thead>
                <tr
                  className={`border-b font-bold text-slate-400 ${isDarkMode ? "border-slate-700" : "border-slate-200"}`}
                >
                  <th className="pb-3 px-2 font-mono">FECHA / HORA</th>
                  <th className="pb-3 px-2">UBICACIÓN</th>
                  <th className="pb-3 px-2">EVENTO LOGÍSTICO</th>
                  <th className="pb-3 px-2 text-right"></th>
                </tr>
              </thead>
              <tbody
                className={`font-medium divide-y ${isDarkMode ? "divide-slate-800/50 text-slate-300" : "divide-slate-200 text-slate-700"}`}
              >
                {trackingData.logs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-slate-500">
                      No hay registros en la bitácora.
                    </td>
                  </tr>
                ) : (
                  trackingData.logs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-3 px-2 font-mono text-[11px] text-slate-500">
                        {log.fechaHora}
                      </td>
                      <td className="py-3 px-2 font-semibold text-slate-400">
                        {log.ubicacion}
                      </td>
                      <td className="py-3 px-2 text-amber-500">{log.evento}</td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() =>
                            setTrackingData({
                              ...trackingData,
                              logs: trackingData.logs.filter(
                                (l) => l.id !== log.id,
                              ),
                            })
                          }
                          className="text-red-400 hover:text-red-500 p-1"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4 mt-6 border-slate-200 dark:border-slate-800">
          <button
            onClick={handleSaveTracking}
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] outline-none disabled:opacity-70"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isSaving ? "Guardando..." : "Publicar Actualización Logística"}
          </button>
        </div>

        {toast.visible && (
          <div
            className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 ${
              toast.type === "success"
                ? "bg-emerald-500 text-white shadow-emerald-500/20"
                : "bg-red-500 text-white shadow-red-500/20"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={24} />
            ) : (
              <AlertCircle size={24} />
            )}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
                {toast.type === "success" ? "¡Éxito!" : "Error"}
              </p>
              <p className="text-sm font-bold leading-tight">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= VISTA 2: LISTA DE VEHÍCULOS AGRUPADOS =================
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Gestión de Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Posicionamiento logístico y telemetría de importaciones
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Buscar vehículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full sm:w-64 rounded-xl border py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 size={40} className="text-amber-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Cargando flota de vehículos...
          </p>
        </div>
      ) : !selectedBrand ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {Object.entries(groupedVehicles).map(([brand, cars]) => (
            <div
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`rounded-3xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:bg-[#1e293b]/80 hover:border-amber-500/50" : "bg-white border-slate-200 hover:bg-amber-50/50 hover:border-amber-400"}`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-[#0b121f] text-slate-300" : "bg-slate-50 text-slate-600"}`}
              >
                <CarFront size={32} />
              </div>
              <h3
                className={`text-lg font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {brand}
              </h3>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                {cars.length} Vehículos
              </span>
            </div>
          ))}
          {Object.keys(groupedVehicles).length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-400 text-sm">
              No se encontraron marcas con tu búsqueda.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 relative pb-10">
          <button
            onClick={() => setSelectedBrand(null)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-amber-500 transition-colors cursor-pointer outline-none w-fit"
          >
            <ArrowLeft size={16} /> Volver a Marcas
          </button>

          <div
            className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead
                  className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? "bg-[#0b121f]/50 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"} border-b`}
                >
                  <tr>
                    <th className="px-6 py-4">Vehículo Importado</th>
                    <th className="px-6 py-4">VIN / Chasis</th>
                    <th className="px-6 py-4">Estado Logístico</th>
                    <th className="px-6 py-4 text-right">Telemetría</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
                >
                  {groupedVehicles[selectedBrand]?.map((car) => (
                    <tr
                      key={car.vin}
                      className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              car.fotos?.[0] ||
                              "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop"
                            }
                            alt={car.modelo}
                            className="w-12 h-8 rounded object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <p
                              className={`font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                            >
                              {car.modelo}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Cliente Asignado
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500 font-bold">
                        {car.vin}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[9px] font-black rounded border uppercase tracking-wider ${
                            (car.estadoActual || "") === "EN_TRANSITO"
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              : (car.estadoActual || "") === "EMBARCADO"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : (car.estadoActual || "") === "ENTREGADO"
                                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                  : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                          }`}
                        >
                          {(car.estadoActual || "DISPONIBLE").replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEditTracking(car)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors outline-none active:scale-95 text-xs font-bold uppercase tracking-wider ${isDarkMode ? "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black" : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-500 hover:text-white"}`}
                        >
                          <Navigation size={14} /> Editar Tracking
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {toast.visible && (
            <div
              className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 ${
                toast.type === "success"
                  ? "bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-red-500 text-white shadow-red-500/20"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">
                  {toast.type === "success" ? "¡Éxito!" : "Error"}
                </p>
                <p className="text-sm font-bold leading-tight">
                  {toast.message}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
