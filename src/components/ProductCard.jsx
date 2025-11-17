import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregar }) {
  const sinStock = producto.stock === 0;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-56 w-full object-contain rounded-t-2xl bg-white"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {producto.nombre}
      </h3>
      <p className="text-gray-500 mb-2">{producto.categoria}</p>

      {/* Indicador de stock */}
      <div className="mb-3">
        {producto.stock > 10 ? (
          <span className="text-green-600 text-sm">✓ Disponible</span>
        ) : producto.stock > 0 ? (
          <span className="text-orange-600 text-sm">
            ⚠ Últimas {producto.stock} unidades
          </span>
        ) : (
          <span className="text-red-600 text-sm">✗ Sin stock</span>
        )}
      </div>

      <span className="text-blue-600 font-bold text-xl mb-4">
        S/. {producto.precio}
      </span>

      <div className="flex justify-between gap-2 mt-auto">
        <button
          onClick={onAgregar}
          disabled={sinStock}
          className={`flex-1 py-2 rounded-full transition ${
            sinStock
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {sinStock ? "Sin stock" : "Agregar al carrito"}
        </button>

        <Link
          to={`/producto/${producto.id}`}
          className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-full hover:bg-gray-300 transition"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
