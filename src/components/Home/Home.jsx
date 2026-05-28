import React, { useEffect, useState } from "react";
import Cards from "../../views/CardsView/Cards";
import NoticiasSlider from "../NewsSlider/NewsSlider";
import styles from "./home.module.css";
import { API_URL } from "../../config/api";

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

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Cooperativa de Servicios Públicos</p>
          <h1 className={styles.title}>COPEOSPIL<span className={styles.titleAccent}> Ltda.</span></h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>Energía que nos une, soluciones que acompañan.</p>
        </div>
        <div className={styles.logoWrapper}>
          <img src="/assets/LogoSinFondo.png" alt="Logo COPEOSPIL" className={styles.logo} />
        </div>
      </section>

      {/* ── NOVEDADES ── */}
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

      {/* ── CARDS ── */}
      <section className={styles.cardsSection}>
        <Cards />
      </section>


    </div>
  );
}

export default Home;
