import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "JIFEX - Inventario & Tracking",
  description: "Plataforma de visibilidad logística Japón a Pakistán",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
