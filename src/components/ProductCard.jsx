function ProductCard({ producto }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="rounded-xl h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{producto.nombre}</h3>
      <p className="text-gray-500 mb-4">{producto.categoria}</p>
      <span className="text-blue-600 font-bold text-xl mb-4">
        S/. {producto.precio}
      </span>
      <button className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
