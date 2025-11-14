import { useEffect, useState, useContext } from 'react'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../components/CartCarrito' // ajusta si tu export es diferente

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filtros / UI
  const [isFiltroAbierto, setIsFiltroAbierto] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')

  // carrito (opcional)
  let agregarAlCarrito = () => {}
  try {
    const ctx = useContext(CartContext)
    if (ctx && ctx.agregarAlCarrito) agregarAlCarrito = ctx.agregarAlCarrito
  } catch (e) {
    // si no existe context, se ignora
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`${API_BASE}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener productos')
        return res.json()
      })
      .then((data) => { if (mounted) setProductos(data) })
      .catch((err) => { console.error(err); if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) return <div>Cargando productos...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  const categorias = ['Todas', ...Array.from(new Set(productos.map(p => p.categoria)))]

  const productosFiltrados = productos.filter(p =>
    categoriaSeleccionada === 'Todas' ? true : p.categoria === categoriaSeleccionada
  )

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">🎶 Catálogo de Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 bg-white shadow-lg rounded-2xl p-4 self-start">
          <button
            onClick={() => setIsFiltroAbierto(!isFiltroAbierto)}
            className="w-full text-left px-4 py-2 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-100 transition duration-300"
          >
            Filtros
          </button>

          <div className={`mt-4 overflow-hidden transition-all duration-300 ${isFiltroAbierto ? "max-h-screen" : "max-h-0"}`}>
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => { setCategoriaSeleccionada(cat); setIsFiltroAbierto(false) }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                      categoriaSeleccionada === cat ? "bg-blue-600 text-white font-semibold shadow-lg" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="md:col-span-3">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                onAgregar={() => agregarAlCarrito(p)}
              />
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No hay productos en esta categoría.</p>
          )}
        </section>
      </div>
    </div>
  )
}