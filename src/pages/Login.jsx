import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import usuariosData from "../data/usuarios.json";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosTotales = [...usuariosData, ...usuariosGuardados];

    const usuario = usuariosTotales.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      setError("");
      onLogin?.(usuario);
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      navigate("/");
    } else {
      setError("Usuario y/o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Iniciar Sesión
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Inicia sesión para continuar explorando tu pasión musical
        </p>

        {error && (
          <p className="text-red-500 bg-red-50 border border-red-200 rounded-md py-2 px-3 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={mostrarPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
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

          {/* Botón de inicio */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            INICIAR SESIÓN
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Crea una cuenta
          </button>
        </p>
      </div>
    </div>
  );
}
