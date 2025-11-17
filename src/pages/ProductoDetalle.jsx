import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartCarrito";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  // Estados para manejar el producto y productos relacionados
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch del producto específico y productos relacionados
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // Obtener todos los productos
    fetch(`${API_BASE}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          // Buscar el producto específico
          const productoEncontrado = data.find((p) => p.id === parseInt(id));
          setProducto(productoEncontrado);

          // Si existe el producto, buscar relacionados
          if (productoEncontrado) {
            const productosRelacionados = data.filter(
              (p) =>
                p.categoria === productoEncontrado.categoria &&
                p.id !== productoEncontrado.id
            );
            setRelacionados(productosRelacionados);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]); // Se vuelve a ejecutar cuando cambia el id

  // Estado de carga
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="text-gray-600">Cargando producto...</div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Error al cargar el producto
        </h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <Link
          to="/productos"
          className="text-blue-600 hover:underline mt-4 block"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  // Si no existe el producto
  if (!producto) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Producto no encontrado
        </h2>
        <Link
          to="/productos"
          className="text-blue-600 hover:underline mt-4 block"
        >
          Volver a productos
        </Link>
      </div>
    );
  }

  const sinStock = producto.stock === 0;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen grande */}
        <div className="relative">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="rounded-2xl shadow-lg object-contain w-full h-[450px] bg-white border border-gray-200"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {producto.nombre}
          </h1>
          <p className="text-gray-500 text-lg mb-3">
            Categoría: {producto.categoria}
          </p>

          {/* Indicador de stock */}
          <div className="mb-4">
            {producto.stock > 10 ? (
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-semibold">✓ En stock</span>
                <span className="text-gray-500">
                  ({producto.stock} unidades disponibles)
                </span>
              </div>
            ) : producto.stock > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-orange-600 font-semibold">
                  ⚠ Stock limitado
                </span>
                <span className="text-gray-500">
                  (Solo quedan {producto.stock} unidades)
                </span>
              </div>
            ) : (
              <span className="text-red-600 font-semibold">✗ Sin stock</span>
            )}
          </div>

          <p className="text-2xl text-blue-600 font-bold mb-5">
            S/. {producto.precio}
          </p>
          <p className="text-gray-600 mb-5">{producto.descripcion}</p>

          <button
            onClick={() => agregarAlCarrito(producto)}
            disabled={sinStock}
            className={`py-3 px-6 rounded-full transition w-fit ${
              sinStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {sinStock ? "Producto no disponible" : "Agregar al carrito"}
          </button>

          <Link
            to="/productos"
            className="text-blue-600 hover:underline mt-6 inline-block"
          >
            ← Volver a productos
          </Link>
        </div>
      </div>

      {/* Productos relacionados */}
      {relacionados.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Productos relacionados
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                onAgregar={() => agregarAlCarrito(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
