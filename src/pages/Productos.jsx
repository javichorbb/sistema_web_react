import { useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import productos from "../data/productos.json"; // JSON con productos
import { CartContext } from "../components/CartCarrito";

export default function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [isFiltroAbierto, setIsFiltroAbierto] = useState(false); // Estado para controlar el panel desplegable
  const { agregarAlCarrito } = useContext(CartContext);

  // Obtener categorías únicas desde el JSON
  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        🎶 Catálogo de Productos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Panel lateral de categorías */}
        <aside className="md:col-span-1 bg-white shadow-lg rounded-2xl p-4 self-start">
          {/* Botón de filtro */}
          <button
            onClick={() => setIsFiltroAbierto(!isFiltroAbierto)} // Alternar el estado de despliegue
            className="w-full text-left px-4 py-2 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-100 transition duration-300"
          >
            Filtros
          </button>

          {/* Panel de categorías */}
          <div
            className={`mt-4 overflow-hidden transition-all duration-300 ${
              isFiltroAbierto ? "max-h-screen" : "max-h-0"
            }`}
          >
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada(cat);
                      setIsFiltroAbierto(false); // Cerrar el panel al seleccionar una categoría
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                      categoriaSeleccionada === cat
                        ? "bg-blue-600 text-white font-semibold shadow-lg"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Sección de productos */}
        <section className="md:col-span-3">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                onAgregar={() => agregarAlCarrito(p)}
              />
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No hay productos en esta categoria.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
