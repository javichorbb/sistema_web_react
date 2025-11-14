// src/pages/admin/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  // lee usuario desde localStorage
  const usuario = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("usuarioActivo") || "null")
    : null;

  if (!usuario) {
    // no está logueado
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol !== "admin") {
    // está logueado pero no es admin
    return <Navigate to="/" replace />;
  }

  // si es admin, renderiza las subrutas (Outlet)
  return <Outlet />;
}
