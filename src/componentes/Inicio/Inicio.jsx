import React, { useEffect, useState } from "react";
import Cards from "../../views/Cards/cards";
import NoticiasSlider from "../Silders/noticiasSilder";
import styles from "./Inicio.module.css";

function Inicio() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    // ← Filtra solo noticias para inicio
    fetch("http://localhost:3001/api/noticias?seccion=inicio")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error("Error cargando noticias", err));
  }, []);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>COPEOSPIL.Ltda</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Energía que nos une, soluciones que nos acompañan.
          </p>
        </div>
        <div className={styles.logoWrapper}>
          <img
            src="/assets/logoSinFondo.jpg"
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