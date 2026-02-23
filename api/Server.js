require('dotenv').config(); // ← AGREGAR AL PRINCIPIO
const express = require("express");
const cors = require("cors");
const path = require("path"); // ← AGREGAR

const app = express();

// ================= VERIFICAR JWT_SECRET =================
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET no está definido en .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ← AGREGAR para form-data

// ================= SERVIR ARCHIVOS ESTÁTICOS (IMÁGENES) =================
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ← AGREGAR

// ================= RUTAS EXISTENTES =================
app.use("/institucion", require("./routes/institucionRoutes.js"));
app.use("/multimedia", require("./routes/multimediaRoutes.js"));

// ================= NUEVAS RUTAS =================
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/noticias", require("./routes/noticiasRoutes.js"));

// ================= RUTA DE PRUEBA =================
app.get("/", (req, res) => {
  res.json({ message: "API COPEOSPIL funcionando ✅" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`✅ JWT_SECRET: Configurado`);
  console.log(`✅ Uploads: ${path.join(__dirname, "uploads")}`);
});