import React, { useState, useEffect } from "react";
import styles from "./institutional.module.css";

function Institutional() {
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

      <div className={styles.sliderContainer}>
        <img
          src={sliderImages[currentIndex]}
          alt="Institucional"
          className={styles.sliderImage}
        />
        <h1 className={styles.institucionalTitle}>Institucional</h1>
      </div>

      <section className={styles.institucionalContent}>
<h2>Quiénes somos</h2>
<p>
  La Cooperativa Eléctrica de Servicios Públicos COPEOSPIL Ltda. nació por decisión
  de la comunidad de Ingeniero Luiggi, reunida en asamblea popular el 30 de junio de 1956,
  con el objetivo de brindar el servicio de energía eléctrica a la localidad.
</p>

<p>
  Con el paso de los años, la cooperativa amplió sus servicios y su alcance regional.
  El 3 de diciembre de 1971 comenzó la extensión hacia las localidades de Embajador Martini
  y Alta Italia. En 1983 quedaron oficialmente inaugurados los primeros 250 kilómetros de
  líneas rurales, fortaleciendo el desarrollo productivo de la zona.
</p>

<p>
  Posteriormente, COPEOSPIL incorporó nuevos servicios esenciales para la comunidad:
  agua de red en 1984, planta de agua mineralizada en 1991, servicio de sepelio desde 1999
  e internet desde 2008, evolucionando con el tiempo hacia la conectividad mediante fibra
  óptica al hogar (FTTH).
</p>

<p>
  Actualmente, la cooperativa cubre la totalidad de Ingeniero Luiggi con disponibilidad
  de conectividad de fibra óptica, brindando un servicio moderno y de calidad para hogares,
  comercios e instituciones.
</p>

<p>
  Desde sus inicios hasta hoy, la cooperativa continúa creciendo junto a la comunidad,
  sosteniendo los valores de compromiso, solidaridad y desarrollo para Ingeniero Luiggi, Embajador Martini, Alta Italia y Ojeda.
</p>


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

export default Institutional;
