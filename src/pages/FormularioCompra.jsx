import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../components/CartCarrito"; // Importar el contexto

export default function FormularioCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCarrito } = useContext(CartContext); // Obtener setCarrito del contexto
  const carrito = location.state?.carrito || [];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Preparar datos para actualizar stock
      const productosParaActualizar = carrito.map((p) => ({
        id: p.id,
        cantidad: p.cantidad,
      }));

      // Enviar solicitud al backend
      const response = await fetch("http://localhost:5000/api/compra/actualizar-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productos: productosParaActualizar,
        }),
      });

      const data = await response.json();

      if (data.success) {
        //VACIAR EL CARRITO DESPUÉS DE LA COMPRA EXITOSA
        setCarrito([]);
        
        alert("¡Gracias por su compra!");
        
        navigate("/productos");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar tu compra. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
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
  ).toFixed(2);

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
            disabled={loading}
            className="w-full border rounded-lg p-2 focus:outline-blue-500 disabled:bg-gray-100"
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
            disabled={loading}
            className="w-full border rounded-lg p-2 focus:outline-blue-500 disabled:bg-gray-100"
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
            disabled={loading}
            className="w-full border rounded-lg p-2 focus:outline-blue-500 disabled:bg-gray-100"
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
            disabled={loading}
            className="w-full border rounded-lg p-2 focus:outline-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className="text-gray-700 font-semibold text-lg pt-2">
          Total a pagar: <span className="text-blue-600">S/. {total}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg transition font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>

      {/* Resumen del carrito */}
      <div className="max-w-lg mx-auto mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-3">Resumen de compra:</h3>
        <div className="space-y-2">
          {carrito.map((p) => (
            <div key={p.id} className="flex justify-between text-sm text-gray-600">
              <span>{p.nombre} x{p.cantidad}</span>
              <span>S/. {(p.precio * p.cantidad).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-gray-800">
          <span>Total:</span>
          <span>S/. {total}</span>
        </div>
      </div>
    </div>
  );
}