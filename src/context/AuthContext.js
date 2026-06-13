"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Validar sesión activa en cookies/backend al cargar la aplicación
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error validando sesión:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // Función asíncrona conectada al backend real
  const login = async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);

        // 🌟 REDIRECCIÓN EXACTA SEGÚN EL ROL DE SUPABASE
        if (data.user.rol === "ADMIN") {
          router.push("/admin");
        } else if (data.user.rol === "MANAGER") {
          router.push("/manager");
        } else {
          router.push("/inventario");
        }
        return { success: true };
      } else {
        const errorData = await res.json();
        return {
          success: false,
          error: errorData.error || "ID de usuario o contraseña incorrectos.",
        };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: "Error de conexión con el servidor." };
    }
  };

  // Cierre de sesión real destruyendo cookies
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
