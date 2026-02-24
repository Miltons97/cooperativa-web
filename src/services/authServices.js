// services/authServices.js
import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Base URL

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    return res.data.token;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Error al iniciar sesión");
    return null;
  }
};