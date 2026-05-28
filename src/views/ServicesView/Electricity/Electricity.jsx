import React, { useState } from "react";
import styles from "./electricity.module.css";
import ServiceNewsSection from "../../../components/ServiceNewsSection/ServiceNewsSection";

function Electricity() {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  return (
    <div className={styles.luzContainer}>

      <div className={styles.heroContainer}>
        <img
          src="/assets/posteLuz.jpg"
          alt="Servicio de Energía Eléctrica"
          className={styles.heroImage}
        />
        <h1 className={styles.heroTitle}>Servicio de Energía Eléctrica</h1>
        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      <header className={styles.header}>
        <p>
          Brindamos un servicio eléctrico seguro y confiable, con mantenimiento
          permanente y atención continua a nuestros asociados.
        </p>
      </header>

      <div className={styles.dualSection}>
        <div className={`${styles.dualBlock} ${styles.urbana}`}>
          <div className={styles.dualBlockHeader}>
            <span>🏙</span>
            <h3>Electricidad Urbana</h3>
          </div>
          <div className={styles.dualBlockBody}>
            <p>
              Suministro eléctrico para zonas urbanas con red de media y baja
              tensión.
            </p>
            <ul>
              <li>Red domiciliaria y comercial</li>
              <li>Alumbrado público</li>
              <li>Mantenimiento preventivo</li>
              <li>Atención de emergencias</li>
            </ul>
          </div>
        </div>

        <div className={`${styles.dualBlock} ${styles.rural}`}>
          <div className={styles.dualBlockHeader}>
            <span>🌾</span>
            <h3>Electricidad Rural</h3>
          </div>
          <div className={styles.dualBlockBody}>
            <p>
              Cobertura eléctrica para zonas rurales y establecimientos
              agropecuarios.
            </p>
            <ul>
              <li>Líneas de alta tensión rural</li>
              <li>Conexiones para establecimientos</li>
              <li>Extensiones de red</li>
              <li>Soporte técnico especializado</li>
            </ul>
          </div>
        </div>
      </div>

      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Distribución Eléctrica</h4>
            <p>Red de media y baja tensión que abastece a toda la localidad.</p>
          </div>

          <div className={styles.featureCard}>
            <h4>Mantenimiento Preventivo</h4>
            <p>Inspecciones periódicas para evitar interrupciones del servicio.</p>
          </div>

          <div className={styles.featureCard}>
            <h4>Seguridad</h4>
            <p>
              Cumplimos con normas técnicas para proteger a usuarios y operarios.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Atención al Usuario</h4>
            <p>Asistencia ante reclamos, cortes y consultas administrativas.</p>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo solicitar conexión eléctrica?",
              text: "La solicitud se realiza en nuestras oficinas o mediante los canales digitales.",
            },
            {
              title: "Cortes programados",
              text: "Los cortes por mantenimiento se informan previamente.",
            },
            {
              title: "Reclamos por baja tensión",
              text: "Comuníquese con el área técnica para su verificación.",
            },
            {
              title: "Documentación necesaria para la habilitación",
              text: "Los documentos vigentes se encuentran disponibles para consulta.",
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

      <ServiceNewsSection categoria="LUZ" title="Novedades — Energía Eléctrica" />

    </div>
  );
}

export default Electricity;
