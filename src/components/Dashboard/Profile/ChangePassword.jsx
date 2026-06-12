import { jwtDecode } from "jwt-decode";
import styles from "./changePassword.module.css";

export default function ChangePassword() {
  const token = localStorage.getItem("token");
  const user  = token ? jwtDecode(token) : {};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.icon}>👤</span>
          <h2 className={styles.title}>Mi Perfil</h2>
        </div>

        <div className={styles.userInfo}>
          <p className={styles.label}>Usuario</p>
          <p className={styles.email}>{user.email}</p>
          <span className={styles.role}>{user.role}</span>
        </div>

        <hr className={styles.divider} />

        <p style={{ color: "#888", fontSize: "0.9rem", textAlign: "center", marginTop: "1rem" }}>
          Para cambiar tu contraseña contactá al administrador del sistema.
        </p>
      </div>
    </div>
  );
}
