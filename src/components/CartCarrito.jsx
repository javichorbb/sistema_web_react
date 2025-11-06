import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export function CartCarrito({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Suponemos que el usuario activo se guarda en localStorage
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const exist = prev.find((p) => p.id === producto.id);
      if (exist) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    setIsOpen(true);
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nuevaCantidad = (p.cantidad || 1) + delta;
          return { ...p, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
        }
        return p;
      })
    );
  };

  const toggleCarrito = () => setIsOpen(!isOpen);

  const irAComprar = () => {
    if (!usuarioActivo) {
      alert("❌ Debes iniciar sesión antes de comprar.");
      navigate("/login");
      return;
    }
    setIsOpen(false);
    navigate("/compra", { state: { carrito } });
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        toggleCarrito,
        isOpen,
      }}
    >
      {children}

      {/* Panel lateral del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">🛒 Carrito</h2>
          <button
            onClick={toggleCarrito}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-150px)]">
          {carrito.length === 0 && (
            <p className="text-gray-500 text-center mt-6">
              El carrito está vacío
            </p>
          )}

          {carrito.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border-b pb-2">
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-16 h-16 object-contain rounded"
                />
              )}

              <div className="flex-1 flex flex-col">
                <span className="font-semibold">{p.nombre}</span>
                <span className="text-blue-600 font-bold">S/. {p.precio}</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => cambiarCantidad(p.id, -1)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{p.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(p.id, 1)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => quitarDelCarrito(p.id)}
                  className="text-red-500 hover:text-red-700 text-sm mt-1"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        {carrito.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-2">
            <h3 className="font-bold text-gray-700">
              Total: S/.{" "}
              {carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}
            </h3>
            <button
              onClick={irAComprar}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}
