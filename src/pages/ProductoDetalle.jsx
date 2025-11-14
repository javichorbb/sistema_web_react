import { useParams, Link } from "react-router-dom";
import productos from "../data/productos.json";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { CartContext } from "../components/CartCarrito";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  // Buscar el producto correspondiente en el JSON
  const producto = productos.find((p) => p.id === parseInt(id));

  // Si no existe, mostrar mensaje de error
  if (!producto) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">Producto no encontrado</h2>
        <Link to="/productos" className="text-blue-600 hover:underline mt-4 block">
          Volver a productos
        </Link>
      </div>
    );
  }

  // Productos relacionados (misma categoría)
  const relacionados = productos.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen grande */}
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="rounded-2xl shadow-lg object-contain w-full h-[450px] bg-white border border-gray-200"
        />

        {/* Información */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{producto.nombre}</h1>
          <p className="text-gray-500 text-lg mb-3">Categoría: {producto.categoria}</p>
          <p className="text-2xl text-blue-600 font-bold mb-5">S/. {producto.precio}</p>
          <p className="text-gray-600 mb-5">{producto.descripcion}</p>

          <button
            onClick={() => agregarAlCarrito(producto)}
            className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition w-fit"
          >
            Agregar al carrito
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