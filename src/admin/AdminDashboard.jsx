// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/productos")
      .then((r) => r.json())
      .then(setProductos)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8 pb-10">

      {/* ==== RESUMEN ==== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* CARD */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de productos</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">{productos.length}</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Stock disponible</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">
            {productos.reduce((s, p) => s + (Number(p.stock) || 0), 0)}
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">Categorías</h3>
          <p className="text-3xl font-bold mt-1 text-gray-800">
            {Array.from(new Set(productos.map((p) => p.categoria))).length}
          </p>
        </div>

      </section>




      {/* ==== ÚLTIMOS PRODUCTOS ==== */}
      <section className="bg-white shadow-md border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimos productos agregados</h2>

        {productos.length === 0 ? (
          <p className="text-gray-500">No hay productos todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.slice(-6).reverse().map((p) => (
              <div 
                key={p.id} 
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
              >
                <img 
                  src={p.imagen} 
                  alt={p.nombre} 
                  className="h-40 w-full object-cover" 
                />

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                  <p className="text-gray-500 text-sm mt-1">${p.precio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
