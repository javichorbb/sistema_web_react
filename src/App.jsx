import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import FormularioCompra from "./pages/FormularioCompra";

import { CartCarrito } from "./components/CartCarrito";

// ADMIN
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProductos from "./admin/AdminProductos";
import AdminProductoNuevo from "./admin/AdminProductoNuevo";
import AdminProductoEditar from "./admin/AdminProductoEditar";


// RUTA PROTEGIDA ADMIN
function RutaProtegidaAdmin({ usuario, cargandoUsuario, children }) {

  // ⏳ Evita redirigir mientras carga localStorage
  if (cargandoUsuario) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  // ❌ Si no hay usuario → login
  if (!usuario) return <Navigate to="/login" />;

  // ❌ Si no es admin → home
  if (usuario.rol !== "admin") return <Navigate to="/" />;

  // ✔ OK
  return children;
}


function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  // Cargar usuario guardado al iniciar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargandoUsuario(false); // <--- muy importante
  }, []);

  return (
    <BrowserRouter>
      <CartCarrito>

        <Header usuario={usuario} setUsuario={setUsuario} />

        <main>
          <Routes>

            {/* --- RUTAS PÚBLICAS / USUARIO --- */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login onLogin={setUsuario} />} />
            <Route path="/register" element={<Register setUsuario={setUsuario} />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/compra" element={<FormularioCompra />} />

            {/* --- RUTAS ADMIN — PROTEGIDAS --- */}
            <Route
              path="/admin/*"
              element={
                <RutaProtegidaAdmin usuario={usuario} cargandoUsuario={cargandoUsuario}>
                  <AdminLayout />
                </RutaProtegidaAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="productos/nuevo" element={<AdminProductoNuevo />} />
              <Route path="productos/editar/:id" element={<AdminProductoEditar />} />
            </Route>

          </Routes>
        </main>

        <Footer />

      </CartCarrito>
    </BrowserRouter>
  );
}

export default App;
