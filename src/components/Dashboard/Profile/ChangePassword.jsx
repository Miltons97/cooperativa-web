import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./changePassword.module.css";
import { API_URL } from "../../../config/api";

export default function ChangePassword() {
  const [form, setForm]       = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const user  = token ? jwtDecode(token) : {};

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("Las contraseñas nuevas no coinciden");
    }
    if (form.newPassword.length < 6) {
      return setError("La nueva contraseña debe tener al menos 6 caracteres");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cambiar contraseña");

      setSuccess("✅ Contraseña actualizada correctamente");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.icon}>🔐</span>
          <h2 className={styles.title}>Mi Perfil</h2>
        </div>

        <div className={styles.userInfo}>
          <p className={styles.label}>Usuario</p>
          <p className={styles.email}>{user.email}</p>
          <span className={styles.role}>{user.role}</span>
        </div>

        <hr className={styles.divider} />

        <h3 className={styles.subtitle}>Cambiar Contraseña</h3>

        {error   && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.group}>
            <label>Contraseña actual</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handle}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.group}>
            <label>Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handle}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className={styles.group}>
            <label>Confirmar nueva contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handle}
              placeholder="Repetir contraseña"
              required
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Guardando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
