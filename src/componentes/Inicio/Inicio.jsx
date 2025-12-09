import React from "react";
import Cards from "./Cards/Cards"; // asegurate que el nombre de archivo sea Cards.jsx
import styles from "./Inicio.module.css";

function Inicio() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero con video */}
      <div className={styles.hero}>
        <video
          className={styles.video}
          src="/assets/prueba2.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className={styles.overlay}>
          <img
            src="/assets/copeospil.jpg"
            alt="Logo Cooperativa"
            className={styles.logo}
          />
          <h1 className={styles.title}>Bienvenidos a COPEOSPIL Ltda</h1>
          <p className={styles.subtitle}>
            Creciendo juntos, porque tu bienestar es el nuestro.
          </p>
        </div>
      </div>

      {/* Contenedor de cards al final */}
      <div className={styles.cardsWrapper}>
        <Cards />
      </div>
    </div>
  );
}

export default Inicio;
