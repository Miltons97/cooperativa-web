const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticiasController");
const upload = require("../config/multer"); // ← IMPORTAR MULTER
const authenticateToken = require("../midelware/auth");


// Público
router.get("/", controller.getNoticias);
router.get("/:id", controller.getNoticiaById);

// Administrador (PROTEGIDAS + MULTER)
router.post("/", authenticateToken, upload.single("imagen"), controller.createNoticia);
router.put("/:id", authenticateToken, upload.single("imagen"), controller.updateNoticia);
router.delete("/:id", authenticateToken, controller.deleteNoticia);

module.exports = router;