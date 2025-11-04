import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartCarrito({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Agregar producto al carrito
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
    setIsOpen(true); // abre carrito al agregar
  };

  // Quitar producto del carrito
  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // Cambiar cantidad de un producto
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

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
          {carrito.length === 0 && (
            <p className="text-gray-500">El carrito está vacío</p>
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
      </div>
    </CartContext.Provider>
  );
}
