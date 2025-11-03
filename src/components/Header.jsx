import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";

export default function Header({ usuario, setUsuario }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold transition"
      : "text-gray-700 hover:text-blue-600 transition";

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Musical World
        </h1>

        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/productos" className={linkClass}>Productos</NavLink>
          <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
        </nav>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar instrumentos..."
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {usuario ? (
            <>
              <span className="text-gray-700 font-medium">Hola, {usuario.nombre}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <User className="mr-2" size={18} />
              Mi cuenta
            </NavLink>
          )}

          <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
            <ShoppingCart size={18} />
          </button>
        </div>

        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t text-center space-y-4 py-4 shadow-md">
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/productos" className={linkClass} onClick={() => setMenuOpen(false)}>Productos</NavLink>
          <NavLink to="/contacto" className={linkClass} onClick={() => setMenuOpen(false)}>Contacto</NavLink>

          <div className="flex items-center justify-center px-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-3 py-2 w-2/3 rounded-full border border-gray-300 text-gray-700 outline-none"
            />
            <button className="ml-2 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700">
              <Search size={16} />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {usuario ? (
              <>
                <span className="text-gray-700 font-medium">Hola, {usuario.nombre}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Mi cuenta
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
