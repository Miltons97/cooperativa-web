const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticiasController");
const upload = require("../config/multer");
const authenticateToken = require("../midelware/auth");

router.get("/", controller.getNoticias);
router.get("/:id", controller.getNoticiaById);

router.post("/", authenticateToken, upload.single("imagen"), controller.createNoticia);
router.put("/:id", authenticateToken, upload.single("imagen"), controller.updateNoticia);
router.delete("/:id", authenticateToken, controller.deleteNoticia);

module.exports = router;
