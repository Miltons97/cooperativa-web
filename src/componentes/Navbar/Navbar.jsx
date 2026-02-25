import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InstitucionContext } from "../context/InstitutionContext";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./navbar.module.css";

export default function Navbar() {
  const { info } = useContext(InstitucionContext);
  const institucion = info[0];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // En móvil O con scroll → mostrar solo icono
  const showIconOnly = isMobile || scrolled;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
      {showIconOnly ? (
        /* ── Solo ícono ── */
        <div
          className={styles.menuIconBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      ) : (
        /* ── Navbar completo (desktop sin scroll) ── */
        <>
          <div className={styles.logoContainer}>
            <span className={styles.brand}>
              {institucion?.nombre || ""}
            </span>
          </div>

          <div className={styles.links}>
            <Link to="/" className={styles.link}>Inicio</Link>
            <Link to="/institucional" className={styles.link}>Institucional</Link>
            <Link to="/novedades" className={styles.link}>Novedades</Link>
            <Link to="/servicios" className={styles.link}>Servicios</Link>
            <Link to="/pagos-facturas" className={styles.link}>Mi Facturas</Link>
          </div>
        </>
      )}

      {/* ── Menú desplegable ── */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {/* Cerrar al hacer click afuera */}
          <div
            className={styles.mobileMenuOverlay}
            onClick={() => setMenuOpen(false)}
          />
          <div className={styles.mobileMenuContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <FaTimes />
            </button>
            <Link to="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/institucional" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Institucional</Link>
            <Link to="/novedades" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Novedades</Link>
            <Link to="/servicios" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Servicios</Link>
            <Link to="/pagos-facturas" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Pagos y Facturas</Link>
          </div>
        </div>
      )}
    </nav>
  );
}