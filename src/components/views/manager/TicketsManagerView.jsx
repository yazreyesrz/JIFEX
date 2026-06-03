import React, { useState } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowLeft,
  Send,
  User,
  AlertCircle,
  FileText,
} from "lucide-react";

// Datos simulados de la base de datos de tickets
const initialTickets = [
  {
    id: "TK-005",
    asunto: "Duda sobre el Bill of Lading",
    cliente: "Auto Imports MX",
    email: "contacto@autoimports.mx",
    fecha: "Hace 10 min",
    estado: "Abierto",
    vin: "S321V-987654",
    mensajes: [
      {
        sender: "client",
        text: "Hola, ¿podrían confirmarme si el B/L original ya fue emitido y enviado por DHL? Necesito presentar los papeles en aduana pronto.",
        time: "09:30 AM",
      },
    ],
  },
  {
    id: "TK-004",
    asunto: "Actualización de Tracking",
    cliente: "Global Motors JP",
    email: "sales@globalmotors.jp",
    fecha: "Hace 2 horas",
    estado: "Abierto",
    vin: "RU3-998877",
    mensajes: [
      {
        sender: "client",
        text: "El estatus dice 'Embarcado', pero no veo la fecha estimada de llegada actualizada.",
        time: "07:45 AM",
      },
      {
        sender: "support",
        text: "Hola Kenji, el barco se retrasó por clima. La nueva ETA es el 30 de Mayo. Actualizaremos la plataforma en breve.",
        time: "08:15 AM",
      },
      {
        sender: "client",
        text: "Entendido, muchas gracias por la aclaración.",
        time: "08:20 AM",
      },
    ],
  },
  {
    id: "TK-002",
    asunto: "Solicitud de Certificado JAAI",
    cliente: "Pacific Autos Chile",
    email: "ventas@pacificautos.cl",
    fecha: "Hace 2 días",
    estado: "Resuelto",
    vin: "LA350S-123456",
    mensajes: [
      {
        sender: "client",
        text: "Necesito el certificado JAAI para este chasis.",
        time: "10:00 AM",
      },
      {
        sender: "support",
        text: "Hola Camila. Ya hemos subido el PDF oficial a tu portal. Puedes descargarlo en la ficha del vehículo.",
        time: "11:30 AM",
      },
    ],
  },
];

export default function TicketsManagerView({ isDarkMode }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Filtrado de la lista
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Todos" || ticket.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Estadísticas rápidas
  const openTicketsCount = tickets.filter((t) => t.estado === "Abierto").length;

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Actualizamos el ticket seleccionado con el nuevo mensaje
    const newMessage = {
      sender: "support",
      text: replyText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updatedTicket = {
      ...selectedTicket,
      mensajes: [...selectedTicket.mensajes, newMessage],
    };

    setSelectedTicket(updatedTicket);
    setTickets(
      tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)),
    );
    setReplyText("");
  };

  const handleResolve = () => {
    const updatedTicket = { ...selectedTicket, estado: "Resuelto" };
    setSelectedTicket(updatedTicket);
    setTickets(
      tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)),
    );
  };

  // ================= VISTA 1: HILO DEL TICKET DETALLADO =================
  if (selectedTicket) {
    return (
      <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-4 duration-300 flex flex-col h-[calc(100vh-8rem)]">
        {/* Cabecera del Ticket */}
        <div
          className={`shrink-0 rounded-3xl border p-4 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div>
            <button
              onClick={() => setSelectedTicket(null)}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition-colors outline-none mb-3"
            >
              <ArrowLeft size={14} /> Volver a la lista
            </button>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h2
                className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {selectedTicket.asunto}
              </h2>
              <span
                className={`px-2.5 py-1 text-[9px] font-black rounded-lg border uppercase tracking-wider ${
                  selectedTicket.estado === "Abierto"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                }`}
              >
                {selectedTicket.estado}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="font-bold text-blue-500">
                {selectedTicket.cliente}
              </span>{" "}
              • {selectedTicket.id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedTicket.estado === "Abierto" && (
              <button
                onClick={handleResolve}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors outline-none active:scale-95 border ${isDarkMode ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white" : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white"}`}
              >
                <CheckCircle size={14} /> Marcar Resuelto
              </button>
            )}
          </div>
        </div>

        {/* Info lateral y Chat en Desktop, Apilado en Móvil */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Hilo de Mensajes (Chat) */}
          <div
            className={`flex-1 flex flex-col rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div
              className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 ${isDarkMode ? "bg-[#0b121f]/30" : "bg-slate-50/50"}`}
            >
              {selectedTicket.mensajes.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex w-full ${msg.sender === "support" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${msg.sender === "support" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {msg.sender === "support"
                          ? "Soporte JIFEX"
                          : selectedTicket.cliente}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {msg.time}
                      </span>
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "support"
                          ? "bg-blue-500 text-white rounded-tr-sm shadow-md shadow-blue-500/20"
                          : isDarkMode
                            ? "bg-[#1e293b] text-slate-200 rounded-tl-sm border border-slate-700"
                            : "bg-white text-slate-700 rounded-tl-sm border border-slate-200 shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Respuesta */}
            <div
              className={`p-3 sm:p-4 border-t ${isDarkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"}`}
            >
              {selectedTicket.estado === "Abierto" ? (
                <form onSubmit={handleReply} className="flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escribe tu respuesta oficial..."
                    className={`flex-1 rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="shrink-0 flex items-center justify-center p-3 sm:px-6 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 outline-none"
                  >
                    <Send size={18} className="sm:hidden" />
                    <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider">
                      Enviar
                    </span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-2 text-xs font-bold text-slate-500 flex items-center justify-center gap-2 uppercase tracking-wider">
                  <CheckCircle size={14} className="text-emerald-500" /> Este
                  ticket ha sido resuelto y cerrado
                </div>
              )}
            </div>
          </div>

          {/* Panel Lateral de Contexto */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">
            <div
              className={`rounded-3xl border p-5 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <User size={14} className="text-blue-500" /> Información del
                Cliente
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Empresa
                  </p>
                  <p
                    className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {selectedTicket.cliente}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">
                    Correo de Contacto
                  </p>
                  <p
                    className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {selectedTicket.email}
                  </p>
                </div>
              </div>
            </div>

            {selectedTicket.vin && (
              <div
                className={`rounded-3xl border p-5 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
              >
                <h3
                  className={`text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  <FileText size={14} className="text-blue-500" /> Vehículo
                  Relacionado
                </h3>
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}
                >
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Chasis (VIN)
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-500">
                    {selectedTicket.vin}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= VISTA 2: LISTADO DE TICKETS =================
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* Cabecera */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Mesa de Ayuda
            {openTicketsCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                {openTicketsCount} Nuevos
              </span>
            )}
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Gestión y soporte a importadores B2B
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Buscador */}
          <div className="relative flex-1 sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Buscar ticket, cliente o VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-xl border py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>

          {/* Select de Filtro */}
          <div className="relative shrink-0">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full appearance-none rounded-xl border py-2 pl-9 pr-8 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-600"}`}
            >
              <option value="Todos">Todos los Estados</option>
              <option value="Abierto">Solo Abiertos</option>
              <option value="Resuelto">Resueltos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Tarjetas de Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTickets.length === 0 ? (
          <div
            className={`col-span-full p-8 text-center rounded-3xl border ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"}`}
          >
            <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm font-bold">No se encontraron tickets</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className={`rounded-3xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer outline-none hover:-translate-y-1 active:scale-[0.98] ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/80 hover:bg-[#1e293b]/80 hover:border-blue-500/50" : "bg-white border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`px-2.5 py-1 text-[9px] font-black rounded-lg border uppercase tracking-wider ${
                    ticket.estado === "Abierto"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}
                >
                  {ticket.estado}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-500/10 px-2 py-0.5 rounded-md">
                  {ticket.id}
                </span>
              </div>

              <h3
                className={`text-base font-black leading-tight line-clamp-2 mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {ticket.asunto}
              </h3>

              <div className="space-y-1.5 mb-5">
                <p className="text-xs text-slate-500 flex items-center gap-1.5 line-clamp-1">
                  <User size={12} className="text-blue-500 shrink-0" />{" "}
                  {ticket.cliente}
                </p>
                {ticket.vin && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FileText size={12} className="text-amber-500 shrink-0" />{" "}
                    Chasis: <span className="font-mono">{ticket.vin}</span>
                  </p>
                )}
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Clock size={12} /> {ticket.fecha}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded-lg">
                  <MessageSquare size={12} /> {ticket.mensajes.length}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
