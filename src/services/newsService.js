import { API_URL as BASE_URL } from "../config/api";
const API_URL = `${BASE_URL}/api/noticias`;

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

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    throw new Error("No autenticado");
  }
  return { Authorization: `Bearer ${token}` };
};

const throwWithServerMessage = async (res, fallback) => {
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
    throw new Error("Sesión expirada. Iniciá sesión nuevamente.");
  }
  const data = await res.json().catch(() => ({}));
  const err = new Error(data.error || fallback);
  err.serverData = data;
  throw err;
};

export const createNoticia = async (formData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });
  if (!res.ok) await throwWithServerMessage(res, "Error al crear noticia");
  return res.json();
};

export const updateNoticia = async (id, formData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: formData,
  });
  if (!res.ok) await throwWithServerMessage(res, "Error al actualizar noticia");
  return res.json();
};

export const deleteNoticia = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) await throwWithServerMessage(res, "Error al eliminar noticia");
  return res.json();
};
