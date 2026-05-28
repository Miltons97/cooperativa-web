import React, { useState } from "react";
import styles from "./water.module.css";
import ServiceNewsSection from "../../../components/ServiceNewsSection/ServiceNewsSection";

function Water() {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  return (
    <div className={styles.aguaContainer}>

      <div className={styles.heroContainer}>
        <img
          src="/assets/aguaGota.jpg"
          alt="Servicio de Agua Potable"
          className={styles.heroImage}
        />

        <h1 className={styles.heroTitle}>Servicio Agua de Red</h1>

        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      <header className={styles.header}>
        <p>
          Garantizamos el acceso al agua potable con estándares de calidad,
          mantenimiento continuo y atención permanente a nuestros usuarios.
        </p>
      </header>

      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Captación y Potabilización</h4>
            <p>
              El agua es captada de fuentes subterráneas y sometida a procesos de
              filtrado y desinfección.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Red de Distribución</h4>
            <p>
              Contamos con una red de cañerías que abastece a toda la localidad.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Control de Calidad</h4>
            <p>
              Se realizan análisis periódicos para garantizar la calidad del
              agua suministrada.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Atención al Usuario</h4>
            <p>
              Canales de contacto para reclamos, consultas técnicas y gestiones
              administrativas.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo solicitar la conexión de agua?",
              text:
                "La solicitud puede realizarse de forma presencial en nuestras oficinas o a través del sitio web.",
            },
            {
              title: "Corte del servicio por mantenimiento",
              text:
                "Los cortes programados son informados con antelación.",
            },
            {
              title: "Reclamos por baja presión",
              text:
                "Se recomienda verificar instalaciones internas y comunicarse con atención técnica.",
            },
            {
              title: "Facturación y tarifas",
              text:
                "Las tarifas se actualizan periódicamente y están disponibles para su consulta.",
            },
          ].map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button onClick={() => toggle(index)}>
                {item.title}
                <span>{open === index ? "−" : "+"}</span>
              </button>

              {open === index && (
                <div className={styles.accordionContent}>
                  <p>{item.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <ServiceNewsSection categoria="AGUA" title="Novedades — Agua de Red" />
    </div>
  );
}

export default Water;
