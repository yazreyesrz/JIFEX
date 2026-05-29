import React, { useState } from "react";
import {
  LifeBuoy,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SoporteView({ isDarkMode }) {
  const { t } = useTranslation();

  // Estado para simular la base de datos de tickets
  const [tickets, setTickets] = useState([
    {
      id: "TK-001",
      subject: "Duda sobre el Bill of Lading",
      message: "Hola, ¿cuándo me envían el documento B/L original?",
      status: "status_answered",
      date: "2026-05-26",
    },
    {
      id: "TK-002",
      subject: "Cambio de puerto destino",
      message: "¿Es posible cambiar el puerto a Karachi a última hora?",
      status: "status_closed",
      date: "2026-05-20",
    },
  ]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTicket = {
      id: `TK-00${tickets.length + 1}`,
      subject,
      message,
      status: "status_open",
      date: new Date().toISOString().split("T")[0], // Fecha de hoy
    };

    setTickets([newTicket, ...tickets]);
    setSubject("");
    setMessage("");
  };

  const getStatusStyle = (status) => {
    if (status === "status_open")
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (status === "status_answered")
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  };

  const getStatusIcon = (status) => {
    if (status === "status_open") return <Clock size={12} />;
    if (status === "status_answered") return <MessageSquare size={12} />;
    return <CheckCircle2 size={12} />;
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h2
            className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <LifeBuoy className="text-amber-500" size={24} />{" "}
            {t("support.title")}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{t("support.subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORMULARIO DE NUEVO TICKET */}
        <div
          className={`rounded-3xl border p-6 md:p-8 shadow-xl h-fit ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <h3
            className={`text-lg font-black tracking-tight mb-5 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {t("support.new_ticket")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                {t("support.subject")}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("support.subject")}
                className={`mt-1.5 w-full rounded-xl border py-3 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400"}`}
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                {t("support.message")}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("support.message")}
                rows="5"
                className={`mt-1.5 w-full rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 transition-all resize-none ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400"}`}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] outline-none"
            >
              <Send size={16} /> {t("support.send")}
            </button>
          </form>
        </div>

        {/* HISTORIAL DE TICKETS */}
        <div className="space-y-4">
          <h3
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
          >
            <MessageSquare size={16} className="text-amber-500" />{" "}
            {t("support.history")}
          </h3>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-2xl border p-5 transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/80 hover:bg-[#1e293b]/60" : "bg-white border-slate-200 hover:shadow-md"}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {ticket.id}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border ${getStatusStyle(ticket.status)}`}
                    >
                      {getStatusIcon(ticket.status)}{" "}
                      {t(`support.${ticket.status}`)}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {ticket.date}
                  </span>
                </div>

                <h4
                  className={`text-sm font-bold mb-1.5 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
                >
                  {ticket.subject}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  {ticket.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
