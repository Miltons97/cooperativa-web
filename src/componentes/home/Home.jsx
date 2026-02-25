import React, { useEffect, useState } from "react";
import Cards from "../../views/cards-views/Cards";
import NoticiasSlider from "../news-silder/noticiasSilder";
import styles from "./home.module.css";

function Inicio() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/noticias?seccion=inicio")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error("Error cargando noticias", err));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>COPEOSPIL Ltda.</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Energía que nos une, soluciones que acompañan.
          </p>
        </div>

        <div className={styles.logoWrapper}>
          <img
            src="/assets/LogoSinFondo.png"
            alt="Logo COPEOSPIL"
            className={styles.logo}
          />
        </div>
      </section>

      {noticias.length > 0 && (
        <section className={styles.noticiasSection}>
          <h2 className={styles.noticiasTitle}>Novedades</h2>
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

export default Inicio;
