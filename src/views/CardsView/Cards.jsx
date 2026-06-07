import React from "react";
import { FaBolt, FaTint, FaLeaf, FaPhoneAlt, FaMapMarkerAlt, FaCreditCard, FaArrowRight } from "react-icons/fa";
import styles from "./cards.module.css";

const FACTURAS_URL = "";

function Cards() {
  return (
    <div className={styles.cardsContainer}>

      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardIconBox} style={{ background: "rgba(224,82,96,0.12)" }}>
            <FaPhoneAlt className={styles.cardIcon} style={{ color: "#e05260" }} />
          </div>
          <h3 className={styles.cardTitle}>Contacto y Emergencias</h3>
          <div className={styles.cardAccent} style={{ background: "#e05260" }} />
        </div>

        <ul className={styles.cardList}>
          <li>
            <span className={styles.listLabel}>Administración</span>
            <span className={styles.listVal}>(2302) 51-8297</span>
          </li>
          <li>
            <span className={styles.listLabel}>Luz — Luiggi</span>
            <span className={styles.listVal}>(2302) 51-8301</span>
          </li>
          <li>
            <span className={styles.listLabel}>Luz — E. Martini</span>
            <span className={styles.listVal}>(2302) 51-8306</span>
          </li>
          <li>
            <span className={styles.listLabel}>Luz — Alta Italia</span>
            <span className={styles.listVal}>(2302) 51-8307</span>
          </li>
          <li>
            <span className={styles.listLabel}>Internet</span>
            <span className={styles.listVal}>(2302) 54-0924</span>
          </li>
          <li>
            <span className={styles.listLabel}>Social / Sepelio</span>
            <span className={styles.listVal}>(02302) 44-4444</span>
          </li>
        </ul>

        <div className={styles.cardBrand}>
          <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.brandLogo} />
          <span className={styles.brandName}>COPEOSPIL Ltda.</span>
        </div>
      </div>

      <div className={`${styles.card} ${styles.cardDark}`}>
        <div className={styles.cardTop}>
          <div className={styles.cardIconBox} style={{ background: "rgba(126,184,247,0.14)" }}>
            <FaMapMarkerAlt className={styles.cardIcon} style={{ color: "#7eb8f7" }} />
          </div>
          <h3 className={styles.cardTitle}>Lugares de Pago</h3>
          <div className={styles.cardAccent} style={{ background: "#7eb8f7" }} />
        </div>

        <ul className={styles.cardList}>
          <li><span className={styles.listVal}>Belgrano 654 — COPEOSPIL Ltda.</span></li>
          <li><span className={styles.listVal}>Pampa Pagos</span></li>
          <li><span className={styles.listVal}>Banco Nación</span></li>
          <li><span className={styles.listVal}>Red Link · Pago Mis Cuentas</span></li>
          <li><span className={styles.listVal}>Mercado Pago</span></li>
        </ul>

        <div className={styles.cardBrand}>
          <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.brandLogo} />
          <span className={styles.brandName}>COPEOSPIL Ltda.</span>
        </div>
      </div>

      <a
        href={FACTURAS_URL || "#"}
        target={FACTURAS_URL ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`${styles.card} ${styles.cardGreen} ${styles.cardLink}`}
      >
        <div className={styles.cardTop}>
          <div className={styles.cardIconBox} style={{ background: "rgba(255,255,255,0.18)" }}>
            <FaCreditCard className={styles.cardIcon} style={{ color: "#fff" }} />
          </div>
          <h3 className={styles.cardTitle}>Pagá tu Factura</h3>
          <div className={styles.cardAccent} style={{ background: "rgba(255,255,255,0.55)" }} />
        </div>

        <p className={styles.cardBadge}>AUTOGESTIÓN ONLINE</p>

        <p className={styles.cardText}>
          Agregá tus cuentas, pagá facturas, descargá comprobantes e iniciá trámites desde cualquier dispositivo.
        </p>

        <div className={styles.cardCta}>
          Ingresar <FaArrowRight style={{ fontSize: "0.72rem" }} />
        </div>

        <div className={styles.cardBrand}>
          <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.brandLogo} />
          <span className={styles.brandName}>COPEOSPIL Ltda.</span>
        </div>
      </a>

    </div>
  );
}

export default Cards;
