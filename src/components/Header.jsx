import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import { CartContext } from "./CartCarrito";

// ➤ AGREGADO: Se incluye onSearch porque lo usas en el input
export default function Header({ usuario, setUsuario, onSearch }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { carrito, toggleCarrito } = useContext(CartContext);

  const totalItems = carrito.reduce((acc, it) => acc + (it.cantidad || 0), 0);

  /* Esto agregue */
  const [searchTerm, setSearchTerm] = useState("");

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
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/productos" className={linkClass}>
            Productos
          </NavLink>
          <NavLink to="/contacto" className={linkClass}>
            Contacto
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Buscar instrumentos..."
            className="bg-transparent outline-none flex-1 text-gray-700"
            value={searchTerm}

            // ➤ AGREGADO: Aquí se actualiza el estado y se envía el término al padre
            onChange={(e) => { 
              setSearchTerm(e.target.value);     // Actualiza el input
              onSearch(e.target.value);          // Llama a la función de búsqueda
            }}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {usuario ? (
            <>
              <span className="text-gray-700 font-medium">
                Hola, {usuario.nombre}
              </span>
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

          <button
            onClick={toggleCarrito}
            className="relative flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
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
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/productos"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Productos
          </NavLink>
          <NavLink
            to="/contacto"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </NavLink>
        </div>
      )}
    </header>
  );
}
