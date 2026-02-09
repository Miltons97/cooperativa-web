const API_URL = "http://localhost:3001/api/noticias";

/* 📥 PUBLICO */
export const getNoticias = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getNoticiaById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

/* 🔐 ADMIN */
export const createNoticia = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};
