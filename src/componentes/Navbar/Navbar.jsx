import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { InstitucionContext } from "../../componentes/context/intitucionContext";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { info } = useContext(InstitucionContext);
  const institucion = info[0];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // detecta scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Si scrollea, mostramos solo el icono en esquina */}
      {scrolled ? (
        <div
          className={styles.scrollMenuIcon}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      ) : (
        <>
          {/* Navbar normal */}
          <div className={styles.logoContainer}>
            <img
              src="assets/copeospil.jpg"
              alt="Logo Cooperativa"
              className={styles.logo}
            />
            <span className={styles.brand}>
              {institucion?.nombre || "Cooperativa Eléctrica"}
            </span>
          </div>

          <div className={styles.links}>
            <Link to="/" className={styles.link}>Inicio</Link>
            <Link to="/institucional" className={styles.link}>Institucional</Link>
            <Link to="/novedades" className={styles.link}>Novedades</Link>
            <Link to="/servicios" className={styles.link}>Servicios</Link>
            <Link to="/pagos-facturas" className={styles.link}>Pagos y Facturas</Link>
          </div>
        </>
      )}

      {/* Menú desplegable al click en icono */}
      {menuOpen && scrolled && (
        <div className={styles.scrollMenuLinks}>
          <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/institucional" className={styles.link} onClick={() => setMenuOpen(false)}>Institucional</Link>
          <Link to="/novedades" className={styles.link} onClick={() => setMenuOpen(false)}>Novedades</Link>
          <Link to="/servicios" className={styles.link} onClick={() => setMenuOpen(false)}>Servicios</Link>
          <Link to="/pagos-facturas" className={styles.link} onClick={() => setMenuOpen(false)}>Pagos y Facturas</Link>
        </div>
      )}
    </nav>
  );
}

// import { Link } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { InstitucionContext } from "../../componentes/context/intitucionContext";
// import styles from "./Navbar.module.css";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Navbar() {
//   const { info } = useContext(InstitucionContext);
//   const institucion = info[0];

//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50); // achicar cuando se scrollea
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
//       <div className={styles.logoContainer}>
//         <img
//           src="assets/copeospil.jpg"
//           alt="Logo Cooperativa"
//           className={styles.logo}
//         />
//         <span className={styles.brand}>
//           {institucion?.nombre || "Cooperativa Eléctrica"}
//         </span>
//       </div>

//       {/* Links para escritorio */}
//       <div className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
//         <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Inicio</Link>
//         <Link to="/institucional" className={styles.link} onClick={() => setMenuOpen(false)}>Institucional</Link>
//         <Link to="/novedades" className={styles.link} onClick={() => setMenuOpen(false)}>Novedades</Link>
//         <Link to="/servicios" className={styles.link} onClick={() => setMenuOpen(false)}>Servicios</Link>
//         <Link to="/pagos-facturas" className={styles.link} onClick={() => setMenuOpen(false)}>Pagos y Facturas</Link>
//       </div>

//       {/* Botón menú hamburguesa */}
//       <button
//         className={styles.menuButton}
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </button>
//     </nav>
//   );
// }
