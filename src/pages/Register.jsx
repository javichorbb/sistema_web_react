import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import usuariosData from "../data/usuarios.json";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosTotales = [...usuariosData, ...usuariosGuardados];

    const existe = usuariosTotales.find((u) => u.email === email);
    if (existe) {
      setMensaje("⚠️ El correo ya está registrado.");
      return;
    }

    const nuevoUsuario = { nombre, email, password };
    const nuevosUsuarios = [...usuariosGuardados, nuevoUsuario];
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

    setMensaje("Cuenta creada con éxito. Redirigiendo al login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Crea tu cuenta
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Únete a nuestra comunidad musical
        </p>

        {mensaje && (
          <p
            className={`text-center mb-3 p-2 rounded-md text-sm ${
              mensaje.includes("⚠️")
                ? "text-yellow-700 bg-yellow-100 border border-yellow-300"
                : "text-green-700 bg-green-100 border border-green-300"
            }`}
          >
            {mensaje}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={mostrarPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {mostrarPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            REGISTRARSE
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
