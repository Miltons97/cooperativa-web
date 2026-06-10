const pool = require('../config/db');

const getAllMultimedia = async () => {
  const query = `
    SELECT id, tipo, nombre_archivo, mimetype
    FROM multimedia
    WHERE activa = true
    ORDER BY id DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const getMultimediaById = async (id) => {
  const query = `
    SELECT *
    FROM multimedia
    WHERE id = $1 AND activa = true
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const createMultimedia = async (data) => {
  const { tipo, nombre_archivo, mimetype, contenido } = data;
  const query = `
    INSERT INTO multimedia (tipo, nombre_archivo, mimetype, contenido)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [tipo, nombre_archivo, mimetype, contenido]);
  return rows[0];
};

const updateMultimedia = async (id, data) => {
  const { tipo, nombre_archivo, mimetype, contenido, activa } = data;
  const query = `
    UPDATE multimedia
    SET
      tipo = $1,
      nombre_archivo = $2,
      mimetype = $3,
      contenido = $4,
      activa = $5,
      updated_at = NOW()
    WHERE id = $6
    RETURNING *
  `;
  const { rows } = await pool.query(query, [tipo, nombre_archivo, mimetype, contenido, activa, id]);
  return rows[0];
};

const deleteMultimedia = async (id) => {
  const query = `
    UPDATE multimedia
    SET activa = false, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllMultimedia,
  getMultimediaById,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia,
};
