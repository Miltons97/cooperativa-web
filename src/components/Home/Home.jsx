import React, { useEffect, useState } from "react";
import Cards from "../../views/CardsView/Cards";
import NoticiasSlider from "../NewsSlider/NewsSlider";
import styles from "./home.module.css";
import { API_URL } from "../../config/api";

// ── Configurar la URL del portal de pago online ──────────────────────────────
const PAGO_ONLINE_URL = "https://socios.copeospilltda.com/login";
// ─────────────────────────────────────────────────────────────────────────────

function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/noticias?seccion=inicio`)
      .then((r) => r.json())
      .then(setNoticias)
      .catch(() => {});
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Cooperativa de Servicios Públicos</p>
            <h1 className={styles.title}>COPEOSPIL<span className={styles.titleAccent}> Ltda.</span></h1>
            <div className={styles.divider}></div>
            <p className={styles.subtitle}>Energía que nos une, soluciones que acompañan.</p>
          </div>
          <div className={styles.logoWrapper}>
            <img src="/assets/LogoSinFondo.png" alt="Logo COPEOSPIL" className={styles.logo} />
          </div>
        </div>

        <a
          href={PAGO_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.promoBanner}
        >
          <img
            src="/assets/LogoSinFondo.png"
            alt="COPEOSPIL"
            className={styles.promoBannerLogo}
          />
          <div className={styles.promoBannerText}>
            <span className={styles.promoBannerTitle}>Pagá tus facturas online</span>
            <span className={styles.promoBannerSub}>Rápido, simple y seguro</span>
          </div>
          <span className={styles.promoBannerCta}>Ir al portal →</span>
        </a>
      </section>

      {noticias.length > 0 && (
        <section className={styles.noticiasSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Últimas novedades</span>
            <h2 className={styles.noticiasTitle}>Novedades</h2>
          </div>
          <NoticiasSlider noticias={noticias} />
        </section>
      )}

      <div className={styles.divider2}></div>

      <section className={styles.cardsSection}>
        <Cards />
      </section>
    </div>
  );
}

export default Home;
