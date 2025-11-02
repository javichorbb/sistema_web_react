import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosData from "../data/usuarios.json";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
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

    setMensaje("✅ Cuenta creada con éxito. Redirigiendo al login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>
      {mensaje && <p className="text-center text-blue-600 mb-2">{mensaje}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre completo"
          className="p-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
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
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-4 text-center flex flex-col gap-2">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Ir al login
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
