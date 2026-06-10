const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      "SELECT id, email, role, created_at FROM usuarios ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async create({ email, password, role = "admin" }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO usuarios (email, password, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, role, created_at`,
      [email, hashedPassword, role]
    );
    return result.rows[0];
  },

  async updateById(id, { email, role }) {
    const result = await pool.query(
      `UPDATE usuarios SET email = $1, role = $2 WHERE id = $3
       RETURNING id, email, role, created_at`,
      [email, role, id]
    );
    return result.rows[0];
  },

  async deleteById(id) {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
  },

  async updatePassword(id, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE usuarios SET password = $1 WHERE id = $2", [hashed, id]);
  },
};

module.exports = User;
