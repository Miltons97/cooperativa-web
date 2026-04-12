import React, { useState, useRef, useEffect } from "react";
import styles from "./AguaMineral.module.css";

/* ================= CAMPAÑAS ================= */
const campaignsData = [
  {
    img: "/assets/mineral1.jpg",
    title: "Pureza Garantizada",
    text: "El agua es tratada mediante ósmosis inversa para eliminar impurezas.",
  },
  {
    img: "/assets/ApaIa.jpg",
    title: "Control de Calidad",
    text: "Realizamos análisis constantes para asegurar un producto seguro y confiable.",
  },
  {
    img: "/assets/ObraAgua1.jpg",
    title: "Producción Industrial",
    text: "Contamos con tecnología moderna para el envasado de agua mineral.",
  },
  {
    img: "/assets/MaquinaObra2.jpg",
    title: "Distribución Segura",
    text: "Garantizamos la entrega en óptimas condiciones de higiene y conservación.",
  },
  {
    img: "/assets/AguaCamioneta1.jpg",
    title: "Servicio Eficiente",
    text: "Logística optimizada para abastecer hogares y comercios.",
  },
  {
    img: "/assets/niño2.jpg",
    title: "Salud y Bienestar",
    text: "Agua mineral segura para toda la familia.",
  },
  {
    img: "/assets/mantenimiento1.jpg",
    title: "Mantenimiento Técnico",
    text: "Supervisión constante de equipos de producción y filtrado.",
  },
];

const infiniteData = [...campaignsData, ...campaignsData];

function AguaMineral() {
  /* ===== ACCORDION ===== */
  const [open, setOpen] = useState(null);
  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  /* ===== SLIDER ===== */
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = campaignsData.length;
  const visibleCards = 4;

  const cardWidth = 280;
  const gap = 24;
  const cardSize = cardWidth + gap;

  const totalDots = totalCards - visibleCards + 1;

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * cardSize,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const maxIndex = totalDots - 1;
      let nextIndex = activeIndex + 1;

      if (nextIndex > maxIndex) {
        nextIndex = 0;
        container.style.scrollBehavior = "auto";
        container.scrollLeft = 0;
        container.style.scrollBehavior = "smooth";
      } else {
        container.scrollLeft = nextIndex * cardSize;
      }

      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots]);

  return (
    <div className={styles.aguaContainer}>
      {/* HERO */}
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

      {/* HEADER */}
      <header className={styles.header}>
        <p>
          Brindamos agua mineral de alta calidad mediante procesos de ósmosis
          inversa y envasado industrial, garantizando pureza, seguridad y
          confianza para nuestros usuarios.
        </p>
      </header>

      {/* FEATURES */}
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

      {/* INFO */}
      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo solicitar el servicio?",
              text:
                "Podés solicitar el servicio de agua mineral comunicándote con nuestras oficinas o mediante nuestros canales digitales.",
            },
            {
              title: "¿Qué es la ósmosis inversa?",
              text:
                "Es un proceso de purificación que elimina contaminantes del agua mediante membranas especiales.",
            },
            {
              title: "Presentaciones disponibles",
              text:
                "Disponemos de diferentes formatos de envasado adaptados a hogares y empresas.",
            },
            {
              title: "Control de calidad",
              text:
                "Nuestro producto cumple con controles estrictos para asegurar pureza y seguridad.",
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

      {/* CAMPAÑAS */}
      <section className={styles.campaigns}>
        <h3>Producción y Calidad del Agua</h3>

        <div className={styles.campaignsViewport}>
          <div ref={scrollRef} className={styles.campaignsScroll}>
            {infiniteData.map((item, index) => (
              <div key={index} className={styles.campaignCard}>
                <img
                  src="/assets/copeospil.jpg"
                  alt="COPEOSPIL"
                  className={styles.cardLogo}
                />

                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.campaignImage}
                />

                <div className={styles.campaignText}>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className={styles.dots}>
          {Array.from({ length: totalDots }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                activeIndex === index ? styles.dotActive : ""
              }`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default AguaMineral;
