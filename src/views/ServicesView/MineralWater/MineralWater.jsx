import React, { useState } from "react";
import styles from "./mineralWater.module.css";
import ServiceNewsSection from "../../../components/ServiceNewsSection/ServiceNewsSection";

function MineralWater() {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  return (
    <div className={styles.aguaContainer}>
      <div className={styles.heroContainer}>
        <img
          src="/assets/aguaGota.jpg"
          alt="Agua Mineral"
          className={styles.heroImage}
        />

        <h1 className={styles.heroTitle}>Servicio de Agua Mineral</h1>

        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      <header className={styles.header}>
        <p>
          Brindamos agua mineral de alta calidad mediante procesos de ósmosis
          inversa y envasado industrial, garantizando pureza, seguridad y
          confianza para nuestros usuarios.
        </p>
      </header>

      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Ósmosis Inversa</h4>
            <p>
              Sistema avanzado de filtración que elimina impurezas, sales y
              contaminantes del agua.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Envasado Industrial</h4>
            <p>
              Proceso automatizado bajo normas de higiene que asegura la calidad
              del producto final.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Control Sanitario</h4>
            <p>
              Análisis periódicos para garantizar agua segura y apta para consumo.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Distribución</h4>
            <p>
              Entrega eficiente a domicilios, empresas y comercios locales.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo solicitar el servicio?",
              text: "Podés solicitar el servicio de agua mineral comunicándote con nuestras oficinas o mediante nuestros canales digitales.",
            },
            {
              title: "¿Qué es la ósmosis inversa?",
              text: "Es un proceso de purificación que elimina contaminantes del agua mediante membranas especiales.",
            },
            {
              title: "Presentaciones disponibles",
              text: "Disponemos de diferentes formatos de envasado adaptados a hogares y empresas.",
            },
            {
              title: "Control de calidad",
              text: "Nuestro producto cumple con controles estrictos para asegurar pureza y seguridad.",
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

      <ServiceNewsSection categoria="AGUA MINERAL" title="Novedades — Agua Mineral" />
    </div>
  );
}

export default MineralWater;
