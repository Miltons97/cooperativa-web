import { useState } from "react";
import { login } from "../../../services/authServices";
import styles from "./adminLogin.module.css";

export default function LoginAdmin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await login(email, password);
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/admin/noticias/nueva";
      } else {
        setError("Credenciales inválidas. Verificá tus datos.");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intentá nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>

        {/* ── HEADER ── */}
        <div className={styles.cardHeader}>
          <div className={styles.logoCircle}>
            <img src="/assets/LogoSinFondo.png" alt="COPEOSPIL" />
          </div>
          <h1 className={styles.cardTitle}>Bienvenido</h1>
          <p className={styles.cardSubtitle}>Panel Administrativo</p>
        </div>

        {/* ── FORM ── */}
        <form className={styles.form} onSubmit={handleSubmit}>

          {error && (
            <div className={styles.errorBox}>
              <span className={styles.errorDot} />
              {error}
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Correo electrónico</label>
            <input
              type="email"
              placeholder="admin@copeospil.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.fieldInput}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.fieldInput}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitBtn} ${loading ? styles.loading : ""}`}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        {/* ── FOOTER ── */}
        <div className={styles.cardFooter}>
          <p>
            <strong>Acceso restringido</strong>
            admin@ejemplo.com / Admin123!
          </p>
        </div>

      </div>
    </div>
  );
}