import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregar }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="h-56 w-full object-contain rounded-t-2xl bg-white"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
      <p className="text-gray-500 mb-4">{producto.categoria}</p>
      <span className="text-blue-600 font-bold text-xl mb-4">
        S/. {producto.precio}
      </span>

      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={onAgregar}
          className="flex-1 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
        >
          Agregar al carrito
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
