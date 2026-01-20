import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.footerColumn}>
          <h3>COPEOSPIL</h3>
          <ul>
            <li><a href="#">Sobre COPEOSPIL</a></li>
            <li><a href="#">Institucional</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Atención en línea</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Ubicación</h3>
          <p>Ingeniero Luiggi, La Pampa</p>
          <p>Dirección: H. Yrigoyen 318</p>
        </div>

        <div className={styles.footerColumn}>
          <h3>Teléfonos</h3>
          <p>(2302) 43 16 00</p>
          <p>Administración: (2302) 431600 / 01 / 02</p>
        </div>

        <div className={styles.footerColumn}>
          <h3>Contacto</h3>
          <p>secretaria@ceil.com.ar</p>
          <p>
            <a href="https://ceil.com.ar" target="_blank" rel="noopener noreferrer">
              www.COPEOSPIL.com.ar
            </a>
          </p>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 - Cooperativa Eléctrica de Ingeniero Luiggi Ltda. - Todos los derechos reservados</p>
        <p className={styles.dev}>Desarrollo Web / Creadores de Sitios</p>
      </div>
    </footer>
  );
}
