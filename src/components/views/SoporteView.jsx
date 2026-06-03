import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  AlertCircle,
  User,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock de los tickets del cliente
const initialClientTickets = [
  {
    id: "TK-001",
    asunto: "Duda sobre el Bill of Lading",
    fecha: "2026-05-26",
    estado: "Respondido",
    vin: "S321V-987654",
    mensajes: [
      {
        sender: "client",
        text: "Hola, ¿cuándo me envían el documento B/L original?",
        time: "09:30 AM",
      },
      {
        sender: "support",
        text: "Hola! El B/L original ya fue emitido y se envió por DHL ayer. Te comparto el número de guía por correo.",
        time: "11:15 AM",
      },
    ],
  },
  {
    id: "TK-002",
    asunto: "Cambio de puerto destino",
    fecha: "2026-05-20",
    estado: "Cerrado",
    vin: "LA350S-123456",
    mensajes: [
      {
        sender: "client",
        text: "¿Es posible cambiar el puerto a Karachi a última hora?",
        time: "08:00 AM",
      },
      {
        sender: "support",
        text: "Lamentablemente el vehículo ya fue embarcado y el destino final no puede ser modificado en esta etapa.",
        time: "10:30 AM",
      },
      {
        sender: "client",
        text: "Entiendo, gracias por confirmar.",
        time: "10:45 AM",
      },
    ],
  },
];

export default function SoporteView({ isDarkMode }) {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState(initialClientTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Estado para el formulario de NUEVO ticket
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTicket, setNewTicket] = useState({
    asunto: "",
    mensaje: "",
    vin: "",
  });

  // Estado para responder en el chat activo
  const [replyText, setReplyText] = useState("");

  // Manejar el envío de una respuesta en el chat activo
  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMessage = {
      sender: "client",
      text: replyText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedTicket = {
      ...selectedTicket,
      estado: "Abierto", // Cambia el estado a abierto al responder
      mensajes: [...selectedTicket.mensajes, newMessage],
    };

    setSelectedTicket(updatedTicket);
    setTickets(
      tickets.map((tk) => (tk.id === updatedTicket.id ? updatedTicket : tk)),
    );
    setReplyText("");
  };

  // Manejar la creación de un nuevo ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.asunto || !newTicket.mensaje) return;

    const newTk = {
      id: `TK-00${tickets.length + 3}`,
      asunto: newTicket.asunto,
      fecha: new Date().toISOString().split("T")[0],
      estado: "Abierto",
      vin: newTicket.vin,
      mensajes: [
        {
          sender: "client",
          text: newTicket.mensaje,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setTickets([newTk, ...tickets]);
    setIsCreatingNew(false);
    setSelectedTicket(newTk);
    setNewTicket({ asunto: "", mensaje: "", vin: "" });
  };

  // Manejar la eliminación de un ticket del historial
  const handleDeleteTicket = (id, e) => {
    e.stopPropagation(); // Evita que se seleccione la tarjeta al hacer clic en borrar
    if (
      window.confirm("¿Estás seguro de eliminar este ticket del historial?")
    ) {
      setTickets(tickets.filter((tk) => tk.id !== id));
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* CABECERA */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight flex items-center gap-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Centro de Soporte
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Comunícate directamente con tu manager asignado
          </p>
        </div>

        <button
          onClick={() => {
            setIsCreatingNew(true);
            setSelectedTicket(null);
          }}
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 outline-none w-full sm:w-auto"
        >
          <Plus size={16} /> Abrir Nuevo Ticket
        </button>
      </div>

      {/* DISEÑO DIVIDIDO (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLUMNA IZQUIERDA: HISTORIAL DE TICKETS */}
        <div
          className={`lg:col-span-1 rounded-3xl border flex flex-col h-[600px] overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <div
            className={`p-5 border-b flex items-center gap-2 ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
          >
            <MessageSquare size={16} className="text-amber-500" />
            <h3
              className={`text-xs font-black uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              Historial de Tickets
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs font-bold uppercase tracking-wider">
                  No tienes tickets abiertos
                </p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsCreatingNew(false);
                  }}
                  className={`relative rounded-2xl border p-4 cursor-pointer transition-all duration-200 outline-none active:scale-[0.98] ${
                    selectedTicket?.id === ticket.id
                      ? isDarkMode
                        ? "bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/50"
                        : "bg-amber-50 border-amber-300 ring-1 ring-amber-400/50"
                      : isDarkMode
                        ? "bg-[#0b121f]/50 border-slate-700 hover:border-slate-500"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-500/10 px-1.5 py-0.5 rounded">
                        {ticket.id}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          ticket.estado === "Respondido"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : ticket.estado === "Cerrado"
                              ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {ticket.estado}
                      </span>
                    </div>
                    {/* Botón Eliminar Ticket */}
                    <button
                      onClick={(e) => handleDeleteTicket(ticket.id, e)}
                      className={`p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 absolute right-3 top-3 ${
                        isDarkMode
                          ? "text-red-400 hover:bg-red-500/20"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                      style={{ opacity: 1 }} // Siempre visible en móvil
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <h4
                    className={`text-sm font-black line-clamp-1 mb-1 pr-6 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
                  >
                    {ticket.asunto}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                    {ticket.mensajes[ticket.mensajes.length - 1].text}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{ticket.fecha}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />{" "}
                      {ticket.mensajes[ticket.mensajes.length - 1].time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: CHAT / FORMULARIO */}
        <div
          className={`lg:col-span-2 rounded-3xl border flex flex-col h-[600px] overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          {/* VISTA 1: CREAR NUEVO TICKET */}
          {isCreatingNew ? (
            <div className="flex flex-col h-full p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300">
              <h2
                className={`text-xl font-black mb-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Redactar Nuevo Ticket
              </h2>
              <form
                onSubmit={handleCreateTicket}
                className="space-y-5 flex-1 flex flex-col"
              >
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Asunto Principal
                  </label>
                  <input
                    type="text"
                    value={newTicket.asunto}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, asunto: e.target.value })
                    }
                    placeholder="Ej. Problema con los documentos aduanales"
                    className={`mt-1.5 w-full rounded-xl border py-3 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Chasis Relacionado (Opcional)
                  </label>
                  <input
                    type="text"
                    value={newTicket.vin}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, vin: e.target.value })
                    }
                    placeholder="Ej. S321V-987654"
                    className={`mt-1.5 w-full rounded-xl border py-3 px-4 text-sm font-mono outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-amber-500" : "bg-slate-50 border-slate-200 text-amber-600"}`}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Describe tu requerimiento
                  </label>
                  <textarea
                    value={newTicket.mensaje}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, mensaje: e.target.value })
                    }
                    placeholder="Detalla tu problema para que nuestro equipo te ayude rápidamente..."
                    className={`mt-1.5 flex-1 w-full rounded-xl border py-3 px-4 text-sm outline-none resize-none focus:ring-2 focus:ring-amber-500/40 transition-all leading-relaxed ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-700"}`}
                    required
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] outline-none"
                  >
                    <Send size={16} /> Enviar Ticket al Manager
                  </button>
                </div>
              </form>
            </div>
          ) : selectedTicket ? (
            /* VISTA 2: HILO DE CHAT DEL TICKET */
            <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
              {/* Header del Chat */}
              <div
                className={`p-5 border-b shrink-0 flex items-center justify-between ${isDarkMode ? "border-slate-800 bg-[#0b121f]/30" : "border-slate-100 bg-slate-50/50"}`}
              >
                <div>
                  <h3
                    className={`text-lg font-black tracking-tight line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                  >
                    {selectedTicket.asunto}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      Ticket: {selectedTicket.id}
                    </span>
                    {selectedTicket.vin && (
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2 rounded-md">
                        VIN: {selectedTicket.vin}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Área de Mensajes */}
              <div
                className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 ${isDarkMode ? "bg-[#0b121f]/20" : "bg-slate-50/30"}`}
              >
                {selectedTicket.mensajes.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex w-full ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${msg.sender === "client" ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {msg.sender === "client" ? "Tú" : "Equipo JIFEX"}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">
                          {msg.time}
                        </span>
                      </div>
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === "client"
                            ? "bg-amber-500 text-slate-900 font-medium rounded-tr-sm shadow-md shadow-amber-500/10"
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

              {/* Input de Respuesta del Cliente */}
              <div
                className={`p-4 border-t ${isDarkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"}`}
              >
                {selectedTicket.estado !== "Cerrado" ? (
                  <form onSubmit={handleReply} className="flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className={`flex-1 rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="shrink-0 flex items-center justify-center p-3 sm:px-6 rounded-xl bg-amber-500 text-slate-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 outline-none"
                    >
                      <Send size={18} className="sm:hidden" />
                      <span className="hidden sm:inline font-black text-xs uppercase tracking-wider">
                        Responder
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-2 text-xs font-bold text-slate-500 flex items-center justify-center gap-2 uppercase tracking-wider">
                    <CheckCircle size={14} className="text-slate-400" /> El
                    ticket ha sido cerrado por el equipo de soporte.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* VISTA 3: ESTADO VACÍO (Nada seleccionado) */
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center animate-in zoom-in-95 duration-300">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <h3
                className={`text-lg font-black tracking-tight mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Selecciona un ticket del historial
              </h3>
              <p className="text-xs max-w-sm mb-6 leading-relaxed">
                Selecciona un ticket para ver la conversación con el equipo de
                soporte o crea uno nuevo para recibir asistencia.
              </p>
              <button
                onClick={() => setIsCreatingNew(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors outline-none active:scale-95 ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-300 hover:bg-slate-50 text-slate-600"}`}
              >
                <Plus size={14} /> Abrir Nuevo Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
