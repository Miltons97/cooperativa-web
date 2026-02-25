const pool = require("../config/db");

const NoticiasModel = {
  async getAllNoticias() {
    const result = await pool.query(
      "SELECT * FROM noticias WHERE activa = true ORDER BY fecha_publicacion DESC"
    );
    return result.rows;
  },

  async getNoticiasByCategoria(categoria) {
    const result = await pool.query(
      "SELECT * FROM noticias WHERE categoria = $1 AND activa = true ORDER BY fecha_publicacion DESC",
      [categoria]
    );
    return result.rows;
  },

  // ← NUEVO: Para inicio (últimas 3 noticias generales)
  async getNoticiasInicio() {
    const result = await pool.query(
      `SELECT * FROM noticias 
       WHERE activa = true 
       AND categoria IN ('NOVEDADES', 'INICIO')
       ORDER BY fecha_publicacion DESC 
       LIMIT 3`
    );
    return result.rows;
  },

  async getNoticiaById(id) {
    const result = await pool.query(
      "SELECT * FROM noticias WHERE id = $1 AND activa = true",
      [id]
    );
    return result.rows[0];
  },

  async createNoticia({ titulo, resumen, contenido, imagen, categoria }) {
    const result = await pool.query(
      `INSERT INTO noticias (titulo, resumen, contenido, imagen, categoria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo, resumen, contenido, imagen, categoria]
    );
    return result.rows[0];
  },

  async updateNoticia(id, { titulo, resumen, contenido, categoria, imagen }) {
    let query = `UPDATE noticias SET titulo = $1, resumen = $2, contenido = $3, categoria = $4, updated_at = NOW()`;
    const params = [titulo, resumen, contenido, categoria];

    if (imagen) {
      query += `, imagen = $5`;
      params.push(imagen);
    }

    query += ` WHERE id = $${params.length + 1} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);
    return result.rows[0];
  },

  async deleteNoticia(id) {
    const result = await pool.query(
      "UPDATE noticias SET activa = false WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = NoticiasModel;