import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import { CartCarrito } from "./components/CartCarrito";

function App() {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario guardado al iniciar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <BrowserRouter>
      <CartCarrito>
      <Header usuario={usuario} setUsuario={setUsuario} />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login onLogin={setUsuario} />} />
          <Route path="/register" element={<Register setUsuario={setUsuario} />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
      </CartCarrito>
    </BrowserRouter>
  );
}

export default App;
