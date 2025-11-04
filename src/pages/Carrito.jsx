import { useContext } from "react";
import { CartContext } from "../components/CartCarrito";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  return (
    <div>
      <h2>🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((p) => (
              <li key={p.id}>
                {p.nombre} x {p.cantidad} - S/ {p.precio * p.cantidad}
                <button onClick={() => eliminarDelCarrito(p.id)}>❌</button>
              </li>
            ))}
          </ul>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <h3>
            Total: S/{" "}
            {carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}
          </h3>
        </>
      )}
    </div>
  );
}
