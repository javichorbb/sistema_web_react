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
        // Verificar que no exceda el stock
        if (exist.cantidad >= producto.stock) {
          alert(`⚠️ No puedes agregar más. Solo hay ${producto.stock} unidades disponibles.`);
          return prev;
        }
        
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
        );
      } else {
        // Verificar stock al agregar por primera vez
        if (producto.stock === 0) {
          alert("⚠️ Este producto no tiene stock disponible.");
          return prev;
        }
        
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
          
          // Validar que no baje de 1
          if (nuevaCantidad < 1) return { ...p, cantidad: 1 };
          
          // Validar que no exceda el stock
          if (nuevaCantidad > p.stock) {
            alert(`⚠️ Solo hay ${p.stock} unidades disponibles.`);
            return p;
          }
          
          return { ...p, cantidad: nuevaCantidad };
        }
        return p;
      })
    );
  };

  const vaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      setCarrito([]);
    }
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

  const calcularTotal = () => {
    return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2);
  };

  const calcularCantidadTotal = () => {
    return carrito.reduce((acc, p) => acc + p.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        toggleCarrito,
        isOpen,
        setCarrito,
      }}
    >
      {children}

      {/* Panel lateral del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del carrito */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">🛒 Carrito</h2>
            {carrito.length > 0 && (
              <span className="text-sm text-gray-500">
                ({calcularCantidadTotal()})
              </span>
            )}
          </div>
          <button
            onClick={toggleCarrito}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-4">
          {carrito.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-5xl mb-3">🛍️</div>
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {carrito.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 border rounded"
                >
                  {p.imagen && (
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="w-16 h-16 object-contain"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm truncate">
                      {p.nombre}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      S/. {p.precio.toFixed(2)}
                    </p>
                    {/* Mostrar stock disponible */}
                    <p className="text-xs text-gray-500 mt-1">
                      Stock: {p.stock} unidades
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1 border rounded">
                      <button
                        onClick={() => cambiarCantidad(p.id, -1)}
                        className="w-7 h-7 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-sm">
                        {p.cantidad}
                      </span>
                      <button
                        onClick={() => cambiarCantidad(p.id, 1)}
                        disabled={p.cantidad >= p.stock}
                        className={`w-7 h-7 ${
                          p.cantidad >= p.stock
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => quitarDelCarrito(p.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con botones */}
        {carrito.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>S/. {calcularTotal()}</span>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
              <button
                onClick={irAComprar}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Comprar
              </button>
              <button
                onClick={vaciarCarrito}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}