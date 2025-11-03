import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = "./data/usuarios.json";

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(DATA_PATH));

  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (usuario) {
    res.json({
      success: true,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
});

// REGISTER
app.post("/api/register", (req, res) => {
  const { nombre, email, password } = req.body;

  // Leer usuarios existentes
  const usuarios = JSON.parse(fs.readFileSync(DATA_PATH));

  // Verificar si ya existe el correo
  if (usuarios.find((u) => u.email === email)) {
    return res
      .status(400)
      .json({ success: false, message: "El correo ya está registrado" });
  }

  // Calcular nuevo ID
  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

  // Crear nuevo usuario
  const nuevoUsuario = { id: nuevoId, nombre, email, password };
  usuarios.push(nuevoUsuario);

  // Guardar en JSON
  fs.writeFileSync(DATA_PATH, JSON.stringify(usuarios, null, 2));

  res.json({ success: true, message: "Usuario registrado con éxito" });
});

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
