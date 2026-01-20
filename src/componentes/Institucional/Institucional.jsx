import React, { useState, useEffect } from "react";
import styles from "./Institucional.module.css";

function Institucional() {
  const sliderImages = [
    "/assets/Lineas1.jpg",
    "/assets/Galpon1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.institucionalContainer}>

      {/* SLIDER */}
      <div className={styles.sliderContainer}>
        <img
          src={sliderImages[currentIndex]}
          alt="Institucional"
          className={styles.sliderImage}
        />
        <h1 className={styles.institucionalTitle}>Institucional</h1>
      </div>

      {/* CONTENIDO */}
      <section className={styles.institucionalContent}>

        <h2>Quiénes somos</h2>
        <p>
          La Cooperativa Eléctrica de Servicios Públicos Ltda. fue fundada en el
          año 1958 como una iniciativa comunitaria destinada a garantizar el
          acceso a servicios esenciales. Desde sus inicios, la cooperativa ha
          crecido junto a la comunidad, promoviendo el desarrollo local, la
          solidaridad y la gestión responsable de los recursos.
        </p>

        {/* MISIÓN - VISIÓN - VALORES */}
        <div className={styles.mvvGrid}>
          <div className={styles.mvvItem}>
            <h3>Misión</h3>
            <p>
              Brindar servicios públicos eficientes y confiables, priorizando el
              bienestar de nuestros asociados y el desarrollo sustentable.
            </p>
          </div>

          <div className={styles.mvvItem}>
            <h3>Visión</h3>
            <p>
              Ser una cooperativa referente en la región por su compromiso
              social, innovación y transparencia en la gestión.
            </p>
          </div>

          <div className={styles.mvvItem}>
            <h3>Valores</h3>
            <ul>
              <li>Solidaridad</li>
              <li>Responsabilidad</li>
              <li>Transparencia</li>
              <li>Compromiso comunitario</li>
              <li>Participación democrática</li>
            </ul>
          </div>
        </div>

        {/* AUTORIDADES */}
        <h2>Autoridades</h2>

        <div className={styles.autoridadesGrid}>
          <div className={styles.autoridadItem}>Presidente: Juan Carlos Pérez</div>
          <div className={styles.autoridadItem}>Vicepresidente: María Gómez</div>
          <div className={styles.autoridadItem}>Tesorero: Roberto Fernández</div>
          <div className={styles.autoridadItem}>Secretario: Ana Ríos</div>

          <div className={styles.autoridadItem}>Vocal Titular: Luis Martínez</div>
          <div className={styles.autoridadItem}>Vocal Titular: Silvia Acosta</div>

          <div className={styles.autoridadItem}>Vocal Suplente: Diego Morales</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Carla Benítez</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Pablo Núñez</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Laura Quiroga</div>
        </div>

      </section>
    </div>
  );
}

export default Institucional;
