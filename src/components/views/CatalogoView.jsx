import React, { useState, useEffect } from "react";
import {
  Search,
  LayoutGrid,
  Car,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // 🌟 Importamos el motor de traducción
import CarGrid from "../shared/CarGrid";
import { mockVehicles } from "@/data/mockVehicles";

const CustomDropdown = ({ value, options, onChange, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all outline-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 active:scale-[0.97] cursor-pointer ${
          isDarkMode
            ? "bg-[#0b121f] border-slate-800 text-slate-300"
            : "bg-white border-slate-200 text-slate-700"
        }`}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-500" : "text-slate-400"}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 top-full left-0 right-0 mt-2 rounded-xl border shadow-2xl overflow-hidden py-1 ${
            isDarkMode
              ? "bg-[#111827] border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${
                value === opt.value
                  ? isDarkMode
                    ? "bg-amber-500/10 text-amber-500 font-black"
                    : "bg-amber-50 text-amber-600 font-black"
                  : isDarkMode
                    ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function CatalogoView({
  isDarkMode,
  selectedBrand,
  setSelectedBrand,
  favorites,
  toggleFavorite,
  convertPrice,
  compradoMock,
}) {
  const { t } = useTranslation(); // 🌟 Inicializamos el hook
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [yearFilter, setYearFilter] = useState("Todos");
  const [priceFilter, setPriceFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [
    selectedBrand,
    searchTerm,
    statusFilter,
    yearFilter,
    priceFilter,
    sortBy,
  ]);

  const availableBrands = [
    ...new Set(mockVehicles.map((car) => car.modelo.split(" ")[0])),
  ].filter(
    (brand) =>
      brand !== compradoMock.modelo.split(" ")[0] ||
      mockVehicles.filter(
        (c) => c.modelo.startsWith(brand) && c.vin !== compradoMock.vin,
      ).length > 0,
  );

  const brandStyles = {
    Toyota: { bgLight: "bg-red-50", text: "text-red-600" },
    Honda: { bgLight: "bg-blue-50", text: "text-blue-600" },
    Suzuki: { bgLight: "bg-sky-50", text: "text-sky-600" },
    Daihatsu: { bgLight: "bg-rose-50", text: "text-rose-600" },
    Nissan: { bgLight: "bg-slate-100", text: "text-slate-600" },
  };

  const getBrandStyle = (brand) =>
    brandStyles[brand] || { bgLight: "bg-amber-50", text: "text-amber-600" };

  const filteredVehicles = mockVehicles.filter((car) => {
    if (car.vin === compradoMock.vin) return false;
    if (
      selectedBrand &&
      !car.modelo.toLowerCase().startsWith(selectedBrand.toLowerCase())
    )
      return false;

    const matchesSearch =
      car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos" || car.estadoActual === statusFilter;
    const matchesYear =
      yearFilter === "Todos" || car.ano.toString() === yearFilter;
    const numericPrice = parseInt(car.precioCNF.replace(/[^0-9]/g, ""));
    const matchesPrice =
      priceFilter === "Todos" ||
      (priceFilter === "bajo" && numericPrice < 7000) ||
      (priceFilter === "alto" && numericPrice >= 7000);

    return matchesSearch && matchesStatus && matchesYear && matchesPrice;
  });

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === "cercania")
      return (a.diasParaEntrega || 0) - (b.diasParaEntrega || 0);
    const priceA = parseInt(a.precioCNF.replace(/[^0-9]/g, ""));
    const priceB = parseInt(b.precioCNF.replace(/[^0-9]/g, ""));
    if (sortBy === "precio-asc") return priceA - priceB;
    if (sortBy === "precio-desc") return priceB - priceA;
    if (sortBy === "ano-desc") return b.ano - a.ano;
    return 0;
  });

  if (!selectedBrand) {
    return (
      <div className="space-y-8">
        <div
          className={`border-b pb-4 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <h2
            className={`text-3xl font-black flex items-center gap-2 tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            <LayoutGrid className="text-amber-500" size={26} />{" "}
            {t("catalog.title")}
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            {t("catalog.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {availableBrands.map((brand) => {
            const style = getBrandStyle(brand);
            const count = mockVehicles.filter(
              (c) => c.modelo.startsWith(brand) && c.vin !== compradoMock.vin,
            ).length;
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`relative overflow-hidden flex flex-col items-center justify-center p-10 rounded-[2rem] border transition-all duration-500 ease-out group cursor-pointer text-center outline-none focus:outline-none focus:ring-4 focus:ring-amber-500/20 active:scale-[0.98] ${isDarkMode ? `bg-[#1e293b]/30 border-slate-800/60 hover:bg-[#1e293b]/70 hover:border-slate-700` : `bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-2xl hover:-translate-y-1`}`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500 group-hover:scale-110">
                  <Car size={180} className={style.text} />
                </div>
                <div
                  className={`h-16 w-16 mb-6 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1.5 ${isDarkMode ? "bg-[#0f172a]" : style.bgLight}`}
                >
                  <Car size={28} className={style.text} />
                </div>
                <h3
                  className={`text-2xl font-black tracking-tight mb-2 relative z-10 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  {brand}
                </h3>
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest relative z-10 ${style.text}`}
                >
                  {count} {t("catalog.models_count")}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedBrand(null)}
          className={`p-2.5 rounded-xl border transition-colors cursor-pointer outline-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 active:scale-90 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800 text-slate-400 hover:text-amber-500" : "bg-white border-slate-200 text-slate-600 hover:text-amber-600 shadow-sm"}`}
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h2
            className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {selectedBrand}
          </h2>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
            {t("catalog.available_models")}
          </p>
        </div>
      </div>

      <div
        className={`relative z-30 backdrop-blur-md p-5 rounded-3xl border transition-colors duration-300 shadow-xl space-y-4 ${isDarkMode ? "bg-[#1e293b]/40 border-slate-800/60" : "bg-white border-slate-200"}`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder={`${t("catalog.search_placeholder")} ${selectedBrand}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500/40 transition-all ${isDarkMode ? "border-slate-800 bg-[#0b121f]/60 text-white placeholder-slate-500" : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400"}`}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <CustomDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              isDarkMode={isDarkMode}
              options={[
                { label: t("catalog.filters.all_states"), value: "Todos" },
                { label: t("catalog.filters.available"), value: "Disponible" },
                {
                  label: t("catalog.filters.in_transit"),
                  value: "En tránsito",
                },
              ]}
            />
            <CustomDropdown
              value={yearFilter}
              onChange={setYearFilter}
              isDarkMode={isDarkMode}
              options={[
                { label: t("catalog.filters.all_years"), value: "Todos" },
                { label: `${t("catalog.filters.year")} 2022`, value: "2022" },
                { label: `${t("catalog.filters.year")} 2023`, value: "2023" },
              ]}
            />
            <CustomDropdown
              value={priceFilter}
              onChange={setPriceFilter}
              isDarkMode={isDarkMode}
              options={[
                { label: t("catalog.filters.any_price"), value: "Todos" },
                { label: t("catalog.filters.under_7k"), value: "bajo" },
                { label: t("catalog.filters.over_7k"), value: "alto" },
              ]}
            />
            <CustomDropdown
              value={sortBy}
              onChange={setSortBy}
              isDarkMode={isDarkMode}
              options={[
                { label: t("catalog.filters.sort_default"), value: "default" },
                { label: t("catalog.filters.sort_near"), value: "cercania" },
                { label: t("catalog.filters.sort_asc"), value: "precio-asc" },
                { label: t("catalog.filters.sort_desc"), value: "precio-desc" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`h-64 rounded-3xl border p-5 animate-pulse ${isDarkMode ? "border-slate-800 bg-[#1e293b]/20" : "border-slate-200 bg-slate-100"}`}
              />
            ))}
          </div>
        ) : (
          <CarGrid
            vehicles={sortedVehicles}
            isDarkMode={isDarkMode}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            convertPrice={convertPrice}
            sortBy={sortBy}
          />
        )}
      </div>
    </>
  );
}
