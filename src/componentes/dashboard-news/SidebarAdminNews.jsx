import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./sidebar-admin-news.module.css";

export default function SidebarAdmin() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({ email: "", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo({ email: decoded.email, role: decoded.role });
      } catch (err) {
        console.error("Error decodificando token:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Seguro que deseas cerrar sesión?")) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/noticias/nueva", label: "Crear Noticia", icon: "✍️" },
    { path: "/admin/noticias", label: "Ver Noticias", icon: "📰" },
    { path: "/admin/perfil", label: "Mi Perfil", icon: "👤" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" />
        <h3>Panel Admin</h3>
      </div>

      {userInfo.email && (
        <div className={styles.userInfo}>
          <p className={styles.userEmail}>{userInfo.email}</p>
          <span className={styles.userRole}>{userInfo.role}</span>
        </div>
      )}

      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? styles.active : ""}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button onClick={handleLogout} className={styles.logoutButton}>
        🚪 Cerrar Sesión
      </button>
    </aside>
  );
}