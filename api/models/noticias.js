const NoticiasModel = require("../models/noticias");

exports.getNoticias = async (req, res) => {
  try {
    const { categoria, seccion } = req.query;
    
    let noticias;
    
    if (categoria) {
      // 🔹 Filtra por categoría específica
      noticias = await NoticiasModel.getNoticiasByCategoria(categoria);

    } else if (seccion === "inicio") {
      // 🔹 Últimas 3 para inicio
      noticias = await NoticiasModel.getNoticiasInicio();

    } else if (seccion === "novedades") {
      // 🔥 TRAE TODAS LAS NOTICIAS PUBLICADAS
      noticias = await NoticiasModel.getAllNoticias();

    } else {
      // 🔹 Por defecto trae todas
      noticias = await NoticiasModel.getAllNoticias();
    }
    
    res.json(noticias);

  } catch (error) {
    console.error("❌ Error al obtener noticias:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getNoticiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await NoticiasModel.getNoticiaById(id);

    if (!noticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNoticia = async (req, res) => {
  try {
    const { titulo, resumen, contenido, categoria } = req.body;

    const userRole = req.user.role;
    const allowedCategories = getAllowedCategories(userRole);

    if (!allowedCategories.includes(categoria)) {
      return res.status(403).json({ 
        error: `Tu rol (${userRole}) no puede publicar en la categoría ${categoria}`,
        categoriasPermitidas: allowedCategories
      });
    }

    if (!titulo || !contenido || !categoria) {
      return res.status(400).json({ 
        error: "Faltan campos requeridos",
        recibido: { titulo, contenido, categoria }
      });
    }

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const nuevaNoticia = await NoticiasModel.createNoticia({
      titulo,
      resumen: resumen || "",
      contenido,
      imagen,
      categoria,
    });

    res.status(201).json(nuevaNoticia);

  } catch (error) {
    console.error("❌ Error al crear noticia:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, resumen, contenido, categoria } = req.body;

    const imagen = req.file ? `/uploads/${req.file.filename}` : undefined;

    const noticia = await NoticiasModel.updateNoticia(id, {
      titulo,
      resumen,
      contenido,
      categoria,
      imagen,
    });

    if (!noticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    res.json(noticia);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await NoticiasModel.deleteNoticia(id);

    if (!noticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    res.json({ message: "Noticia desactivada correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔐 Permisos por rol
function getAllowedCategories(role) {
  const permissions = {
    superadmin: ["AGUA", "LUZ", "INTERNET", "SOCIAL", "NOVEDADES", "INICIO"],
    admin: ["NOVEDADES", "INICIO"],
    servicios: ["AGUA", "LUZ", "INTERNET", "SOCIAL"],
    agua: ["AGUA"],
    luz: ["LUZ"],
    internet: ["INTERNET"],
    social: ["SOCIAL"]
  };

  return permissions[role] || [];
}
