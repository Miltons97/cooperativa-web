import React, { useState, useEffect } from "react";
// import styles from "institutional.module.css"

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
          <div className={styles.autoridadItem}>Presidente: Tarditi Marcelo Javier</div>
          <div className={styles.autoridadItem}>Vicepresidente: Gorodo Rubén Omar</div>
          <div className={styles.autoridadItem}>Secretario: Álvarez José Mateo</div>
          <div className={styles.autoridadItem}>Prosecretario: López María Cristina</div>
          <div className={styles.autoridadItem}>Tesorero: Gaggioli Hernán Luis</div>
          <div className={styles.autoridadItem}>Proesorero: Bogino Ariel Dario</div>
          <div className={styles.autoridadItem}>1°Vocal Titular: Cantelmi Hidalgo Juan Marcelo</div>
          <div className={styles.autoridadItem}>2°Vocal Titular: García Ezequiel</div>
          <div className={styles.autoridadItem}>3°Vocal Titular: Gorodo Juan José</div>
          <div className={styles.autoridadItem}>1°Vocal Suplente: Peano Raquel Beatriz</div>
          <div className={styles.autoridadItem}>2°Vocal Suplente: De Rosa Alejandra</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Muñoz Pedro Matías</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Garro Vanesa Lujan</div>
        </div>

      </section>
    </div>
  );
}

export default Institucional;
