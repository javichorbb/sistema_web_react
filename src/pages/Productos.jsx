import { useState } from "react";
import ProductCard from "../components/ProductCard";
import productos from "../data/productos.json"; // tu JSON de productos

export default function Productos() {
  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

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

        {/* Panel lateral con categorías */}
        <aside className="md:col-span-1 bg-white shadow-md rounded-2xl p-4 self-start">
          <h2 className="text-lg font-semibold text-gray-800 mb">
            Categorias
          </h2>
          <ul className="space-y-2">
            {categorias.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategoriaSeleccionada(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    categoriaSeleccionada === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                  }`}>
                    {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>


        {/* Sección de productos */}
        <section className="md:col-span-3">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((p) => (
              <ProductCard key={p.id} producto={p} />
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
