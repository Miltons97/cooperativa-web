const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const authController = require("../controllers/authController");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No autorizado" });
  try {
    const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    req.userId    = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

router.post("/login",           authController.login);
router.post("/register",        authController.register);
router.post("/reset-password",  authController.resetPassword);
router.put("/change-password",  verifyToken, authController.changePassword);

module.exports = router;