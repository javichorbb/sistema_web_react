// src/pages/admin/AdminProductoNuevo.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProductoNuevo() {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.categoria) {
      return alert("Nombre y categoría son requeridos");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          categoria: form.categoria,
          precio: Number(form.precio),
          stock: Number(form.stock),
          imagen: form.imagen,
          descripcion: form.descripcion,
        }),
      });

      if (!res.ok) throw new Error("Error");

      alert("Producto creado");
      navigate("/admin/productos");
    } catch (err) {
      alert("No se pudo crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Nuevo producto</h2>

      <div className="grid grid-cols-3 gap-8">
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-5 col-span-2">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
              focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium">Categoría</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Precio</label>
              <input
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium">Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Imagen (URL)</label>
              <input
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion"
              rows="4"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 
              focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 
              transition disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Crear Producto"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/productos")}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* PREVIEW IMAGEN */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center shadow-inner">
          {form.imagen ? (
            <img
              src={form.imagen}
              alt="Vista previa"
              className="rounded-xl shadow-lg w-full h-[350px] object-cover"
            />
          ) : (
            <p className="text-gray-500 text-center">Sin imagen</p>
          )}
        </div>
      </div>
    </div>
  );
}
