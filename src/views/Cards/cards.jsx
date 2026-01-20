import React from "react";
import { FaBolt, FaTint, FaLeaf, FaDownload } from "react-icons/fa";
import styles from "./Cards.module.css";

function Cards() {
  return (
    <div className={styles.cardsContainer}>
  
      <div className={styles.card}>
        <h3>Consultas:</h3>
        <p><strong>(2281) 31 73 52</strong></p>
        <p>Números de emergencias para tus servicios:</p>
        <p>Luz: (2281) 50 3485 / 50 5914</p>
        <p>Agua: (2281) 53 3611</p>
        <p>Social: (2281) 43 1605 / 40 8006</p>
        <div className={styles.icons}>
          <FaBolt className={styles.iconRed} />
          <FaTint className={styles.iconBlue} />
          <FaLeaf className={styles.iconGreen} />
        </div>
      </div>

      <div className={styles.card}>
        <h3>Consultas Fibra</h3>
        <p><strong>(2281) 68 44 19</strong></p>
        <p>Consultas sobre nuestros servicios, planes y alcances.</p>
        <p>Reclamos administrativos y técnicos.</p>
        <p>Reclamos: (2281) 412093</p>
        <img
          src="/assets/fibralan-logo.png"
          alt="Fibralan"
          className={styles.logoSmall}
        />
      </div>

     
      <div className={`${styles.card} ${styles.cardDark}`}>
        <h3>Lugares de pago</h3>
        <p>BELGRANO 654, COPEOSPIL.</p>
        <p>Cooperativa de Servicios Publicos Ltda.. de Consumo y Vivienda y sucursales.</p>
        <p>RIPSA / Cobro EXPRESS / Pago Fácil.</p>
        <p>Débito Automático: Visa, Favacard y Naranja.</p>
        <p>Link Pagos - Pago Mis Cuentas (Red Banelco).</p>
        <FaDownload className={styles.iconWhite} />
      </div>

   
      <div className={`${styles.card} ${styles.cardGreen}`}>
        <h3>Pagá tu factura</h3>
        <p><strong>AUTOGESTIÓN</strong></p>
        <p>
          Desde tu dispositivo móvil o pc, podrás agregar tus cuentas,
          pagar facturas, descargar los comprobantes en PDF, iniciar trámites y más…
        </p>
        <FaDownload className={styles.iconWhite} />
      </div>
    </div>
  );
}

export default Cards;
