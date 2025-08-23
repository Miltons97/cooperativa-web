const Multimedia = require('../models/multimedia');

exports.subirArchivo = async (req, res) => {
    try {
        const archivo = req.file;
        const { tipo } = req.body;

        const nuevo = await Multimedia.create({
            tipo,
            nombre_archivo: archivo.originalname,
            mimetype: archivo.mimetype,
            contenido: archivo.buffer
        });

        res.json({ mensaje: 'Archivo guardado', id: nuevo.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerArchivos = async (req, res) => {
    try {
        const lista = await Multimedia.getAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verArchivo = async (req, res) => {
    try {
        const archivo = await Multimedia.getById(req.params.id);
        if (!archivo) return res.status(404).send('No encontrado');

        res.setHeader('Content-Type', archivo.mimetype);
        res.send(archivo.contenido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
