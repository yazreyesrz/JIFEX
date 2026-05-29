"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Limpiar sesión al reiniciar si se desea, o persistencia básica mock
  const login = (username, password) => {
    if (username === "ADMINJIFEX" && password === "admin2026") {
      const adminUser = {
        id: username,
        role: "admin",
        name: "Equipo JIFEX Admin",
      };
      setUser(adminUser);
      localStorage.setItem("jifex_session", JSON.stringify(adminUser));
      router.push("/admin");
      return { success: true };
    } else if (username === "MANAGERJIFEX" && password === "manager2026") {
      // 🌟 AQUÍ ESTÁ EL NUEVO USUARIO MANAGER
      const managerUser = {
        id: username,
        role: "manager",
        name: "Manager de Operaciones",
      };
      setUser(managerUser);
      localStorage.setItem("jifex_session", JSON.stringify(managerUser));
      router.push("/manager");
      return { success: true };
    } else if (username === "CLIENTE123" && password === "jifex2026") {
      const clientUser = {
        id: username,
        role: "client",
        name: "Comprador Activo",
      };
      setUser(clientUser);
      localStorage.setItem("jifex_session", JSON.stringify(clientUser));
      router.push("/inventario");
      return { success: true };
    }

    return { success: false, error: "ID de usuario o contraseña incorrectos." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jifex_session");
    router.push("/");
  };

  useEffect(() => {
    const saved = localStorage.getItem("jifex_session");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
