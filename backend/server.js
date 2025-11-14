import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from 'path'


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(bodyParser.json());

const DATA_PATH = "./data/usuarios.json";

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(DATA_PATH));

  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({
      success: false,
      message: "Credenciales inválidas"
    });
  }

  // DEVUELVE LOS DATOS DEL USUARIO
  res.json({
    success: true,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    }
  });
});


// REGISTER
app.post("/api/register", (req, res) => {
  const { nombre, email, password } = req.body;

  const usuarios = JSON.parse(fs.readFileSync(DATA_PATH));

  if (usuarios.find((u) => u.email === email)) {
    return res
      .status(400)
      .json({ success: false, message: "El correo ya está registrado" });
  }

  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    email,
    password,
    rol: "usuario" // POR DEFECTO
  };

  usuarios.push(nuevoUsuario);

  fs.writeFileSync(DATA_PATH, JSON.stringify(usuarios, null, 2));

  res.json({ success: true, message: "Usuario registrado con éxito" });
});

const PRODUCTOS_PATH = "./data/productos.json";

// OBTENER PRODUCTOS
app.get("/api/productos", (req, res) => {
  const productos = JSON.parse(fs.readFileSync(PRODUCTOS_PATH));
  res.json(productos);
});

app.post("/api/productos", (req, res) => {
  const { nombre, categoria, precio, stock, imagen, descripcion } = req.body;

  const productos = JSON.parse(fs.readFileSync(PRODUCTOS_PATH));

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    categoria,
    precio,
    stock,
    imagen,
    descripcion
  };

  productos.push(nuevoProducto);
  fs.writeFileSync(PRODUCTOS_PATH, JSON.stringify(productos, null, 2));

  res.json({
    success: true,
    message: "Producto creado correctamente",
    producto: nuevoProducto
  });
});

// EDITAR PRODUCTOS
app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, stock, imagen, descripcion } = req.body;

  const productos = JSON.parse(fs.readFileSync(PRODUCTOS_PATH));
  const index = productos.findIndex((p) => p.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  productos[index] = {
    ...productos[index],
    nombre,
    categoria,
    precio,
    stock,
    imagen,
    descripcion
  };

  fs.writeFileSync(PRODUCTOS_PATH, JSON.stringify(productos, null, 2));

  res.json({ success: true, message: "Producto actualizado" });
});

// ELIMINAR PRODUCTOS
app.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;

  let productos = JSON.parse(fs.readFileSync(PRODUCTOS_PATH));

  const existe = productos.find((p) => p.id == id);
  if (!existe) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  productos = productos.filter((p) => p.id != id);

  fs.writeFileSync(PRODUCTOS_PATH, JSON.stringify(productos, null, 2));

  res.json({ success: true, message: "Producto eliminado" });
});



app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
