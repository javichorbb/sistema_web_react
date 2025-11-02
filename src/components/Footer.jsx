function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Columna 1 - Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Musical World</h2>
          <p className="text-sm">
            Tu tienda de confianza para instrumentos musicales, accesorios y equipos de sonido.
            Inspiramos tu pasión por la música.
          </p>
        </div>

        {/* Columna 2 - Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Enlaces rápidos</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Inicio</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Productos</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contacto</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Mi cuenta</a></li>
          </ul>
        </div>

        {/* Columna 3 - Información */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Información</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Sobre nosotros</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Términos y condiciones</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Política de privacidad</a></li>
          </ul>
        </div>

        {/* Columna 4 - Contacto */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contáctanos</h3>
          <p className="text-sm">📍 Lima, Perú</p>
          <p className="text-sm">📞 +51 999 888 777</p>
          <p className="text-sm">✉️ contacto@webmusical.com</p>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Musical World. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
