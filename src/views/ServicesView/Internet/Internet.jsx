import React, { useState } from "react";
import styles from "./internet.module.css";
import ServiceNewsSection from "../../../components/ServiceNewsSection/ServiceNewsSection";

function Internet() {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  return (
    <div className={styles.internetContainer}>
      <div className={styles.heroContainer}>
        <img
          src="/assets/FibraOptica.jpg"
          alt="Servicio de Internet"
          className={styles.heroImage}
        />

        <h1 className={styles.heroTitle}>Servicio de Internet</h1>

        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      <header className={styles.header}>
        <p>
          Conectividad de fibra óptica con alta velocidad, estabilidad y soporte
          técnico permanente para nuestros asociados.
        </p>
      </header>

      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Fibra Óptica</h4>
            <p>
              Tecnología de última generación para una conexión ultra rápida.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Planes Flexibles</h4>
            <p>
              Opciones adaptadas a diferentes necesidades y presupuestos.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Soporte 24/7</h4>
            <p>
              Asistencia técnica disponible para resolver inconvenientes.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Expansión Continua</h4>
            <p>
              Trabajamos para llevar conectividad a más hogares de la zona.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo contratar el servicio de internet?",
              text:
                "Podés solicitarlo en nuestras oficinas o a través de nuestros canales digitales.",
            },
            {
              title: "Planes disponibles",
              text:
                "Contamos con diferentes velocidades adaptadas a cada necesidad.",
            },
            {
              title: "Problemas de conexión",
              text:
                "Contactá a soporte técnico para diagnóstico y solución.",
            },
            {
              title: "Instalación",
              text:
                "La instalación es realizada por técnicos certificados.",
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

      <ServiceNewsSection categoria="INTERNET" title="Novedades — Internet" />
    </div>
  );
}

export default Internet;
