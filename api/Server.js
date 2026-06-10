require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET no está definido en .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/institucion", require("./routes/institucionRoutes.js"));
app.use("/multimedia", require("./routes/multimediaRoutes.js"));
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/noticias", require("./routes/noticiasRoutes.js"));

app.get("/", (req, res) => {
  res.json({ message: "API COPEOSPIL funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
