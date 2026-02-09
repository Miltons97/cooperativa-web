const pool = require("../../api/config/db");

const createNoticiasTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS noticias (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      resumen TEXT,
      contenido TEXT NOT NULL,
      imagen TEXT,
      categoria VARCHAR(50),
      fecha_publicacion DATE DEFAULT CURRENT_DATE,
      activa BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Tabla noticias creada correctamente");
  } catch (error) {
    console.error("❌ Error creando la tabla:", error);
  } finally {
    await pool.end();
  }
};

createNoticiasTable();
