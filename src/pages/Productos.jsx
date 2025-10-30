import ProductCard from "../components/ProductCard";
import productos from "../data/productos.json"; // tu JSON de productos

export default function Productos() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        🎶 Todos los Productos
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productos.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
