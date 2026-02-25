const API_URL = "http://localhost:3001/api/noticias";

/* =========================
   📥 PUBLICO
========================= */

export const getNoticias = async (params = "") => {
  const res = await fetch(`${API_URL}${params}`);
  if (!res.ok) throw new Error("Error al obtener noticias");
  return res.json();
};

export const getNoticiaById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Noticia no encontrada");
  return res.json();
};

/* =========================
   🔐 ADMIN
========================= */

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createNoticia = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });

  if (!res.ok) throw new Error("Error al crear noticia");
  return res.json();
};

export const updateNoticia = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: formData,
  });

  if (!res.ok) throw new Error("Error al actualizar noticia");
  return res.json();
};

export const deleteNoticia = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Error al eliminar noticia");
  return res.json();
};
