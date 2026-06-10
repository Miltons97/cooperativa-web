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

  async getNoticiasInicio() {
    const result = await pool.query(
      `SELECT * FROM noticias
       WHERE activa = true
       AND (categoria IN ('NOVEDADES', 'INICIO') OR mostrar_en_inicio = true)
       ORDER BY fecha_publicacion DESC
       LIMIT 10`
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

  async createNoticia({ titulo, resumen, contenido, imagen, categoria, mostrar_en_inicio }) {
    const result = await pool.query(
      `INSERT INTO noticias (titulo, resumen, contenido, imagen, categoria, mostrar_en_inicio)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [titulo, resumen, contenido, imagen, categoria, mostrar_en_inicio ?? false]
    );
    return result.rows[0];
  },

  async updateNoticia(id, { titulo, resumen, contenido, categoria, imagen, mostrar_en_inicio }) {
    let query = `UPDATE noticias SET titulo = $1, resumen = $2, contenido = $3, categoria = $4, mostrar_en_inicio = $5, updated_at = NOW()`;
    const params = [titulo, resumen, contenido, categoria, mostrar_en_inicio ?? false];

    if (imagen) {
      query += `, imagen = $6`;
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
