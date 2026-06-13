"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  MessageSquare,
  User,
  FileText,
  Send,
  ArrowLeft,
  Loader2,
  Calendar,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function TicketsManagerView({ isDarkMode }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // 🌟 NUEVO: Estado para Alertas Elegantes (Toasts)
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type }), 4000);
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const fecha = d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const hora = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${fecha} • ${hora}`;
  };

  // 🌟 AHORA SÍ LEERÁ EL NOMBRE REAL DE LA BASE DE DATOS
  const getClientName = (ticket) => {
    return (
      ticket.clienteNombre ||
      ticket.clienteUsuario ||
      ticket.cliente?.nombre ||
      "Usuario de Plataforma"
    );
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setIsReplying(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REPLY",
          ticketId: selectedTicket.id,
          mensaje: replyText,
          remitente: "MANAGER",
        }),
      });

      if (res.ok) {
        setReplyText("");
        fetchTickets();

        const nuevoMensaje = await res.json();
        setSelectedTicket((prev) => ({
          ...prev,
          estado: "RESUELTO",
          mensajes: [...prev.mensajes, nuevoMensaje],
        }));

        showToast("Respuesta enviada al cliente.", "success");
      } else {
        showToast("No se pudo enviar la respuesta.", "error");
      }
    } catch (error) {
      showToast("Error de conexión.", "error");
    } finally {
      setIsReplying(false);
    }
  };

  // 🌟 FUNCIÓN DE BORRADO DE TICKETS CON ALERTA ELEGANTE
  const handleDeleteTicket = async (e, ticketId) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este ticket? Esta acción no se puede deshacer.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/tickets?id=${ticketId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== ticketId));
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(null);
        }
        showToast("Ticket eliminado permanentemente.", "success");
      } else {
        showToast("Error al intentar borrar el ticket.", "error");
      }
    } catch (error) {
      showToast("Error de conexión al borrar.", "error");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter !== "TODOS" && ticket.estado !== statusFilter) {
      return false;
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      const matchAsunto = ticket.asunto?.toLowerCase().includes(term);
      const matchVin =
        ticket.vinReferencia?.toLowerCase().includes(term) ||
        ticket.vin?.toLowerCase().includes(term);
      const matchCliente = getClientName(ticket).toLowerCase().includes(term);

      return matchAsunto || matchCliente || matchVin;
    }
    return true;
  });

  const getStatusColor = (estado) => {
    if (estado === "ABIERTO")
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (estado === "RESUELTO")
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  };

  const ticketsAbiertosContador = tickets.filter(
    (t) => t.estado === "ABIERTO",
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative h-full flex flex-col">
      {/* 🌟 ALERTAS FLOTANTES (TOASTS) */}
      {toast.visible && (
        <div
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-top-5 fade-in duration-300 ${toast.type === "success" ? (isDarkMode ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-600") : isDarkMode ? "bg-red-500/20 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-600"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p className="text-xs font-bold uppercase tracking-wider">
            {toast.message}
          </p>
        </div>
      )}

      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Mesa de Ayuda
            {ticketsAbiertosContador > 0 && (
              <span className="bg-red-500 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg font-black">
                {ticketsAbiertosContador} Nuevos
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Gestión y soporte a importadores B2B
          </p>
        </div>

        {!selectedTicket && (
          <div className="flex items-center gap-3 relative z-30">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar ticket, cliente o VIN..."
                className={`w-full sm:w-64 rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                onBlur={() =>
                  setTimeout(() => setIsFilterDropdownOpen(false), 200)
                }
                className={`shrink-0 flex items-center gap-2 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border transition-all active:scale-95 outline-none cursor-pointer ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                <Filter size={14} />
                {statusFilter === "TODOS" && "Todos los Estados"}
                {statusFilter === "ABIERTO" && "Tickets Activos"}
                {statusFilter === "RESUELTO" && "Historial Resueltos"}
              </button>

              {isFilterDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-2xl overflow-hidden py-1 ${isDarkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-100"}`}
                >
                  <button
                    onClick={() => setStatusFilter("TODOS")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${statusFilter === "TODOS" ? "text-blue-500 bg-blue-500/5 font-black" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  >
                    Todos los Estados
                  </button>
                  <button
                    onClick={() => setStatusFilter("ABIERTO")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${statusFilter === "ABIERTO" ? "text-amber-500 bg-amber-500/5 font-black" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  >
                    Tickets Activos
                  </button>
                  <button
                    onClick={() => setStatusFilter("RESUELTO")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${statusFilter === "RESUELTO" ? "text-emerald-500 bg-emerald-500/5 font-black" : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  >
                    Historial Resueltos
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 size={40} className="text-blue-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Cargando Tickets...
          </p>
        </div>
      ) : selectedTicket ? (
        <div className="flex-1 flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
          <button
            onClick={() => setSelectedTicket(null)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition-colors mb-4 w-fit outline-none cursor-pointer"
          >
            <ArrowLeft size={16} /> Volver a la Lista
          </button>

          <div
            className={`flex-1 rounded-3xl border shadow-xl flex flex-col overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div
              className={`p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
            >
              <div>
                <h2
                  className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {selectedTicket.asunto}
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase tracking-wider">
                    ID: {selectedTicket.id.slice(0, 8)}
                  </span>
                  {(selectedTicket.vinReferencia || selectedTicket.vin) && (
                    <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      VIN: {selectedTicket.vinReferencia || selectedTicket.vin}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    <User size={12} /> {getClientName(selectedTicket)}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-500/5 px-2.5 py-0.5 rounded uppercase tracking-wider">
                    <Calendar size={12} />{" "}
                    {formatDateTime(
                      selectedTicket.updatedAt || selectedTicket.createdAt,
                    )}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusColor(selectedTicket.estado)}`}
              >
                {selectedTicket.estado}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {selectedTicket.mensajes?.map((msg) => {
                const isManager = msg.remitente === "MANAGER";
                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${isManager ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex flex-col max-w-[80%] ${isManager ? "items-end" : "items-start"}`}
                    >
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-2">
                        {isManager
                          ? "Tú (Manager)"
                          : getClientName(selectedTicket)}{" "}
                        •{" "}
                        <span className="font-mono">
                          {formatDateTime(msg.createdAt)}
                        </span>
                      </span>
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${isManager ? "bg-blue-500 text-white rounded-tr-none shadow-md shadow-blue-500/20" : isDarkMode ? "bg-[#0b121f] text-slate-200 border border-slate-800 rounded-tl-none" : "bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none"}`}
                      >
                        {msg.texto}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleReply}
              className={`p-4 border-t flex gap-3 ${isDarkMode ? "border-slate-800 bg-[#0b121f]/50" : "border-slate-200 bg-slate-50/50"}`}
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Escribe tu respuesta a ${getClientName(selectedTicket)}...`}
                className={`flex-1 rounded-xl border py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
              />
              <button
                disabled={isReplying}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3.5 rounded-xl transition-all shadow-md active:scale-95 outline-none disabled:opacity-70 cursor-pointer"
              >
                {isReplying ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-300">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`rounded-3xl border p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 outline-none ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-2.5 py-1 rounded text-[9px] font-black border uppercase tracking-wider ${getStatusColor(ticket.estado)}`}
                  >
                    {ticket.estado}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      ID: {ticket.id.slice(0, 5)}
                    </span>
                    <button
                      onClick={(e) => handleDeleteTicket(e, ticket.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors outline-none cursor-pointer"
                      title="Eliminar ticket permanentemente"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3
                  className={`text-lg font-black leading-tight mb-4 line-clamp-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {ticket.asunto}
                </h3>

                <div className="space-y-2 mb-6">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <User size={14} className="text-blue-500 shrink-0" />
                    <span className="truncate">{getClientName(ticket)}</span>
                  </p>
                  {(ticket.vinReferencia || ticket.vin) && (
                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <FileText size={14} className="text-amber-500 shrink-0" />
                      <span className="font-mono">
                        Chasis: {ticket.vinReferencia || ticket.vin}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`pt-4 border-t flex justify-between items-center ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">
                  <Clock size={12} className="text-slate-400" />
                  {formatDateTime(ticket.updatedAt || ticket.createdAt)}
                </p>
                <div className="flex items-center gap-1.5 text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg">
                  <MessageSquare size={12} />
                  <span className="text-[10px] font-black">
                    {ticket.mensajes?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="col-span-full p-16 text-center rounded-3xl border border-dashed flex flex-col items-center justify-center border-slate-300 dark:border-slate-800">
              <Clock size={40} className="text-slate-400 opacity-50 mb-3" />
              <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                No se encontraron tickets
              </p>
              <p className="text-xs text-slate-400 mt-1">
                No hay registros que coincidan con el estado o término de
                búsqueda seleccionado.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
