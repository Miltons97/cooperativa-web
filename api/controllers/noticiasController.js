const NoticiasModel = require("../models/noticias");

exports.getNoticias = async (req, res) => {
  try {
    const { categoria, seccion } = req.query;
    let noticias;
    if (categoria) {
      noticias = await NoticiasModel.getNoticiasByCategoria(categoria);
    } else if (seccion === "inicio") {
      noticias = await NoticiasModel.getNoticiasInicio();
    } else if (seccion === "novedades") {
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
    if (!noticia) return res.status(404).json({ message: "Noticia no encontrada" });
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

    const userRole = req.user.role;
    const allowedCategories = getAllowedCategories(userRole);

    if (!allowedCategories.includes(categoria)) {
      return res.status(403).json({
        error: `Tu rol (${userRole}) no puede publicar en la categoría ${categoria}`,
        categoriasPermitidas: allowedCategories,
      });
    }

    if (!titulo || !contenido || !categoria) {
      return res.status(400).json({
        error: "Faltan campos requeridos",
        recibido: { titulo, contenido, categoria },
      });
    }

    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const mostrar_en_inicio = req.body.mostrar_en_inicio === "on" || req.body.mostrar_en_inicio === "true";

    const nuevaNoticia = await NoticiasModel.createNoticia({
      titulo,
      resumen: resumen || "",
      contenido,
      imagen,
      categoria,
      mostrar_en_inicio,
    });

    res.status(201).json(nuevaNoticia);
  } catch (error) {
    console.error("Error al crear noticia:", error);
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
    const mostrar_en_inicio = req.body.mostrar_en_inicio === "on" || req.body.mostrar_en_inicio === "true";

    const noticia = await NoticiasModel.updateNoticia(id, {
      titulo, resumen, contenido, categoria, imagen, mostrar_en_inicio,
    });

    if (!noticia) return res.status(404).json({ message: "Noticia no encontrada" });
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await NoticiasModel.deleteNoticia(id);
    if (!noticia) return res.status(404).json({ message: "Noticia no encontrada" });
    res.json({ message: "Noticia desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function getAllowedCategories(role) {
  const permissions = {
    superadmin: ["AGUA", "AGUA MINERAL", "LUZ", "INTERNET", "SOCIAL", "NOVEDADES", "INICIO"],
    admin: ["NOVEDADES", "INICIO"],
    servicios: ["AGUA", "AGUA MINERAL", "LUZ", "INTERNET", "SOCIAL"],
    agua: ["AGUA"],
    aguaMineral: ["AGUA MINERAL"],
    luz: ["LUZ"],
    internet: ["INTERNET"],
    social: ["SOCIAL"],
  };
  return permissions[role] || [];
}
