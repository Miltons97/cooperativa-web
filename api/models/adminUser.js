// models/adminUser.js (CORREGIDO)
const pool = require("../config/db");
const bcrypt = require("bcryptjs"); // Cambiar a bcryptjs

const User = {
  async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  async create({ email, password, role = "admin" }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (email, password, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, role`,
      [email, hashedPassword, role]
    );

    return result.rows[0];
  }
  
 
};

module.exports = User;