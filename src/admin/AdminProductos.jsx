// src/pages/admin/AdminProductos.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const fetchProductos = () => {
    setCargando(true);
    fetch("http://localhost:5000/api/productos")
      .then((r) => r.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/productos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      alert("Producto eliminado");
      fetchProductos();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Productos</h2>

        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow
          hover:bg-green-700 transition"
        >
          <span className="text-lg">＋</span>
          <span className="font-medium">Nuevo producto</span>
        </Link>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        {cargando ? (
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        ) : productos.length === 0 ? (
          <p className="text-gray-600">No hay productos aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-3 px-3 text-sm font-semibold">ID</th>
                  <th className="py-3 px-3 text-sm font-semibold">Imagen</th>
                  <th className="py-3 px-3 text-sm font-semibold">Nombre</th>
                  <th className="py-3 px-3 text-sm font-semibold">Categoría</th>
                  <th className="py-3 px-3 text-sm font-semibold">Precio</th>
                  <th className="py-3 px-3 text-sm font-semibold">Stock</th>
                  <th className="py-3 px-3 text-sm font-semibold">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-4 text-gray-700">{p.id}</td>

                    <td className="px-3 py-4">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="h-14 w-24 rounded-lg object-cover border"
                      />
                    </td>

                    <td className="px-3 py-4 font-medium text-gray-800">
                      {p.nombre}
                    </td>

                    <td className="px-3 py-4 text-gray-600">
                      {p.categoria}
                    </td>

                    <td className="px-3 py-4 font-semibold">
                      ${p.precio}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          p.stock > 10
                            ? "bg-green-100 text-green-700"
                            : p.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>

                    <td className="px-3 py-4 flex gap-2">
                      {/* EDITAR */}
                      <button
                        onClick={() =>
                          navigate(`/admin/productos/editar/${p.id}`)
                        }
                        className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-lg
                        hover:bg-yellow-500 transition text-sm font-medium"
                      >
                        Editar
                      </button>

                      {/* ELIMINAR */}
                      <button
                        onClick={() => eliminar(p.id)}
                        className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg
                        hover:bg-red-700 transition text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
