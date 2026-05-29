import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Building,
  Car,
  X,
  Save,
  CheckCircle2,
  KeyRound,
  User, // 🌟 Importamos nuevos íconos para las credenciales
} from "lucide-react";
import { mockVehicles } from "@/data/mockVehicles";

// Base de datos simulada de clientes (ahora incluye username y password)
const mockClientes = [
  {
    id: "CL-001",
    nombre: "Auto Imports MX",
    email: "contacto@autoimports.mx",
    telefono: "+52 55 1234 5678",
    direccion: "Polanco, CDMX, México",
    username: "AUTOIMPORTS",
    password: "password123",
    autosAsignados: ["S321V-987654", "LA350S-123456"],
  },
  {
    id: "CL-002",
    nombre: "Juan Pérez",
    email: "juan.perez@mail.com",
    telefono: "+56 9 8765 4321",
    direccion: "Providencia, Santiago, Chile",
    username: "CLIENTE123",
    password: "jifex2026",
    autosAsignados: ["RU3-998877"],
  },
];

export default function ClientesManagerView({ isDarkMode }) {
  const [clientes, setClientes] = useState(mockClientes);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (cliente) => {
    setCurrentClient({ ...cliente });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setCurrentClient({
      id: `CL-00${clientes.length + 1}`,
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      username: "",
      password: "",
      autosAsignados: [],
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });
  };

  // Función para marcar/desmarcar un auto asignado a este cliente
  const handleAssignCar = (vin) => {
    setCurrentClient((prev) => {
      const isAssigned = prev.autosAsignados.includes(vin);
      return {
        ...prev,
        autosAsignados: isAssigned
          ? prev.autosAsignados.filter((id) => id !== vin)
          : [...prev.autosAsignados, vin],
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !currentClient.nombre ||
      !currentClient.email ||
      !currentClient.username ||
      !currentClient.password
    ) {
      alert("El nombre, correo, usuario y contraseña son obligatorios.");
      return;
    }

    // Si ya existe lo actualizamos, si no lo agregamos
    const exists = clientes.find((c) => c.id === currentClient.id);
    if (exists) {
      setClientes(
        clientes.map((c) => (c.id === currentClient.id ? currentClient : c)),
      );
    } else {
      setClientes([currentClient, ...clientes]);
    }

    setIsEditing(false);
    setCurrentClient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar al cliente ${id}?`)) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  // ================= VISTA 1: FORMULARIO DE CLIENTE =================
  if (isEditing && currentClient) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div
          className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <div>
            <h2
              className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <UserPlus className="text-blue-500" size={24} />
              {currentClient.id.includes(clientes.length + 1)
                ? "Registrar Nuevo Cliente"
                : "Editar Cliente"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Ingresa sus datos, asigna sus credenciales de acceso y enlaza sus
              vehículos.
            </p>
          </div>
          <button
            onClick={() => setIsEditing(false)}
            className={`p-2 rounded-xl border transition-colors outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* COLUMNA 1: DATOS Y CREDENCIALES DEL CLIENTE */}
          <div className="space-y-6">
            {/* CREDENCIALES DE ACCESO (NUEVO) */}
            <div
              className={`rounded-3xl border p-6 md:p-8 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <KeyRound size={16} className="text-amber-500" /> Credenciales
                de Acceso
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Usuario (Login ID)
                  </label>
                  <div className="relative mt-1.5">
                    <User
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="username"
                      type="text"
                      value={currentClient.username}
                      onChange={handleChange}
                      placeholder="Ej. CLIENTE123"
                      className={`w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-amber-500" : "bg-slate-50 border-slate-200 text-amber-600"}`}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Contraseña
                  </label>
                  <div className="relative mt-1.5">
                    <KeyRound
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="password"
                      type="text"
                      value={currentClient.password}
                      onChange={handleChange}
                      placeholder="Asigna una contraseña"
                      className={`w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                      required
                    />
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mt-3 flex items-center gap-1.5">
                Con estos datos el cliente podrá iniciar sesión en la plataforma
                JIFEX.
              </p>
            </div>

            {/* INFORMACIÓN DE CONTACTO */}
            <div
              className={`rounded-3xl border p-6 md:p-8 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <Building size={16} className="text-blue-500" /> Información de
                Contacto
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Nombre Completo / Compañía
                  </label>
                  <input
                    name="nombre"
                    value={currentClient.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Auto Imports MX"
                    className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="email"
                        type="email"
                        value={currentClient.email}
                        onChange={handleChange}
                        placeholder="correo@empresa.com"
                        className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                      Número de Teléfono
                    </label>
                    <div className="relative">
                      <Phone
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="telefono"
                        type="text"
                        value={currentClient.telefono}
                        onChange={handleChange}
                        placeholder="+52 55 1234 5678"
                        className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Dirección de Entrega / Facturación
                  </label>
                  <div className="relative">
                    <MapPin
                      size={14}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <textarea
                      name="direccion"
                      value={currentClient.direccion}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Ingresa la dirección completa..."
                      className={`mt-1.5 w-full rounded-xl border py-2.5 pl-9 pr-4 text-xs outline-none resize-none focus:ring-2 focus:ring-blue-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] outline-none"
              >
                <Save size={16} /> Guardar Perfil de Cliente
              </button>
            </div>
          </div>

          {/* COLUMNA 2: ASIGNACIÓN DE VEHÍCULOS */}
          <div
            className={`rounded-3xl border p-6 md:p-8 flex flex-col h-full ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div className="mb-4">
              <h3
                className={`text-sm font-black uppercase tracking-wider flex items-center justify-between ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <span className="flex items-center gap-2">
                  <Car size={16} className="text-amber-500" /> Asignar Vehículos
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">
                  {currentClient.autosAsignados.length} Seleccionados
                </span>
              </h3>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                Selecciona los autos que este cliente compró. Al guardarlos,
                aparecerán en su sección de "Mi Flota" y "Tracking" de forma
                automática.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[550px]">
              {mockVehicles.map((car) => {
                const isSelected = currentClient.autosAsignados.includes(
                  car.vin,
                );
                return (
                  <label
                    key={car.vin}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${isSelected ? (isDarkMode ? "bg-amber-500/10 border-amber-500/40" : "bg-amber-50 border-amber-300") : isDarkMode ? "bg-[#0b121f]/50 border-slate-700 hover:border-slate-500" : "bg-slate-50 border-slate-200 hover:border-slate-300"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={car.fotos[0]}
                          alt={car.modelo}
                          className="w-14 h-10 object-cover rounded-md border border-slate-300/20"
                        />
                        {isSelected && (
                          <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white rounded-full">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
                        >
                          {car.modelo}
                        </p>
                        <p className="text-[9px] font-mono text-slate-400 mt-0.5">
                          VIN: {car.vin}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAssignCar(car.vin)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ================= VISTA 2: LISTA DE CLIENTES =================
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Gestión de Clientes
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Administra perfiles y asignación de compras
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
              placeholder="Buscar cliente o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full sm:w-64 rounded-xl border py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#1e293b]/50 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
          <button
            onClick={handleCreateNew}
            className="shrink-0 flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 outline-none"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Nuevo Cliente</span>
          </button>
        </div>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead
              className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? "bg-[#0b121f]/50 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"} border-b`}
            >
              <tr>
                <th className="px-6 py-4">Cliente / Compañía</th>
                <th className="px-6 py-4">Contacto & Acceso</th>
                <th className="px-6 py-4">Autos Comprados</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
            >
              {filteredClientes.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-slate-400 text-sm"
                  >
                    No se encontraron clientes.
                  </td>
                </tr>
              ) : (
                filteredClientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p
                          className={`font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {cliente.nombre}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: {cliente.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] space-y-1.5">
                        <p
                          className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                        >
                          <Mail size={12} className="text-slate-400" />{" "}
                          {cliente.email}
                        </p>
                        <p
                          className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                        >
                          <User size={12} className="text-slate-400" /> Usuario:{" "}
                          <span className="font-bold text-amber-500">
                            {cliente.username}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider ${
                          cliente.autosAsignados.length > 0
                            ? isDarkMode
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                            : isDarkMode
                              ? "bg-slate-800 text-slate-500 border-slate-700"
                              : "bg-slate-100 text-slate-400 border-slate-200"
                        }`}
                      >
                        <Car size={12} /> {cliente.autosAsignados.length}{" "}
                        Vehículos
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(cliente)}
                          className={`p-1.5 rounded-lg border transition-colors outline-none ${isDarkMode ? "border-slate-700 text-blue-400 hover:bg-blue-500/10" : "border-slate-200 text-blue-600 hover:bg-blue-50"}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cliente.id)}
                          className={`p-1.5 rounded-lg border transition-colors outline-none ${isDarkMode ? "border-slate-700 text-red-400 hover:bg-red-500/10" : "border-slate-200 text-red-600 hover:bg-red-50"}`}
                        >
                          <Trash2 size={16} />
                        </button>
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
