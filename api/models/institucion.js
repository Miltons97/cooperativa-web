

const pool = require('../config/db');

const Institucion = {
    async create(data) {
        const { nombre, descripcion, mision, vision } = data;
        const result = await pool.query(
            'INSERT INTO institucion (nombre, descripcion, mision, vision) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, descripcion, mision, vision]
        );
        return result.rows[0];
    },

    async getAll() {
        const result = await pool.query('SELECT * FROM institucion ORDER BY id DESC');
        return result.rows;
    }
};

module.exports = Institucion;
