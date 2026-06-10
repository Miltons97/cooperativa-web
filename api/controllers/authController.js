const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/adminUser");
const { sendTempPassword, sendWelcomeUser } = require("../utils/mailer");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;
  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" });
    }
    const user = await User.findByEmail(req.userEmail);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ error: "La contraseña actual es incorrecta" });

    await User.updatePassword(userId, newPassword);
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en changePassword:", error);
    res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ error: "El email es requerido" });

    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ error: "No existe un usuario con ese email" });

    const digits = Math.floor(1000 + Math.random() * 9000);
    const tempPassword = `Temp${digits}!`;
    await User.updatePassword(user.id, tempPassword);

    let emailSent = false;
    try {
      await sendTempPassword(email, tempPassword);
      emailSent = true;
    } catch (mailErr) {
      console.error("No se pudo enviar el email:", mailErr.message);
    }

    res.json({
      message: emailSent
        ? "Contraseña blanqueada y enviada por email"
        : "Contraseña blanqueada (el email no pudo enviarse)",
      tempPassword,
      emailSent,
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ error: "Error al blanquear la contraseña" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error en getUsers:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.createUser = async (req, res) => {
  const { email, role } = req.body;
  try {
    if (!email || !role) return res.status(400).json({ error: "Email y rol son requeridos" });

    const existing = await User.findByEmail(email);
    if (existing) return res.status(409).json({ error: "Ya existe un usuario con ese email" });

    const digits = Math.floor(1000 + Math.random() * 9000);
    const tempPassword = `Temp${digits}!`;
    const newUser = await User.create({ email, password: tempPassword, role });

    let emailSent = false;
    try {
      await sendWelcomeUser(email, tempPassword, role);
      emailSent = true;
    } catch (mailErr) {
      console.error("No se pudo enviar el email de bienvenida:", mailErr.message);
    }

    res.status(201).json({ message: "Usuario creado", user: newUser, emailSent });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  try {
    if (!email || !role) return res.status(400).json({ error: "Email y rol son requeridos" });

    const conflict = await User.findByEmail(email);
    if (conflict && conflict.id !== parseInt(id)) {
      return res.status(409).json({ error: "Ese email ya pertenece a otro usuario" });
    }

    const updated = await User.updateById(id, { email, role });
    if (!updated) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ message: "Usuario actualizado", user: updated });
  } catch (error) {
    console.error("Error en updateUser:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (parseInt(id) === req.userId) {
      return res.status(400).json({ error: "No podés eliminar tu propia cuenta" });
    }
    await User.deleteById(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error en deleteUser:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

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
    res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
