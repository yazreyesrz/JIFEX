import React, { useState } from "react";
import { Building, Mail, Phone, Search } from "lucide-react";

export default function ClientesAdminView({ isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("");

  const activeClients = [
    {
      id: "CL-001",
      nombre: "Auto Imports MX",
      contacto: "Roberto Gómez",
      email: "contacto@autoimports.mx",
      telefono: "+52 55 1234 5678",
      compras: 12,
      status: "VIP",
    },
    {
      id: "CL-002",
      nombre: "Pacific Autos Chile",
      contacto: "Camila Rojas",
      email: "ventas@pacificautos.cl",
      telefono: "+56 9 8765 4321",
      compras: 8,
      status: "Activo",
    },
    {
      id: "CL-003",
      nombre: "Global Motors JP",
      contacto: "Kenji Sato",
      email: "sales@globalmotors.jp",
      telefono: "+81 3 1234 5678",
      compras: 5,
      status: "Activo",
    },
    {
      id: "CL-004",
      nombre: "Importadora del Valle",
      contacto: "Luis Medina",
      email: "luis.m@delvalle.co",
      telefono: "+57 300 123 4567",
      compras: 1,
      status: "Nuevo",
    },
  ];

  const filteredClients = activeClients.filter(
    (client) =>
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Directorio B2B
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Cartera de clientes y contacto rápido
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
              placeholder="Buscar por empresa o contacto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full sm:w-64 rounded-xl border py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead
              className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? "bg-[#0b121f]/50 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"}`}
            >
              <tr>
                <th className="px-6 py-4">Empresa / Cliente</th>
                <th className="px-6 py-4">Persona de Contacto</th>
                <th className="px-6 py-4">Historial</th>
                <th className="px-6 py-4 text-right">Contacto Directo</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
            >
              {filteredClients.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-slate-400 text-sm"
                  >
                    No se encontraron clientes.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                  >
                    <td className="px-6 py-4">
                      <p
                        className={`font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {client.nombre}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-slate-400">
                          {client.id}
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            client.status === "VIP"
                              ? "bg-amber-500/10 text-amber-500"
                              : client.status === "Nuevo"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {client.status}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      {client.contacto}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-500 bg-slate-500/10 px-2.5 py-1 rounded-lg">
                        {client.compras} Compras
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`mailto:${client.email}`}
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
