"use client";

import React, { useState, useEffect } from "react";
// 🌟 1. IMPORTAMOS TU CONTEXTO DE AUTENTICACIÓN
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Trash2,
  Clock,
  MessageSquare,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  User,
  Headset,
  ShieldAlert,
  Loader2,
  Calendar,
} from "lucide-react";

// 🌟 2. YA NO DEPENDEMOS DE LAS PROPS, USAMOS SOLO isDarkMode
export default function SoporteView({ isDarkMode }) {
  // 🌟 3. EXTRAEMOS AL USUARIO DIRECTO DESDE LA RAÍZ DE TU APP
  const { user } = useAuth();

  const [viewState, setViewState] = useState("empty");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    asunto: "",
    vin: "",
    mensaje: "",
  });
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets");
      if (res.ok) {
        const data = await res.json();

        const misTickets = data.filter((ticket) => {
          if (!user) return false;

          const miId = String(user.id).trim().toLowerCase();
          const miUsuario = String(user.username).trim().toLowerCase();

          const tId = String(ticket.clienteId || "")
            .trim()
            .toLowerCase();
          const tUser = String(
            ticket.clienteUsuario || ticket.clienteNombre || "",
          )
            .trim()
            .toLowerCase();

          return (
            (tId !== "" && (tId === miId || tId === miUsuario)) ||
            (tUser !== "" && (tUser === miId || tUser === miUsuario))
          );
        });

        setTickets(misTickets);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Volvemos a consultar si el usuario cambia (ej. si apenas cargó el login)
  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🌟 BLOQUEO: Si por alguna razón el usuario aún no carga, no lo dejamos mandar el ticket vacío
    if (!user || !user.id) {
      alert(
        "Error: No se ha detectado tu sesión de usuario. Por favor recarga la página.",
      );
      return;
    }

    if (!formData.asunto || !formData.mensaje) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "NEW_TICKET",
          asunto: formData.asunto,
          vin: formData.vin,
          mensaje: formData.mensaje,
          // AQUÍ MANDAMOS LOS DATOS 100% REALES DEL CLIENTE
          clienteId: user.id,
          clienteUsuario: user.username,
          clienteNombre: user.nombre || user.username,
        }),
      });

      if (res.ok) {
        const nuevoTicket = await res.json();
        setTickets([nuevoTicket, ...tickets]);
        setShowSuccess(true);
        setFormData({ asunto: "", vin: "", mensaje: "" });

        setTimeout(() => {
          setShowSuccess(false);
          setSelectedTicket(nuevoTicket);
          setViewState("detail");
        }, 3000);
      } else {
        alert("Hubo un error al crear tu ticket.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !user) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REPLY",
          ticketId: selectedTicket.id,
          mensaje: replyText,
          remitente: "CLIENTE",
          usuarioId: user.id,
        }),
      });

      if (res.ok) {
        setReplyText("");
        fetchTickets();
        const nuevoMensaje = await res.json();
        setSelectedTicket((prev) => ({
          ...prev,
          estado: "ABIERTO",
          mensajes: [...prev.mensajes, nuevoMensaje],
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenNew = () => {
    setViewState("new");
    setSelectedTicket(null);
  };
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setViewState("detail");
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/tickets?id=${deleteModal.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTickets(tickets.filter((t) => t.id !== deleteModal.id));
        if (selectedTicket?.id === deleteModal.id) {
          setViewState("empty");
          setSelectedTicket(null);
        }
        setDeleteModal({ isOpen: false, id: null });
      } else {
        alert("Hubo un error al eliminar el ticket de la base de datos.");
      }
    } catch (error) {
      console.error("Error al borrar el ticket:", error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pt-2">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4">
        <div>
          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
          >
            Centro de Soporte
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1.5">
            Comunícate directamente con tu manager asignado
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 outline-none"
        >
          <Plus size={16} /> Abrir Nuevo Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HISTORIAL DE TICKETS */}
        <div
          className={`rounded-3xl border p-6 flex flex-col h-[650px] shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <h3 className="text-xs font-black uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
            <MessageSquare size={16} className="text-amber-500" /> Mis Tickets
          </h3>

          <div className="space-y-4 overflow-y-auto pr-2 flex-1 scrollbar-hide">
            {isLoading ? (
              <div className="text-center py-10 opacity-50">
                <Loader2
                  className="mx-auto mb-2 text-slate-400 animate-spin"
                  size={32}
                />
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-10 opacity-50">
                <MessageSquare
                  className="mx-auto mb-2 text-slate-400"
                  size={32}
                />
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  No tienes tickets activos
                </p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleSelectTicket(ticket)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group relative ${selectedTicket?.id === ticket.id ? (isDarkMode ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200 shadow-md") : isDarkMode ? "bg-[#0b121f]/50 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"}`}
                >
                  {selectedTicket?.id === ticket.id && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-amber-500 rounded-r-full" />
                  )}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">
                        {ticket.id.slice(0, 8)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${ticket.estado === "RESUELTO" ? "bg-emerald-500/10 text-emerald-500" : ticket.estado === "ABIERTO" ? "bg-amber-500/10 text-amber-500" : "bg-slate-500/10 text-slate-500"}`}
                      >
                        {ticket.estado}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleDeleteClick(e, ticket.id)}
                      className="text-red-400 hover:text-red-500 transition-colors opacity-60 hover:opacity-100 outline-none"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4
                    className={`text-sm font-black mb-1.5 line-clamp-1 ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
                  >
                    {ticket.asunto}
                  </h4>
                  <p
                    className={`text-xs line-clamp-2 leading-relaxed mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {ticket.mensajes?.[0]?.texto || "Sin mensajes"}
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 font-mono pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-slate-400" />{" "}
                      {formatDateTime(ticket.updatedAt || ticket.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PANEL DINÁMICO */}
        <div
          className={`lg:col-span-2 rounded-3xl border p-8 shadow-sm flex flex-col h-[650px] overflow-hidden ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          {viewState === "empty" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
              <div className="mb-4 text-slate-300 dark:text-slate-700">
                <MessageCircle size={64} strokeWidth={1.5} />
              </div>
              <h2
                className={`text-xl font-black mb-2 ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
              >
                Selecciona un ticket del historial
              </h2>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
                Selecciona un ticket para ver la conversación con el equipo de
                soporte o crea uno nuevo para recibir asistencia.
              </p>
              <button
                onClick={handleOpenNew}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors outline-none active:scale-95 ${isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <Plus size={16} /> Abrir Nuevo Ticket
              </button>
            </div>
          )}

          {viewState === "new" && (
            <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2
                className={`text-2xl font-black tracking-tight mb-8 ${isDarkMode ? "text-white" : "text-[#0f172a]"}`}
              >
                Redactar Nuevo Ticket
              </h2>
              {showSuccess ? (
                <div
                  className={`flex-1 flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed animate-in zoom-in-95 duration-300 ${isDarkMode ? "border-emerald-500/30 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"}`}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3
                    className={`text-xl font-black mb-2 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}
                  >
                    ¡Ticket Enviado con Éxito!
                  </h3>
                  <p
                    className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                  >
                    El manager logístico ha sido notificado. Te redirigiremos a
                    la conversación en un momento...
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex-1 flex flex-col space-y-6"
                >
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Asunto Principal
                    </label>
                    <input
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Problema con los documentos aduanales"
                      className={`w-full rounded-2xl border py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Chasis Relacionado (Opcional)
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleChange}
                      placeholder="Ej. S321V-987654"
                      className={`w-full rounded-2xl border py-4 px-5 text-sm font-mono outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-amber-500 placeholder-slate-600" : "bg-white border-slate-200 text-amber-500 placeholder-slate-400"}`}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Describe tu requerimiento
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      placeholder="Detalla tu problema para que nuestro equipo te ayude rápidamente..."
                      className={`w-full flex-1 min-h-[150px] rounded-2xl border py-4 px-5 text-sm resize-none outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"}`}
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-md active:scale-95 outline-none disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />{" "}
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Ticket al Manager <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {viewState === "detail" && selectedTicket && (
            <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              <div
                className={`pb-4 border-b flex items-center justify-between ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2
                      className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {selectedTicket.asunto}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${selectedTicket.estado === "RESUELTO" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
                    >
                      {selectedTicket.estado}
                    </span>
                  </div>
                  <p className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-2">
                    Ticket ID: {selectedTicket.id.slice(0, 8)}{" "}
                    <span className="opacity-50">|</span> <Calendar size={12} />{" "}
                    {formatDateTime(selectedTicket.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-hide">
                {selectedTicket.mensajes?.map((msg) => {
                  const isManager = msg.remitente === "MANAGER";
                  return (
                    <div
                      key={msg.id}
                      className={`flex w-full ${!isManager ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex flex-col max-w-[80%] ${!isManager ? "items-end" : "items-start"}`}
                      >
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-2">
                          {!isManager ? "Tú" : "JIFEX Support"} •{" "}
                          <span className="font-mono">
                            {formatDateTime(msg.createdAt)}
                          </span>
                        </span>
                        <div
                          className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            !isManager
                              ? "bg-amber-500 text-slate-900 rounded-tr-none shadow-md shadow-amber-500/20"
                              : isDarkMode
                                ? "bg-[#0b121f] text-slate-200 border border-slate-800 rounded-tl-none"
                                : "bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none"
                          }`}
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
                className={`pt-4 border-t flex gap-3 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className={`flex-1 rounded-xl border py-3.5 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                />
                <button
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-900 p-3.5 rounded-xl transition-all shadow-md active:scale-95 outline-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {deleteModal.isOpen && (
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
                Eliminar Ticket
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                ¿Estás seguro de que deseas eliminar este ticket
                permanentemente? No podrás recuperar la conversación.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className={`flex-1 rounded-xl border font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none active:scale-95 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg active:scale-95 outline-none"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
