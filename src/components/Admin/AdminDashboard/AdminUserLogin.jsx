import { useState } from "react";
import { login } from "../../../services/authService";
import styles from "./adminLogin.module.css";
import { API_URL } from "../../../config/api";

export default function LoginAdmin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // forgot password
  const [showForgot, setShowForgot]       = useState(false);
  const [forgotEmail, setForgotEmail]     = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError]     = useState("");
  const [tempPassword, setTempPassword]   = useState("");
  const [emailSent, setEmailSent]         = useState(false);

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

  const handleForgot = async (e) => {
    e.preventDefault();
    setForgotError(""); setTempPassword("");
    setForgotLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al blanquear");
      setTempPassword(data.tempPassword);
      setEmailSent(data.emailSent);
    } catch (err) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const backToLogin = () => {
    setShowForgot(false);
    setForgotEmail(""); setForgotError(""); setTempPassword(""); setEmailSent(false);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>

        <div className={styles.cardHeader}>
          <div className={styles.logoCircle}>
            <img src="/assets/LogoSinFondo.png" alt="COPEOSPIL" />
          </div>
          <h1 className={styles.cardTitle}>Bienvenido</h1>
          <p className={styles.cardSubtitle}>Panel Administrativo</p>
        </div>

        {/* ── LOGIN FORM ── */}
        {!showForgot && (
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
                placeholder="usuario@copeospil.com"
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

            <button
              type="button"
              className={styles.forgotLink}
              onClick={() => setShowForgot(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        )}

        {/* ── FORGOT PASSWORD FORM ── */}
        {showForgot && (
          <div className={styles.forgotSection}>
            <p className={styles.forgotHint}>
              Ingresá tu email y generaremos una contraseña temporal que podrás
              cambiar luego desde tu perfil.
            </p>

            {forgotError && (
              <div className={styles.errorBox}>
                <span className={styles.errorDot} />
                {forgotError}
              </div>
            )}

            {tempPassword ? (
              <div className={styles.tempBox}>
                {emailSent
                  ? <p className={styles.tempLabel}>✅ Email enviado a {forgotEmail}</p>
                  : <p className={styles.tempLabel}>⚠️ Email no enviado — guardá esta contraseña:</p>
                }
                <p className={styles.tempPass}>{tempPassword}</p>
                <p className={styles.tempNote}>
                  Usala para ingresar y luego cambiala desde <strong>Mi Perfil</strong>.
                </p>
                <button className={styles.submitBtn} onClick={backToLogin}>
                  Volver al inicio de sesión
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleForgot}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="usuario@copeospil.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className={styles.fieldInput}
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className={`${styles.submitBtn} ${forgotLoading ? styles.loading : ""}`}
                >
                  {forgotLoading ? "Generando..." : "Blanquear contraseña"}
                </button>

                <button type="button" className={styles.forgotLink} onClick={backToLogin}>
                  ← Volver al inicio de sesión
                </button>
              </form>
            )}
          </div>
        )}

        <div className={styles.cardFooter}>
          <p><strong>Acceso restringido</strong>COPEOSPIL Ltda.</p>
        </div>

      </div>
    </div>
  );
}
