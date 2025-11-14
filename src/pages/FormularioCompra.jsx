import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FormularioCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const carrito = location.state?.carrito || [];
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ ¡Gracias por su compra!");
    window.location.href = "/productos";
  };

  if (carrito.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">
          No hay productos en el carrito.
        </h2>
      </div>
    );
  }

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        🧾 Formulario de Compra
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Nombre y Apellidos
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        <div className="text-gray-700 font-semibold">
          Total a pagar: <span className="text-blue-600">S/. {total}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
}
