const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const authController = require("../controllers/authController");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No autorizado" });
  try {
    const decoded  = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    req.userId     = decoded.id;
    req.userEmail  = decoded.email;
    req.userRole   = decoded.role;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

const requireSuperAdmin = (req, res, next) => {
  if (req.userRole !== "superadmin") {
    return res.status(403).json({ error: "Acceso restringido a superadmin" });
  }
  next();
};

router.post("/login",           authController.login);
router.post("/reset-password",  authController.resetPassword);
router.put("/change-password",  verifyToken, authController.changePassword);

router.get("/users",        verifyToken, requireSuperAdmin, authController.getUsers);
router.post("/users",       verifyToken, requireSuperAdmin, authController.createUser);
router.put("/users/:id",    verifyToken, requireSuperAdmin, authController.updateUser);
router.delete("/users/:id", verifyToken, requireSuperAdmin, authController.deleteUser);

module.exports = router;
