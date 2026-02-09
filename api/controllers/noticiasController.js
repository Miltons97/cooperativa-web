const NoticiasModel = require("../models/noticias");

exports.getNoticias = async (req, res) => {
  try {
    const { categoria, seccion } = req.query;
    
    let noticias;
    
    if (categoria) {
      noticias = await NoticiasModel.getNoticiasByCategoria(categoria);
    } else if (seccion === "inicio") {
      // Para inicio: últimas 3 noticias de NOVEDADES o INICIO
      noticias = await NoticiasModel.getNoticiasInicio();
    } else if (seccion === "novedades") {
      // Para novedades: solo categoría NOVEDADES
      noticias = await NoticiasModel.getNoticiasByCategoria("NOVEDADES");
    } else {
      noticias = await NoticiasModel.getAllNoticias();
    }
    
    res.json(noticias);
  } catch (error) {
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
    const titulo = req.body.titulo;
    const resumen = req.body.resumen;
    const contenido = req.body.contenido;
    const categoria = req.body.categoria;

    // Validación según el rol del usuario
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
    const titulo = req.body.titulo;
    const resumen = req.body.resumen;
    const contenido = req.body.contenido;
    const categoria = req.body.categoria;

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

// Función helper para permisos
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