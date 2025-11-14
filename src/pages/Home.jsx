import productos from "../data/productos.json";
import ProductoCard from "../components/ProductCard";
import { CartContext } from '../components/CartCarrito'

function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        🎶 Página Principal
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
