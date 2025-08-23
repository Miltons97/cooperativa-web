const pool = require('../config/db');

const Multimedia = {
    async create(data) {
        const { tipo, nombre_archivo, mimetype, contenido } = data;
        const result = await pool.query(
            'INSERT INTO multimedia (tipo, nombre_archivo, mimetype, contenido) VALUES ($1, $2, $3, $4) RETURNING *',
            [tipo, nombre_archivo, mimetype, contenido]
        );
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query('SELECT id, tipo, nombre_archivo, mimetype FROM multimedia ORDER BY id DESC');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT * FROM multimedia WHERE id = $1', [id]);
        return result.rows[0];
    }
};

module.exports = Multimedia;
