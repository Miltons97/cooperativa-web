require("dotenv").config();
const pool = require("../config/db");

async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE noticias
      ADD COLUMN IF NOT EXISTS mostrar_en_inicio BOOLEAN DEFAULT FALSE
    `);
    console.log("✅ Columna mostrar_en_inicio agregada correctamente.");
  } catch (err) {
    console.error("❌ Error en migración:", err.message);
  } finally {
    await pool.end();
  }
}

migrate();
