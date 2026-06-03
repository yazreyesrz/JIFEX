import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  CarFront,
  UploadCloud,
  Save,
  X,
  FileText,
  ImageIcon,
  AlertCircle,
  ListChecks,
  FileBadge,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import { mockVehicles } from "@/data/mockVehicles";

// =====================================================================
// COMPONENTE 1: FORMULARIO DE CREACIÓN Y EDICIÓN
// =====================================================================
const VehiculoForm = ({
  isDarkMode,
  currentCar,
  setCurrentCar,
  setIsEditing,
  onSave,
}) => {
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState("");

  const marcasOpciones = [
    "Toyota",
    "Honda",
    "Suzuki",
    "Daihatsu",
    "Nissan",
    "Mazda",
    "Subaru",
    "Mitsubishi",
  ];

  const equipamientoOpciones = [
    "Faros LED Inteligentes",
    "Cámara de Reversa 360°",
    "Smart Key / Botón Encendido",
    "Asientos Calefaccionados",
    "Sensor de Punto Ciego",
    "Apple CarPlay / Android Auto",
    "Sensores de Estacionamiento",
    "Asientos de Cuero",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, feature) => {
    const isChecked = e.target.checked;
    setCurrentCar((prev) => ({
      ...prev,
      equipamiento: isChecked
        ? [...prev.equipamiento, feature]
        : prev.equipamiento.filter((item) => item !== feature),
    }));
  };

  const handleFileUpload = (e, docKey) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentCar((prev) => ({
        ...prev,
        documentos: { ...prev.documentos, [docKey]: file },
      }));
    }
  };

  const nextStep = () => {
    setFormError("");
    if (step === 1) {
      if (
        !currentCar.marca ||
        !currentCar.modelo ||
        !currentCar.vin ||
        !currentCar.precioCNF
      ) {
        setFormError(
          "Por favor, completa Marca, Modelo, VIN y Precio para continuar.",
        );
        return;
      }
    } else if (step === 2) {
      if (
        !currentCar.kilometraje ||
        !currentCar.colorExterior ||
        !currentCar.gradoSubasta
      ) {
        setFormError(
          "Por favor, completa Kilometraje, Color y Grado de Subasta.",
        );
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setFormError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setFormError("");
    onSave(currentCar, currentCar);
  };

  const DocumentUploadBtn = ({ title, docKey }) => {
    const file = currentCar.documentos?.[docKey];
    return (
      <label
        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors outline-none active:scale-[0.98] ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 hover:border-slate-500" : "bg-slate-50 border-slate-200 hover:border-slate-300"}`}
      >
        <div className="flex items-center gap-3">
          <FileBadge
            size={16}
            className={file ? "text-emerald-500" : "text-amber-500"}
          />
          <span className="text-xs font-semibold">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold truncate max-w-[120px] ${file ? "text-emerald-500" : "text-slate-400"}`}
          >
            {file ? file.name : "Subir PDF"}
          </span>
          <Upload
            size={14}
            className={file ? "text-emerald-500" : "text-slate-400"}
          />
        </div>
        <input
          type="file"
          accept=".pdf, application/pdf"
          className="hidden"
          onChange={(e) => handleFileUpload(e, docKey)}
        />
      </label>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div
        className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h2
            className={`text-2xl font-black flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {currentCar.vin ? "Editar Vehículo" : "Publicar Nuevo Vehículo"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sigue los pasos para configurar la ficha técnica en el catálogo.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(false)}
          className={`p-2 rounded-xl border transition-colors outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div
          className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" : isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}
        />
        <div
          className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" : isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}
        />
        <div
          className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= 3 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" : isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
        <span className={step >= 1 ? "text-amber-500" : ""}>
          1. Datos Principales
        </span>
        <span className={step >= 2 ? "text-amber-500" : ""}>
          2. Ficha Técnica
        </span>
        <span className={step >= 3 ? "text-amber-500" : ""}>
          3. Documentación
        </span>
      </div>

      {formError && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border animate-in slide-in-from-top-2 ${isDarkMode ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-600"}`}
        >
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-xs font-bold uppercase tracking-wider">
            {formError}
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`rounded-3xl border p-6 md:p-8 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <CarFront size={16} className="text-amber-500" /> Información
                Básica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Marca JDM
                  </label>
                  <select
                    name="marca"
                    value={currentCar.marca || "Toyota"}
                    onChange={handleChange}
                    className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  >
                    {marcasOpciones.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Modelo Específico
                  </label>
                  <input
                    name="modelo"
                    type="text"
                    value={currentCar.modelo}
                    onChange={handleChange}
                    placeholder="Ej. Hijet Cargo"
                    className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                    Número de Chasis (VIN)
                  </label>
                  <input
                    name="vin"
                    type="text"
                    value={currentCar.vin}
                    onChange={handleChange}
                    placeholder="S321V-987654"
                    className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-sm font-mono outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-amber-500" : "bg-slate-50 border-slate-200 text-amber-600"}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                      Precio CNF
                    </label>
                    <input
                      name="precioCNF"
                      type="text"
                      value={currentCar.precioCNF}
                      onChange={handleChange}
                      placeholder="$0 USD"
                      className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-sm font-black outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-emerald-400" : "bg-slate-50 border-slate-200 text-emerald-600"}`}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 pl-1">
                      Estado
                    </label>
                    <select
                      name="estadoActual"
                      value={currentCar.estadoActual}
                      onChange={handleChange}
                      className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-xs font-semibold outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                    >
                      <option value="Disponible">Disponible</option>
                      <option value="En exportación">En exportación</option>
                      <option value="Embarcado">Embarcado</option>
                      <option value="En tránsito">En tránsito</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-6 h-fit ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-500">
              <ImageIcon size={16} /> Galería Visual
            </h3>
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center transition-colors cursor-pointer group ${isDarkMode ? "border-slate-700 hover:border-amber-500 bg-[#0b121f]/50" : "border-slate-300 hover:border-amber-400 bg-slate-50"}`}
            >
              <UploadCloud
                size={32}
                className="text-slate-400 group-hover:text-amber-500 mb-3 transition-colors"
              />
              <p
                className={`text-xs font-bold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Subir Fotografías
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                Arrastra imágenes JPG/PNG
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div
          className={`rounded-3xl border p-6 md:p-8 animate-in slide-in-from-right-4 duration-300 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
        >
          <h3
            className={`text-sm font-black uppercase tracking-wider mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <FileText size={16} className="text-amber-500" /> Especificaciones
            de Ficha Técnica
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Mileage / Kilometraje
              </label>
              <input
                name="kilometraje"
                type="text"
                value={currentCar.kilometraje}
                onChange={handleChange}
                placeholder="Ej. 16,800 km"
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Fuel Type
              </label>
              <select
                name="combustible"
                value={currentCar.combustible}
                onChange={handleChange}
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              >
                <option value="Gasolina">Gasolina</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Diésel">Diésel</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Transmission
              </label>
              <select
                name="transmision"
                value={currentCar.transmision}
                onChange={handleChange}
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              >
                <option value="Automática">Automática</option>
                <option value="CVT">CVT</option>
                <option value="Automática Dual Clutch">
                  Automática Dual Clutch
                </option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Drivetrain
              </label>
              <select
                name="traccion"
                value={currentCar.traccion}
                onChange={handleChange}
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              >
                <option value="2WD">2WD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">AWD</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Color Ext.
              </label>
              <input
                name="colorExterior"
                type="text"
                value={currentCar.colorExterior}
                onChange={handleChange}
                placeholder="Ej. Black"
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Auction Grade
              </label>
              <input
                name="gradoSubasta"
                type="text"
                value={currentCar.gradoSubasta}
                onChange={handleChange}
                placeholder="Ej. 4.5"
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Capacity
              </label>
              <select
                name="pasajeros"
                value={currentCar.pasajeros}
                onChange={handleChange}
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              >
                <option value="2 Plazas">2 Plazas</option>
                <option value="4 Plazas">4 Plazas</option>
                <option value="5 Plazas">5 Plazas</option>
                <option value="7 Plazas">7 Plazas</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 pl-1">
                Doors
              </label>
              <select
                name="puertas"
                value={currentCar.puertas}
                onChange={handleChange}
                className={`mt-1.5 w-full rounded-xl border py-2.5 px-4 text-xs outline-none focus:ring-2 focus:ring-amber-500/40 ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
              >
                <option value="2 Puertas">2 Puertas</option>
                <option value="3 Puertas">3 Puertas</option>
                <option value="4 Puertas">4 Puertas</option>
                <option value="5 Puertas">5 Puertas</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
          <div className="space-y-6">
            <div
              className={`rounded-3xl border p-6 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3
                className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                <ListChecks size={16} className="text-amber-500" /> Factory
                Equipment
              </h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                {equipamientoOpciones.map((opcion, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 hover:border-slate-600" : "bg-slate-50 border-slate-200 hover:border-slate-300"}`}
                  >
                    <input
                      type="checkbox"
                      checked={currentCar.equipamiento.includes(opcion)}
                      onChange={(e) => handleCheckboxChange(e, opcion)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-xs font-semibold">{opcion}</span>
                  </label>
                ))}
              </div>
            </div>

            <div
              className={`rounded-3xl border p-6 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
            >
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 text-amber-500">
                <FileBadge size={16} /> Logistics Dossier (PDF)
              </h3>
              <div className="space-y-3">
                <DocumentUploadBtn
                  title="Original Auction Sheet"
                  docKey="auctionSheet"
                />
                <DocumentUploadBtn
                  title="JAAI Inspection Certificate"
                  docKey="jaai"
                />
                <DocumentUploadBtn title="Bill of Lading (B/L)" docKey="bl" />
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl border p-6 h-fit ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <h3
              className={`text-sm font-black uppercase tracking-wider mb-5 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}
            >
              <FileText size={16} className="text-amber-500" /> Inspector's
              Report
            </h3>
            <textarea
              name="inspectorReport"
              value={currentCar.inspectorReport}
              onChange={handleChange}
              rows="12"
              placeholder="Escribe las observaciones oficiales aquí..."
              className={`w-full rounded-xl border p-4 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500/40 transition-all resize-none leading-relaxed ${isDarkMode ? "bg-[#0b121f]/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"}`}
            />
          </div>
        </div>
      )}

      <div
        className={`pt-6 border-t flex items-center ${step === 1 ? "justify-end" : "justify-between"} ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        {step > 1 && (
          <button
            onClick={prevStep}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors outline-none active:scale-95 border ${isDarkMode ? "bg-[#1e293b]/60 border-slate-700 text-slate-300 hover:bg-[#1e293b] hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <ArrowLeft size={16} /> Anterior
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] outline-none"
          >
            Siguiente <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] outline-none"
          >
            <Save size={16} /> Publicar Vehículo
          </button>
        )}
      </div>
    </div>
  );
};

// =====================================================================
// COMPONENTE 2: DATA GRID (Tabla del inventario dividida en dos vistas)
// =====================================================================
const CatalogoGrid = ({
  isDarkMode,
  vehicles,
  searchTerm,
  setSearchTerm,
  handleCreateNew,
  handleEdit,
  handleDeleteClick,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const filteredVehicles = vehicles.filter(
    (car) =>
      car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedVehicles = filteredVehicles.reduce((acc, car) => {
    const brand = car.marca || car.modelo.split(" ")[0] || "Otras Marcas";
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(car);
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
      >
        <div>
          <h1
            className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Gestión de Catálogo
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
            Administra el inventario global de JIFEX
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
              placeholder="Buscar por VIN o Modelo..."
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
            <span className="hidden sm:inline">Publicar Auto</span>
          </button>
        </div>
      </div>

      {!selectedBrand ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
          {Object.entries(groupedVehicles).map(([brand, cars]) => (
            <div
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`rounded-3xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 outline-none active:scale-95 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60 hover:bg-[#1e293b]/80 hover:border-blue-500/50" : "bg-white border-slate-200 hover:bg-blue-50/50 hover:border-blue-400"}`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-[#0b121f] text-slate-300" : "bg-slate-50 text-slate-600"}`}
              >
                <CarFront size={32} />
              </div>
              <h3
                className={`text-lg font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                {brand}
              </h3>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">
                {cars.length} Vehículos
              </span>
            </div>
          ))}
          {Object.keys(groupedVehicles).length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-400 text-sm">
              No se encontraron marcas con tu búsqueda.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
          <button
            onClick={() => setSelectedBrand(null)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition-colors cursor-pointer outline-none w-fit"
          >
            <ArrowLeft size={16} /> Volver a Marcas
          </button>

          <div
            className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead
                  className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? "bg-[#0b121f]/50 text-slate-400 border-slate-800" : "bg-slate-50 text-slate-500 border-slate-200"} border-b`}
                >
                  <tr>
                    <th className="px-6 py-4">Vehículo</th>
                    <th className="px-6 py-4">VIN / Chasis</th>
                    <th className="px-6 py-4">Precio CNF</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${isDarkMode ? "divide-slate-800/60" : "divide-slate-100"}`}
                >
                  {groupedVehicles[selectedBrand]?.map((car) => (
                    <tr
                      key={car.vin}
                      className={`transition-colors hover:${isDarkMode ? "bg-[#1e293b]/60" : "bg-slate-50/80"}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.fotos[0]}
                            alt={car.modelo}
                            className="w-12 h-8 rounded object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <p
                              className={`font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
                            >
                              {car.modelo}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {car.ano} • {car.kilometraje}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-amber-500 font-bold">
                        {car.vin}
                      </td>
                      <td
                        className={`px-6 py-4 font-black ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
                      >
                        {car.precioCNF}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[9px] font-black rounded border uppercase tracking-wider ${
                            car.estadoActual === "Disponible"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }`}
                        >
                          {car.estadoActual}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(car)}
                            className={`p-1.5 rounded-lg border transition-colors outline-none ${isDarkMode ? "border-slate-700 text-blue-400 hover:bg-blue-500/10" : "border-slate-200 text-blue-600 hover:bg-blue-50"}`}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(car.vin)}
                            className={`p-1.5 rounded-lg border transition-colors outline-none ${isDarkMode ? "border-slate-700 text-red-400 hover:bg-red-500/10" : "border-slate-200 text-red-600 hover:bg-red-50"}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================================
// ORQUESTADOR PRINCIPAL
// =====================================================================
export default function CatalogoManagerView({ isDarkMode }) {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, vin: null });

  const handleEdit = (car) => {
    setCurrentCar({
      ...car,
      marca: car.marca || car.modelo.split(" ")[0] || "Toyota",
      equipamiento: car.equipamiento || [],
      inspectorReport: car.inspectorReport || "",
      documentos: car.documentos || {
        auctionSheet: null,
        jaai: null,
        bl: null,
      },
    });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setCurrentCar({
      vin: "",
      idInterno: "",
      marca: "Toyota",
      modelo: "",
      ano: new Date().getFullYear(),
      precioCNF: "",
      estadoActual: "Disponible",
      kilometraje: "",
      combustible: "Gasolina",
      transmision: "Automática",
      traccion: "2WD",
      colorExterior: "",
      gradoSubasta: "4",
      pasajeros: "5 Plazas",
      puertas: "5 Puertas",
      equipamiento: ["Faros LED Inteligentes", "Cámara de Reversa 360°"],
      inspectorReport:
        "• Carrocería con pintura original de fábrica en excelentes condiciones.\n• Interior limpio sin quemaduras ni olores.",
      documentos: { auctionSheet: null, jaai: null, bl: null },
      fotos: [],
    });
    setIsEditing(true);
  };

  const handleSaveData = (formValues, completeCarData) => {
    setIsEditing(false);
    setCurrentCar(null);
  };

  const handleDeleteClick = (vin) => {
    setDeleteModal({ isOpen: true, vin });
  };

  const confirmDelete = () => {
    setVehicles(vehicles.filter((v) => v.vin !== deleteModal.vin));
    setDeleteModal({ isOpen: false, vin: null });
  };

  return (
    <>
      {isEditing && currentCar ? (
        <VehiculoForm
          isDarkMode={isDarkMode}
          currentCar={currentCar}
          setCurrentCar={setCurrentCar}
          setIsEditing={setIsEditing}
          onSave={handleSaveData}
        />
      ) : (
        <CatalogoGrid
          isDarkMode={isDarkMode}
          vehicles={vehicles}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleCreateNew={handleCreateNew}
          handleEdit={handleEdit}
          handleDeleteClick={handleDeleteClick}
        />
      )}

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
                Eliminar Vehículo
              </h3>
              <p
                className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                ¿Estás seguro de que deseas eliminar permanentemente el chasis{" "}
                <span className="font-bold text-amber-500">
                  {deleteModal.vin}
                </span>{" "}
                del catálogo? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, vin: null })}
                className={`flex-1 rounded-xl border font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer outline-none active:scale-95 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"}`}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-xs uppercase tracking-wider transition cursor-pointer shadow-lg active:scale-95"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
