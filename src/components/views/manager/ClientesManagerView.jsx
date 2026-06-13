import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Key,
  Contact,
  CarFront,
  Save,
  X,
  Search,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Edit,
} from "lucide-react";

export default function ClientesManagerView({ isDarkMode }) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
  });
  const [selectedVins, setSelectedVins] = useState([]);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type }), 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resVehiculos, resClientes] = await Promise.all([
          fetch("/api/vehiculos"),
          fetch("/api/clientes"),
        ]);

        if (resVehiculos.ok) setAvailableVehicles(await resVehiculos.json());
        if (resClientes.ok) setClientes(await resClientes.json());
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleVehicle = (vin) => {
    setSelectedVins((prev) =>
      prev.includes(vin) ? prev.filter((v) => v !== vin) : [...prev, vin],
    );
  };

  const handleEditClient = (cliente) => {
    setSelectedClient(cliente);
    setFormData({
      username: cliente.username,
      password: "",
      nombre: cliente.nombre,
      correo: cliente.email || "",
      telefono: cliente.telefono || "",
      direccion: cliente.direccion || "",
    });
    setSelectedVins(cliente.vehiculosComprados?.map((v) => v.vin) || []);
    setIsCreating(true);
  };

  const handleCloseForm = () => {
    setIsCreating(false);
    setSelectedClient(null);
    setFormData({
      username: "",
      password: "",
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
    });
    setSelectedVins([]);
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const method = selectedClient ? "PUT" : "POST";
    const body = {
      ...formData,
      vins: selectedVins,
      id: selectedClient?.id,
    };

    try {
      const res = await fetch("/api/clientes", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const clienteProcesado = await res.json();

        if (selectedClient) {
          setClientes(
            clientes.map((c) =>
              c.id === clienteProcesado.id ? clienteProcesado : c,
            ),
          );
          showToast(
            `¡Perfil actualizado! Se asignaron ${selectedVins.length} vehículos.`,
            "success",
          );
        } else {
          setClientes([clienteProcesado, ...clientes]);
          showToast(
            `¡Perfil creado! Cliente guardado con ${selectedVins.length} vehículos asignados.`,
            "success",
          );
        }

        // Refrescar los vehículos disponibles en segundo plano para que desaparezcan de la lista
        const resVehiculos = await fetch("/api/vehiculos");
        if (resVehiculos.ok) setAvailableVehicles(await resVehiculos.json());

        setTimeout(() => {
          handleCloseForm();
        }, 2000);
      } else {
        showToast(
          selectedClient
            ? "Error al actualizar."
            : "Error al guardar. Verifica que el usuario o correo no estén repetidos.",
          "error",
        );
      }
    } catch (error) {
      showToast("Error de conexión con el servidor.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 🌟 FILTRO INTELIGENTE DE VEHÍCULOS
  const vehiculosVisibles = availableVehicles.filter((car) => {
    // Si el auto no tiene dueño, lo mostramos disponible
    if (!car.clienteId) return true;
    // Si estamos editando a un cliente, le mostramos sus propios autos para que pueda desmarcarlos si quiere
    if (selectedClient && car.clienteId === selectedClient.id) return true;
    // Si el auto ya tiene un dueño diferente, lo ocultamos por completo
    return false;
  });

  if (isCreating) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 relative">
        {toast.visible && (
          <div
            className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-top-10 fade-in duration-300 ${
              toast.type === "error"
                ? isDarkMode
                  ? "bg-red-500/20 border-red-500/30 text-red-400"
                  : "bg-red-50/90 border-red-200 text-red-600"
                : isDarkMode
                  ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-50/90 border-emerald-200 text-emerald-600"
            }`}
          >
            {toast.type === "error" ? (
              <AlertCircle size={20} className="shrink-0" />
            ) : (
              <CheckCircle2 size={20} className="shrink-0" />
            )}
            <p className="text-sm font-bold tracking-wide">{toast.message}</p>
          </div>
        )}

        <div
          className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <div>
            <h2
              className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              {selectedClient ? (
                <Edit className="text-amber-500" size={24} />
              ) : (
                <UserPlus className="text-blue-500" size={24} />
              )}
              {selectedClient
                ? "Editar Perfil de Cliente"
                : "Registrar Nuevo Cliente"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {selectedClient
                ? "Modifica sus datos de contacto o ajusta su flota de vehículos asignada."
                : "Ingresa sus datos, asigna sus credenciales de acceso y enlaza sus vehículos."}
            </p>
          </div>
          <button
            onClick={handleCloseForm}
            className={`p-2 rounded-xl border transition-colors outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSaveClient}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <div
              className={`rounded-3xl border p-6 sm:p-8 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3 className="text-sm font-black uppercase tracking-wider mb-6 flex items-center gap-2 text-amber-500">
                <Key size={16} /> Credenciales de Acceso
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                    Usuario (Login ID)
                  </label>
                  <div className="relative">
                    <UserPlus
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={!!selectedClient}
                      required
                      placeholder="Ej. CLIENTE123"
                      className={`w-full rounded-xl border py-3 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600 disabled:opacity-50" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 disabled:bg-slate-100"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Key
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!selectedClient}
                      placeholder={
                        selectedClient
                          ? "Escribe para cambiarla"
                          : "Asigna una contraseña"
                      }
                      className={`w-full rounded-xl border py-3 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                    />
                  </div>
                </div>
              </div>
              {selectedClient && (
                <p className="text-[10px] text-amber-500 font-bold mt-3 pl-1">
                  Nota: Déjalo en blanco si no deseas cambiar la contraseña del
                  cliente.
                </p>
              )}
            </div>

            <div
              className={`rounded-3xl border p-6 sm:p-8 shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3 className="text-sm font-black uppercase tracking-wider mb-6 flex items-center gap-2 text-blue-500">
                <Contact size={16} /> Información de Contacto
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                    Nombre Completo / Compañía
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej. Auto Imports MX"
                    className={`w-full rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      placeholder="correo@empresa.com"
                      className={`w-full rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                      Número de Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="+52 55 1234 5678"
                      className={`w-full rounded-xl border py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1 block mb-1.5">
                    Dirección de Entrega / Facturación
                  </label>
                  <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Ingresa la dirección completa..."
                    className={`w-full rounded-xl border py-3 px-4 text-sm min-h-[80px] resize-none outline-none focus:ring-2 focus:ring-blue-500/40 transition-all ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`w-full flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] outline-none disabled:opacity-70 ${selectedClient ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20" : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20"}`}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSaving
                ? "Guardando..."
                : selectedClient
                  ? "Actualizar Perfil de Cliente"
                  : "Guardar Perfil de Cliente"}
            </button>
          </div>

          {/* 🌟 COLUMNA DERECHA: ASIGNACIÓN DE VEHÍCULOS (CON FILTRO APLICADO) */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 flex flex-col h-[750px] shadow-sm ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-amber-500">
                <CarFront size={16} /> Asignar Vehículos
              </h3>
              <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {selectedVins.length} Seleccionados
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mb-6 leading-relaxed">
              Selecciona los autos que este cliente compró. Los autos que ya
              están asignados a otros clientes no se mostrarán aquí.
            </p>

            <div
              className={`flex-1 overflow-y-auto pr-2 space-y-3 rounded-2xl p-2 border ${isDarkMode ? "bg-[#0b121f]/30 border-slate-800/50" : "bg-slate-50/50 border-slate-100"}`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50">
                  <Loader2
                    size={32}
                    className="text-amber-500 animate-spin mb-2"
                  />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Cargando catálogo...
                  </p>
                </div>
              ) : vehiculosVisibles.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50 text-center px-4">
                  <CarFront size={32} className="text-slate-400 mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    No hay autos disponibles
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Todos los autos en el catálogo ya fueron asignados a otros
                    clientes.
                  </p>
                </div>
              ) : (
                vehiculosVisibles.map((car) => (
                  <label
                    key={car.vin}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${selectedVins.includes(car.vin) ? (isDarkMode ? "bg-amber-500/10 border-amber-500/30 shadow-md" : "bg-amber-50 border-amber-300 shadow-sm") : isDarkMode ? "bg-[#1e293b]/60 border-slate-700 hover:border-slate-500" : "bg-white border-slate-200 hover:border-slate-300"}`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          car.fotos?.[0] ||
                          "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop"
                        }
                        alt={car.modelo}
                        className="w-16 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <p
                          className={`text-sm font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {car.modelo}
                        </p>
                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          VIN: {car.vin}
                        </p>
                      </div>
                    </div>
                    <div className="pr-2">
                      <input
                        type="checkbox"
                        checked={selectedVins.includes(car.vin)}
                        onChange={() => handleToggleVehicle(car.vin)}
                        className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ================= VISTA: LISTA DE CLIENTES =================
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
            Administra los perfiles y accesos de tus importadores
          </p>
        </div>
        <button
          onClick={() => {
            handleCloseForm();
            setIsCreating(true);
          }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 outline-none"
        >
          <UserPlus size={16} /> Registrar Cliente
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 size={40} className="text-blue-500 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Cargando base de datos...
          </p>
        </div>
      ) : clientes.length === 0 ? (
        <div
          className={`p-16 text-center rounded-3xl border border-dashed ${isDarkMode ? "border-slate-800 bg-[#1e293b]/10" : "border-slate-300 bg-slate-50"}`}
        >
          <Users size={48} className="mx-auto mb-4 text-slate-400 opacity-50" />
          <p
            className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            No tienes clientes registrados aún
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Haz clic en "Registrar Cliente" para comenzar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-300">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              onClick={() => handleEditClient(cliente)}
              className={`group rounded-3xl border p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:border-slate-600" : "bg-white border-slate-200 hover:border-slate-300"}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}
                  >
                    {cliente.nombre.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase flex items-center gap-2 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    ID: {cliente.username} <Edit size={12} />
                  </span>
                </div>

                <h3
                  className={`text-lg font-black leading-tight mb-4 line-clamp-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {cliente.nombre}
                </h3>

                <div className="space-y-2 mb-6">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Mail size={14} className="text-slate-400" />{" "}
                    {cliente.email || "Sin correo"}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Phone size={14} className="text-slate-400" />{" "}
                    {cliente.telefono || "Sin teléfono"}
                  </p>
                </div>
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Flota Asignada
                </span>
                <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase">
                  {cliente.vehiculosComprados?.length || 0} Vehículos
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
