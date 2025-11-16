import productos from "../data/productos.json";
import ProductoCard from "../components/ProductCard";

function Home({ searchQuery }) {

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        🎶 Página Principal
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No se encontraron productos 😢
          </p>
        )}

      </div>
    </div>
  );
}

export default Home;
