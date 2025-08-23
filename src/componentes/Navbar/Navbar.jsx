import { Link } from "react-router-dom";
import { useContext } from "react";
import { InstitucionContext } from "../../componentes/context/intitucionContext";
import styles from "./Navbar.module.css";
import logo from "../../assets/copeospil.jpg"; // este es tu logo local
export default function Navbar() {
  const { info } = useContext(InstitucionContext);

  // Tomamos el primer registro de la institución (si existe)
  const institucion = info[0];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        {/* Si en la BDD tenés un logo como imagen, podés reemplazar 'logo' */}
        <img 
          src={institucion?.logo_url || logo} 
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
    </nav>
  );
}
