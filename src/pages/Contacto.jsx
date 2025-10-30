export default function Contacto() {
  return (
    <div className="container mx-auto px-6 py-10 max-w-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📩 Contáctanos
      </h1>

      <form className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
        <label className="flex flex-col text-gray-700 font-medium">
          Nombre
          <input
            type="text"
            placeholder="Tu nombre"
            className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-medium">
          Correo electrónico
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-medium">
          Mensaje
          <textarea
            placeholder="Escribe tu mensaje..."
            rows="5"
            className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
