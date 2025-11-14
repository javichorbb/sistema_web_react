import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo") || "null");

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-sm border-r transition-all duration-300 ${open ? "w-64" : "w-20"}`}
        style={{ position: 'relative' }} // Para que el botón quede dentro del contenedor
      >
        {/* TOP / TOGGLE */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2
            className={`text-xl font-bold tracking-tight transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            Administrador
          </h2>
        </div>

        {/* Botón de abrir/cerrar el sidebar */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 transition absolute top-4 right-4"
          aria-label={open ? "Cerrar el menú lateral" : "Abrir el menú lateral"}
          style={{
            width: "40px", // Tamaño fijo para el botón
            height: "40px", // Asegura que el botón sea clickeable
            fontSize: "20px", // Ajusta el tamaño de la flecha
          }}
        >
          {open ? (
            <span>←</span> // Flecha para cerrar
          ) : (
            <span>→</span> // Flecha para abrir
          )}
        </button>

        {/* NAV */}
        <nav className="mt-4 px-3 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open && <span className="font-medium">📊 Dashboard</span>}
          </Link>

          <Link
            to="/admin/productos"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open && <span className="font-medium">📦 Productos</span>}
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-semibold">Panel de administración</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona productos y contenido</p>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
