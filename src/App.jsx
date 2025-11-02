import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario activo desde localStorage al iniciar la app
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header usuario={usuario} setUsuario={setUsuario} />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/register" element={<Register setUsuario={setUsuario} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
