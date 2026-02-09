// controllers/authController.js (MEJORADO)
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/adminUser");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validación de campos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};

// Función para registrar nuevos usuarios (opcional)
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const newUser = await User.create({ email, password, role });
    
    res.status(201).json({ 
      message: "Usuario creado exitosamente",
      user: newUser 
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};