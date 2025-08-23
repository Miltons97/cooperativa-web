const express = require('express');
const router = express.Router();
const { crearInstitucion, obtenerInstituciones } = require('../controllers/institucionControllers');

router.post('/', crearInstitucion);
router.get('/', obtenerInstituciones);

module.exports = router;
