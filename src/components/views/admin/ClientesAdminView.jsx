"use client";

import React, { useState, useEffect } from "react";
import { Building, Mail, Phone, Search, Loader2, User } from "lucide-react";

export default function ClientesAdminView({ isDarkMode }) {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const res = await fetch("/api/admin/clientes");
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (error) {
        console.error("Error cargando clientes de admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientsData();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.displayId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusStyle = (status) => {
    if (status === "VIP") {
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Directorio de Clientes
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Control de cuentas importadoras registradas
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
              placeholder="Buscar cliente, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full sm:w-64 rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden shadow-xl transition-colors duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead
              className={`text-xs uppercase tracking-wider font-bold border-b ${isDarkMode ? "bg-[#0b121f]/50 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"}`}
            >
              <tr>
                <th className="px-6 py-4">ID Cliente</th>
                <th className="px-6 py-4">Cliente / Compañía</th>
                <th className="px-6 py-4">Contacto Principal</th>
                <th className="px-6 py-4">Correo Electrónico</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4 text-center">Compras</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
            >
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2
                        size={32}
                        className="text-blue-500 animate-spin"
                      />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Consultando Supabase...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-16 text-center text-xs font-bold uppercase tracking-wider text-slate-400"
                  >
                    No se encontraron importadores en la base de datos
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                  >
                    {/* 🌟 USAMOS EL DISPLAY ID PARA LA VISTA */}
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">
                      {client.displayId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-[#0b121f] text-slate-400" : "bg-slate-100 text-slate-500"}`}
                        >
                          <Building size={16} />
                        </div>
                        <span
                          className={`font-black text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {client.nombre}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 text-xs font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="text-blue-500/70" />
                        {client.contacto}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400 font-bold">
                      {client.email}
                    </td>
                    <td
                      className={`px-6 py-4 text-xs font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                    >
                      {client.telefono}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 text-xs font-black bg-blue-500/10 text-blue-500 rounded-full">
                        {client.compras} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[9px] font-black rounded border uppercase tracking-wider ${getStatusStyle(client.status)}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* 🌟 AGREGAMOS TARGET="_BLANK" PARA QUE ABRA EN PESTAÑA NUEVA */}
                        <a
                          href={`mailto:${client.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border transition-colors outline-none flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                          title="Enviar Correo"
                        >
                          <Mail size={14} className="text-indigo-500" />{" "}
                          <span className="hidden sm:inline">Email</span>
                        </a>

                        <a
                          href={`tel:${client.telefono}`}
                          className={`p-2 rounded-lg border transition-colors outline-none flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                          title="Llamar"
                        >
                          <Phone size={14} className="text-emerald-500" />{" "}
                          <span className="hidden sm:inline">Llamar</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
