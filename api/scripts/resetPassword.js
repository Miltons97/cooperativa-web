const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const pool = new Pool({
  host:     "localhost",
  port:     5432,
  user:     "postgres",
  password: "sosa123",
  database: "institucion_db",
});

async function resetPassword() {
  const email       = "superadmin@copeospil.com";
  const newPassword = "Copeospil2024!";

  const hash = await bcrypt.hash(newPassword, 10);

  const result = await pool.query(
    `UPDATE usuarios SET password = $1 WHERE email = $2 RETURNING email, role`,
    [hash, email]
  );

  if (result.rowCount === 0) {
    console.log("❌ No se encontró el usuario:", email);
  } else {
    console.log("✅ Contraseña actualizada para:", result.rows[0].email);
    console.log("   Nueva contraseña: " + newPassword);
  }

  await pool.end();
}

resetPassword().catch(console.error);
