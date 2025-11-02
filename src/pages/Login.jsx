import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosData from "../data/usuarios.json";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/"); // redirige al home
    } else {
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>

      <div className="mt-4 text-center flex flex-col gap-2">
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Crear cuenta
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
