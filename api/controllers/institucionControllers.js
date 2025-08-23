const Institucion = require('../models/institucion');

exports.crearInstitucion = async (req, res) => {
    try {
        const nueva = await Institucion.create(req.body);
        res.json(nueva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerInstituciones = async (req, res) => {
    try {
        const lista = await Institucion.getAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
