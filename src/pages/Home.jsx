import { useContext, useEffect, useState } from "react";
import ProductoCard from "../components/ProductCard";
import imagenesCarrusel from "../data/carrusel.json";
import Carousel from "../components/Carousel";
import { CartContext } from "../components/CartCarrito";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Home({ searchQuery }) {
  // Estados para manejar los productos desde la API
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener la función agregarAlCarrito del contexto
  let agregarAlCarrito = () => {};
  try {
    const ctx = useContext(CartContext);
    if (ctx && ctx.agregarAlCarrito) agregarAlCarrito = ctx.agregarAlCarrito;
  } catch (e) {}

  // Fetch de productos desde la API
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API_BASE}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        if (mounted) setProductos(data);
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
  }, []);

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Estados de carga y error
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <Carousel images={imagenesCarrusel} />
        <div className="text-center text-gray-600 mt-10">
          Cargando productos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10">
        <Carousel images={imagenesCarrusel} />
        <div className="text-center text-red-600 mt-10">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <Carousel images={imagenesCarrusel} />

      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Página Principal
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              onAgregar={() => agregarAlCarrito(p)}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No se encontraron productos
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
