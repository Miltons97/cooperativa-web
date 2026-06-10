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
              text: "La solicitud puede realizarse de forma presencial en nuestras oficinas o a través del sitio web.",
            },
            {
              title: "¿Cómo solicito la suspensión del servicio?",
              text: "Para solicitar la suspensión del servicio (no desconexión), es necesario presentarse en nuestras oficinas (Belgrano 654) y completar el formulario 'Suspensión a Pedido del Usuario'.\n\nDeberá adjuntar fotocopia de su Documento y la última factura de COPEOSPIL .Ltda.",
            },
            {
              title: "El Medidor ¿Qué es y cómo leerlo?",
              text: "El medidor de agua es el aparato que registra el volumen de agua consumido en tu domicilio. Para leerlo, observá los números que aparecen en el visor de izquierda a derecha: esos dígitos indican los metros cúbicos (m³) consumidos. La diferencia entre dos lecturas consecutivas determina tu consumo del período.",
              image: "/assets/medidorAgua.png",
              imageAlt: "Medidor de agua - cómo leerlo",
            },
            {
              title: "Facturación y tarifas",
              text: "Las tarifas se actualizan periódicamente y están disponibles para su consulta.",
            },
          ].map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button onClick={() => toggle(index)}>
                {item.title}
                <span>{open === index ? "−" : "+"}</span>
              </button>

              {open === index && (
                <div className={styles.accordionContent}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className={styles.accordionImage}
                    />
                  )}
                  {item.text.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
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
