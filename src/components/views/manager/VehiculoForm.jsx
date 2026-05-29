import React, { useState } from "react";
import {
  UploadCloud,
  X,
  FileText,
  ImageIcon,
  AlertCircle,
  ListChecks,
  FileBadge,
  Upload,
  Save,
  CarFront,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function VehiculoForm({
  isDarkMode,
  currentCar,
  setCurrentCar,
  setIsEditing,
  onSave,
}) {
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

  // Controlamos los inputs manualmente para poder validar entre pasos
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

  // Navegación del Wizard con validación
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
    // Como ya validamos en los pasos anteriores, enviamos directamente
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
      {/* HEADER Y BOTÓN CERRAR */}
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

      {/* BARRA DE PROGRESO */}
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

      {/* BANNER DE ERROR GLOBAL */}
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

      {/* ================= PASO 1: DATOS PRINCIPALES Y FOTOS ================= */}
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
                {/* 🌟 AQUÍ SEPARAMOS MARCA Y MODELO */}
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

      {/* ================= PASO 2: ESPECIFICACIONES TÉCNICAS ================= */}
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

      {/* ================= PASO 3: DOCUMENTOS Y EXTRAS ================= */}
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

      {/* ================= CONTROLES DE NAVEGACIÓN BOTTOM ================= */}
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
}
