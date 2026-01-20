import React from "react";
import Cards from "../../views/Cards/cards";
import styles from "./Inicio.module.css";

function Inicio() {
  return (
    <div className={styles.pageContainer}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>COPEOSPIL.Ltda</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Energía que nos une, soluciones que nos acompañan.
          </p>
        </div>
        <div className={styles.logoWrapper}> <img src="/assets/logoSinFondo.jpg" alt="Logo COPEOSPIL" className={styles.logo} /> </div>
      </section>
      <div className={styles.divider2}></div>
      <section className={styles.cardsSection}>
        <Cards />
      </section>

    </div>
  );
}

export default Inicio;
