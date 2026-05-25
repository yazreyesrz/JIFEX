"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Alertas simuladas para mantener el comportamiento interactivo de la Fase 1
  const handleUnderConstruction = (e, section) => {
    e.preventDefault();
    alert(
      `📢 ${section} Simulado (Fase 1):\nEsta funcionalidad se conectará en la siguiente etapa de desarrollo.`,
    );
    setIsProfileOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    alert(
      "🔒 Sesión Cerrada:\nEl prototipo simulará el retorno a la pantalla de Login.",
    );
    setIsProfileOpen(false);
  };

  // Clases compartidas para los enlaces principales
  const linkClasses = (isActive) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-[#1e293b] text-[#f59e0b] font-semibold"
        : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
    }`;

  return (
    <nav className="bg-[#0f172a] border-b border-[#1e293b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Marca */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white">
                JIF<span className="text-[#f59e0b]">EX</span>
              </span>
              <span className="text-[10px] uppercase bg-[#1e293b] text-gray-400 px-1.5 py-0.5 rounded border border-gray-700">
                Tracking
              </span>
            </Link>
          </div>

          {/* Menú de Navegación Principal */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/inventario"
                className={linkClasses(
                  pathname.includes("/inventario") || pathname === "/",
                )}
              >
                📦 Catálogo / Inventario
              </Link>

              <a
                href="#mis-compras"
                onClick={(e) =>
                  handleUnderConstruction(e, "Historial de Adquisiciones")
                }
                className={linkClasses(pathname === "#mis-compras")}
              >
                🛒 Mis Compras
              </a>

              <Link
                href="/tracking"
                className={linkClasses(pathname.includes("/tracking"))}
              >
                🚢 Tracking Marítimo
              </Link>
            </div>
          </div>

          {/* Área de Usuario: Cuenta y Cierre de Sesión */}
          <div className="hidden md:block relative">
            <div className="flex items-center gap-4">
              {/* Indicador de modo */}
              <div className="flex items-center gap-2 bg-[#1e293b] px-2.5 py-1 rounded border border-gray-800">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[11px] text-gray-400 font-mono">
                  Modo Evaluador
                </span>
              </div>

              {/* Botón del Perfil / Cuenta */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none bg-[#1e293b]/50 p-1.5 rounded-full border border-gray-700 transition-colors"
                >
                  {/* Avatar Simulado */}
                  <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-[#0f172a] font-bold flex items-center justify-center text-xs">
                    U
                  </div>
                  <span className="text-xs hidden lg:inline-block pr-1">
                    Mi Cuenta ▾
                  </span>
                </button>

                {/* Menú Desplegable (Dropdown) */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#111827] border border-[#1e293b] ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 border-b border-[#1e293b]">
                      <p className="text-xs text-gray-400">Iniciado como</p>
                      <p className="text-sm font-medium text-white truncate">
                        usuario@jifex.com
                      </p>
                    </div>

                    <a
                      href="#perfil"
                      onClick={(e) =>
                        handleUnderConstruction(e, "Configuración de Cuenta")
                      }
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b] hover:text-[#f59e0b] transition-colors"
                    >
                      👤 Ver mi cuenta
                    </a>

                    <a
                      href="#logout"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 border-t border-[#1e293b] transition-colors"
                    >
                      🚪 Cerrar sesión
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
