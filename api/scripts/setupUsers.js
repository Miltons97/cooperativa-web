require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const KEEP_EMAIL  = "admin@ejemplo.com";
const KEEP_PASS   = "Admin123!";
const KEEP_ROLE   = "admin";

const NEW_USERS = [
  { email: "gerencia@copeospil.com",       password: "Gerencia2024!",   role: "superadmin" },
  { email: "ingenieria@copeospil.com.ar",  password: "Ingenieria2024!", role: "superadmin" },
  { email: "milton.sosa1901@gmail.com",    password: "Milton2024!",     role: "superadmin" },
];

async function run() {
  try {
    // 1. Eliminar todos los usuarios excepto admin@ejemplo.com
    const del = await pool.query("DELETE FROM usuarios WHERE email != $1 RETURNING email", [KEEP_EMAIL]);
    console.log("🗑️  Usuarios eliminados:", del.rows.map(r => r.email));

    // 2. Asegurar que admin@ejemplo.com existe con la contraseña y rol correctos
    const existing = await pool.query("SELECT id FROM usuarios WHERE email = $1", [KEEP_EMAIL]);
    const hash = await bcrypt.hash(KEEP_PASS, 10);
    if (existing.rows.length > 0) {
      await pool.query("UPDATE usuarios SET password = $1, role = $2 WHERE email = $3", [hash, KEEP_ROLE, KEEP_EMAIL]);
      console.log("✅ Actualizado:", KEEP_EMAIL, "| rol:", KEEP_ROLE);
    } else {
      await pool.query("INSERT INTO usuarios (email, password, role) VALUES ($1, $2, $3)", [KEEP_EMAIL, hash, KEEP_ROLE]);
      console.log("✅ Creado:", KEEP_EMAIL, "| rol:", KEEP_ROLE);
    }

    // 3. Crear los nuevos usuarios
    for (const u of NEW_USERS) {
      const h = await bcrypt.hash(u.password, 10);
      await pool.query(
        "INSERT INTO usuarios (email, password, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET password = $2, role = $3",
        [u.email, h, u.role]
      );
      console.log("✅ Usuario listo:", u.email, "| contraseña:", u.password, "| rol:", u.role);
    }

    console.log("\n🎉 Setup completo. Usuarios activos:");
    const all = await pool.query("SELECT id, email, role FROM usuarios ORDER BY id");
    console.table(all.rows);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
