require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : new Pool({
      host:     process.env.DB_HOST,
      port:     process.env.DB_PORT,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

const USERS = [
  { email: "gerencia@copeospil.com",      password: "Ger3nci@#Kp2026!",  role: "superadmin" },
  { email: "ingenieria@copeospil.com.ar", password: "Ing3n!#Zq2026@",    role: "superadmin" },
  { email: "milton.sosa1901@gmail.com",   password: "M1lt@n#Xr2026!",    role: "superadmin" },
];

async function run() {
  try {
    // Eliminar admin@ejemplo.com
    const del = await pool.query("DELETE FROM usuarios WHERE email = $1 RETURNING email", ["admin@ejemplo.com"]);
    if (del.rows.length > 0) {
      console.log("🗑️  Eliminado:", del.rows[0].email);
    } else {
      console.log("ℹ️  admin@ejemplo.com ya no existía");
    }

    // Crear/actualizar los 3 usuarios
    for (const u of USERS) {
      const h = await bcrypt.hash(u.password, 10);
      await pool.query(
        "INSERT INTO usuarios (email, password, role) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET password = $2, role = $3",
        [u.email, h, u.role]
      );
      console.log("✅", u.email, "| contraseña:", u.password, "| rol:", u.role);
    }

    console.log("\n🎉 Usuarios activos:");
    const all = await pool.query("SELECT id, email, role FROM usuarios ORDER BY id");
    console.table(all.rows);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
