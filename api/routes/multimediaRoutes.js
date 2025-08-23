const express = require('express');
const multer = require('multer');
const router = express.Router();
const { subirArchivo, obtenerArchivos, verArchivo } = require('../controllers/multimediaControllers');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('archivo'), subirArchivo);
router.get('/', obtenerArchivos);
router.get('/:id', verArchivo);

module.exports = router;
