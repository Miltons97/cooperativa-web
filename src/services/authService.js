import axios from "axios";
import { API_URL as BASE_URL } from "../config/api";

const API_URL = `${BASE_URL}/api`;

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
