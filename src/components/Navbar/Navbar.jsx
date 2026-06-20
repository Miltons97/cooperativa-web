import { Link } from "react-router-dom";

const FACTURAS_URL = "https://socios.copeospilltda.com/login";
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

  const showIconOnly = isMobile || scrolled;

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        {showIconOnly ? (
          <div
            className={styles.menuIconBtn}
            style={{ display: "flex" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        ) : (
          <div className={styles.logoContainer}>
            {institucion?.logo && (
              <img src={institucion.logo} alt="logo" className={styles.logo} />
            )}
            <span className={styles.brand}>
              {institucion?.nombre || "COPEOSPIL Ltda."}
            </span>
          </div>
        )}

        {!showIconOnly && (
          <div className={styles.links}>
            <Link to="/" className={styles.link}>Inicio</Link>
            <Link to="/institucional" className={styles.link}>Institucional</Link>
            <Link to="/servicios" className={styles.link}>Servicios</Link>
            <a href={FACTURAS_URL || "#"} target={FACTURAS_URL ? "_blank" : "_self"} rel="noopener noreferrer" className={styles.link}>Mi Facturas</a>
          </div>
        )}

        {!showIconOnly && <div className={styles.rightCol} />}
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuOverlay} onClick={() => setMenuOpen(false)} />
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileHeader}>
              <span className={styles.mobileBrand}>
                {institucion?.nombre || "COPEOSPIL Ltda."}
              </span>
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
                <FaTimes />
              </button>
            </div>
            <Link to="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/institucional" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Institucional</Link>
            <Link to="/servicios" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Servicios</Link>
            <a href={FACTURAS_URL || "#"} target={FACTURAS_URL ? "_blank" : "_self"} rel="noopener noreferrer" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              Pagos y Facturas
            </a>
          </div>
        </div>
      )}
    </>
  );
}
