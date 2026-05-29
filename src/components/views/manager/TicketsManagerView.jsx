import React, { useState } from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Reply,
  User,
} from "lucide-react";

export default function TicketsManagerView({ isDarkMode }) {
  // Simulamos la base de datos de tickets que recibe el manager
  const [tickets, setTickets] = useState([
    {
      id: "TK-005",
      user: "cliente_1@empresa.com",
      subject: "Duda sobre el Bill of Lading",
      vin: "S321V-987654",
      status: "open",
      date: "Hace 10 min",
      priority: "high",
    },
    {
      id: "TK-004",
      user: "comprador_jdm@mail.com",
      subject: "Cambio de puerto destino",
      vin: "RU3-998877",
      status: "open",
      date: "Hace 2 horas",
      priority: "normal",
    },
    {
      id: "TK-003",
      user: "importaciones_mx@mail.com",
      subject: "Confirmación de pago SWIFT",
      vin: "N/A",
      status: "review",
      date: "Ayer",
      priority: "high",
    },
    {
      id: "TK-002",
      user: "cliente_1@empresa.com",
      subject: "Solicitud de fotos extra",
      vin: "LA600S-990011",
      status: "closed",
      date: "24 May",
      priority: "normal",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const ColumnHeader = ({ title, count, colorClass, icon: Icon }) => (
    <div
      className={`flex items-center justify-between pb-3 border-b-2 ${colorClass} mb-4`}
    >
      <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
        <Icon size={16} /> {title}
      </h3>
      <span className="text-xs font-black bg-slate-500/10 px-2 py-0.5 rounded-md">
        {count}
      </span>
    </div>
  );

  const TicketCard = ({ ticket }) => (
    <div
      className={`p-4 rounded-2xl border shadow-sm transition-all cursor-pointer hover:-translate-y-1 hover:shadow-md group ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700/80 hover:border-slate-500" : "bg-white border-slate-200 hover:border-slate-300"}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {ticket.id}
        </span>
        {ticket.priority === "high" && (
          <span
            className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
            title="Prioridad Alta"
          />
        )}
      </div>

      <h4
        className={`text-sm font-bold mb-2 leading-snug ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
      >
        {ticket.subject}
      </h4>

      <div className="space-y-1.5 mb-4">
        <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
          <User size={12} /> {ticket.user}
        </p>
        <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
          <Clock size={12} /> {ticket.date}
        </p>
      </div>

      <div
        className={`pt-3 border-t flex items-center justify-between ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}
      >
        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
          VIN: {ticket.vin}
        </span>
        <button
          className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg ${isDarkMode ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"}`}
        >
          <Reply size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Cabecera del Help Desk */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Mesa de Ayuda
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Gestión de Tickets de Clientes
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
              placeholder="Buscar ticket, cliente o VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-64 rounded-xl border py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
          <button
            className={`p-2 rounded-xl border transition-colors outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Tablero Estilo Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* COLUMNA 1: Abiertos (To Do) */}
        <div
          className={`rounded-3xl border p-4 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800/60" : "bg-slate-50/50 border-slate-200"}`}
        >
          <ColumnHeader
            title="Nuevos / Abiertos"
            count={tickets.filter((t) => t.status === "open").length}
            colorClass="border-red-500 text-red-500"
            icon={MessageSquare}
          />
          <div className="space-y-3">
            {tickets
              .filter((t) => t.status === "open")
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>

        {/* COLUMNA 2: En Revisión (In Progress) */}
        <div
          className={`rounded-3xl border p-4 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800/60" : "bg-slate-50/50 border-slate-200"}`}
        >
          <ColumnHeader
            title="En Revisión"
            count={tickets.filter((t) => t.status === "review").length}
            colorClass="border-amber-500 text-amber-500"
            icon={Clock}
          />
          <div className="space-y-3">
            {tickets
              .filter((t) => t.status === "review")
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>

        {/* COLUMNA 3: Resueltos (Done) */}
        <div
          className={`rounded-3xl border p-4 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-800/60" : "bg-slate-50/50 border-slate-200"}`}
        >
          <ColumnHeader
            title="Cerrados / Resueltos"
            count={tickets.filter((t) => t.status === "closed").length}
            colorClass="border-emerald-500 text-emerald-500"
            icon={CheckCircle2}
          />
          <div className="space-y-3">
            {tickets
              .filter((t) => t.status === "closed")
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
