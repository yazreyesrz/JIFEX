"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Ship,
  Car,
  ArrowRight,
  LogIn,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  X,
  Search,
  FileText,
  CheckCircle,
  Globe2,
  ChevronRight,
  Building,
  Clock,
  FileBadge,
} from "lucide-react";

export default function JifexLandingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500/30">
      {/* ================= HEADER PREMIUM ================= */}
      <nav
        className={`fixed w-full z-40 top-0 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-2" : "bg-transparent py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo(0, 0)}
            >
              <ShieldCheck size={32} className="text-amber-500" />
              <span className="text-3xl font-extrabold tracking-wider text-slate-900">
                JIF<span className="text-amber-500">EX</span>
              </span>
            </div>

            {/* Enlaces de Navegación (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider outline-none"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("operations")}
                className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider outline-none"
              >
                Operations
              </button>
              <button
                onClick={() => scrollToSection("platform")}
                className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider outline-none"
              >
                Platform
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider outline-none"
              >
                Contact
              </button>
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="hidden lg:block text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider outline-none"
              >
                Request Access
              </button>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-2.5 px-5 sm:px-6 rounded-xl transition-all shadow-lg active:scale-95 outline-none"
              >
                <LogIn size={16} /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0b121f]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto Hero */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                B2B Export Japan → Pakistan
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                We make the invisible, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  visible.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Most buyers in Pakistan buy blind. We break that mold with total
                transparency: check inventory, review documents, and track your
                vehicle in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/login"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 outline-none"
                >
                  Client Portal <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-all active:scale-95 outline-none"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Ilustración / Dashboard Preview Abstracto */}
            <div className="hidden lg:block relative perspective-1000">
              <div className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="ml-4 h-4 w-32 bg-slate-800 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                        <Car className="text-slate-400" />
                      </div>
                      <div>
                        <div className="h-3 w-24 bg-slate-600 rounded-full mb-2"></div>
                        <div className="h-2 w-16 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold rounded-lg uppercase">
                      In Transit
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
                        <Car className="text-slate-400" />
                      </div>
                      <div>
                        <div className="h-3 w-32 bg-slate-600 rounded-full mb-2"></div>
                        <div className="h-2 w-20 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-lg uppercase">
                      Available
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="h-24 bg-slate-800/50 border border-slate-700/50 rounded-2xl"></div>
                    <div className="h-24 bg-slate-800/50 border border-slate-700/50 rounded-2xl"></div>
                    <div className="h-24 bg-slate-800/50 border border-slate-700/50 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOBRE NOSOTROS Y MÉTRICAS ================= */}
      <section id="about" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Experts in the Japan - Pakistan trade corridor
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Pakistan maintains strict regulations that only allow the import
                of vehicles less than 3 years old. Combined with the strong
                local preference for Japanese brands, the market demands
                precision and quality.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                JIFEX was born to directly connect the best auction houses in
                Japan with an established and reliable distribution network in
                Pakistani territory.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold">
                    JP
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-xs font-bold">
                    PK
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  International Alliances
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <p className="text-5xl font-black text-amber-500 mb-2">
                  &lt; 3
                </p>
                <p className="text-sm font-black text-slate-900 mb-1">
                  Years Old
                </p>
                <p className="text-xs text-slate-500">
                  Strict regulatory limit met on every import.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-0 sm:mt-12">
                <p className="text-5xl font-black text-blue-500 mb-2">25</p>
                <p className="text-sm font-black text-slate-900 mb-1">
                  Transit Days
                </p>
                <p className="text-xs text-slate-500">
                  Optimized maritime logistics from Japanese ports.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <p className="text-5xl font-black text-emerald-500 mb-2">3</p>
                <p className="text-sm font-black text-slate-900 mb-1">
                  Key Cities
                </p>
                <p className="text-xs text-slate-500">
                  Distribution network in Karachi, Islamabad, and Lahore.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-0 sm:mt-12">
                <p className="text-5xl font-black text-indigo-500 mb-2">180</p>
                <p className="text-sm font-black text-slate-900 mb-1">
                  Vehicles / Year
                </p>
                <p className="text-xs text-slate-500">
                  Operational goal for high-quality imports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PILARES OPERATIVOS ================= */}
      <section id="operations" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Our Operating Model
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
              We guarantee recent and high-demand models like Daihatsu Mira,
              Hijet, and Suzuki Alto through three fundamental pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Sourcing in Japan
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Comprehensive selection through authorized auction houses (e.g.,
                Apple Miwa), ensuring recent models with low mileage and
                inspection certification.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Ship size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Logistics Operations
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Precise coordination of export inspection, customs paperwork,
                shipping in certified yards, and continuous maritime tracking to
                Pakistan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <Globe2 size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                Distribution in Pakistan
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We work with an established network of strategic business
                partners in Karachi, Islamabad, and Lahore, with consolidated
                experience in wholesale and showrooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLATAFORMA DIGITAL ================= */}
      <section
        id="platform"
        className="py-24 bg-[#0b121f] text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              The Technology Platform
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
              The JIFEX brand is no longer sold on personal relationships, but
              on evidence. Discover the tools that empower our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Car size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">
                    Real-Time Premium Inventory
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Browse the complete catalog. Review technical specs with
                    photo galleries, auction grades, and official inspector
                    reports, without needing to contact an agent.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Clock size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">
                    5-Stage Logistics Tracking
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Follow your investment step by step. Clear visual indicators
                    for: Available, In Export, Shipped, In Transit, and
                    Delivered.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <FileBadge size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2">
                    Centralized Document Management
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Securely download your JAAI (Japan Auto Appraisal Institute)
                    certificates, original auction sheets, and Bill of Lading
                    (B/L).
                  </p>
                </div>
              </div>
            </div>

            <div className="relative lg:ml-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-6 w-32 bg-slate-700 rounded-md"></div>
                  <div className="h-6 w-16 bg-blue-500/20 rounded-md"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${idx < 3 ? "bg-emerald-500 text-white" : idx === 3 ? "bg-blue-500 animate-pulse text-white" : "bg-slate-700 text-slate-500"}`}
                      >
                        {idx < 3 ? (
                          <CheckCircle size={12} />
                        ) : (
                          <div className="w-2 h-2 bg-current rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 h-12 bg-slate-700/50 rounded-xl flex items-center px-4 border border-slate-600/50">
                        <div
                          className={`h-2 rounded-full ${idx < 3 ? "w-24 bg-emerald-500/50" : idx === 3 ? "w-32 bg-blue-500" : "w-20 bg-slate-600"}`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN DE CONTACTO ================= */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 md:p-12 bg-amber-500 text-slate-900 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-black mb-4">
                    Want to join JIFEX?
                  </h3>
                  <p className="font-medium text-amber-900 mb-10 leading-relaxed">
                    Our B2B platform is a closed environment. If you are an
                    importer or distributor in Pakistan, contact us to evaluate
                    your profile and generate secure access credentials.
                  </p>

                  <div className="space-y-6">
                    <a
                      href="mailto:info@jifex.jp"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          Corporate Email
                        </p>
                        <p className="text-lg font-black">info@jifex.jp</p>
                      </div>
                    </a>

                    <a
                      href="tel:+81312345678"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          Direct Line (Japan)
                        </p>
                        <p className="text-lg font-black">+81 3 1234 5678</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-12 text-white">
                <h3 className="text-2xl font-black mb-8">Our Operations</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                      <Building size={24} />
                    </div>
                    <h4 className="text-xl font-bold">Japan Head Office</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Minato City, Tokyo, Japan.
                      <br />
                      Auction management, technical inspection, and maritime
                      export coordination.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <MapPin size={24} />
                    </div>
                    <h4 className="text-xl font-bold">Pakistan Network</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Operational hubs in:
                      <br />
                      • Karachi (Port)
                      <br />
                      • Islamabad
                      <br />• Lahore
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CORPORATIVO ================= */}
      <footer className="bg-slate-950 py-16 border-t border-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={28} className="text-amber-500" />
                <span className="text-2xl font-extrabold tracking-wider text-white">
                  JIF<span className="text-amber-500">EX</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm mb-6">
                Redefining the export of used vehicles from Japan to Pakistan
                through technology, transparency, and flawless logistics.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer">
                  <span className="font-bold text-xs">IN</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer">
                  <span className="font-bold text-xs">FB</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-wider mb-6 text-sm">
                Platform
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Client Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Vehicle Tracking
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-amber-500 transition-colors outline-none"
                  >
                    Request Access
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-wider mb-6 text-sm">
                Legal
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Export Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 JIFEX Vehicle Exports. All rights reserved.</p>
            <p>Closed B2B Platform V1.0</p>
          </div>
        </div>
      </footer>

      {/* ================= MODAL DE ACCESO RÁPIDO ================= */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative text-center p-10">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors outline-none"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Request Access
            </h2>
            <p className="text-sm text-slate-500 mb-8 font-medium">
              Go to the contact section on the main page to find our offices or
              send us an email to:
            </p>
            <a
              href="mailto:info@jifex.jp"
              className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl w-full transition-colors"
            >
              info@jifex.jp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
