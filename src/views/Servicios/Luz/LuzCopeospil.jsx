import React, { useState, useRef, useEffect } from "react";
import styles from "./LuzCopeospil.module.css";

/* ================= CAMPAÑAS ================= */
const campaignsData = [
  {
    img: "/assets/luiggi1.jpg",
    title: "Uso Responsable de Energía",
    text: "Promovemos hábitos de consumo eficientes en los hogares.",
  },
  {
    img: "/assets/Lineas1.jpg",
    title: "Mantenimiento de Red",
    text: "Trabajos preventivos para garantizar el suministro eléctrico.",
  },
  {
    img: "/assets/Luz2.jpg",
    title: "Mejoras en Infraestructura",
    text: "Obras para optimizar la distribución de energía.",
  },
  {
    img: "/assets/seguridad1.jpg",
    title: "Conciencia Energética",
    text: "La energía es un recurso clave, cuidémosla entre todos.",
  },
  {
    img: "/assets/gruaCampo1.jpg",
    title: "Atención al Usuario",
    text: "Canales de contacto para reclamos y consultas.",
  },
  {
    img: "/assets/gruaCampo2.jpg",
    title: "Energía Segura",
    text: "Protocolos y controles para un servicio confiable.",
  },
  {
    img: "/assets/trafo1.jpg",
    title: "Crecimiento Sostenible",
    text: "Planificación para acompañar el crecimiento de la comunidad.",
  },
];

const infiniteData = [...campaignsData, ...campaignsData];

function Luz() {
  /* ===== ACCORDION ===== */
  const [open, setOpen] = useState(null);
  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  /* ===== SLIDER CAMPAÑAS ===== */
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
    <div className={styles.luzContainer}>
      {/* ================= HERO ================= */}
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

      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <p>
          Brindamos un servicio eléctrico seguro y confiable, con mantenimiento
          permanente y atención continua a nuestros asociados.
        </p>
      </header>

      {/* ================= FEATURES ================= */}
      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Distribución Eléctrica</h4>
            <p>
              Red de media y baja tensión que abastece a toda la localidad.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Mantenimiento Preventivo</h4>
            <p>
              Inspecciones periódicas para evitar interrupciones del servicio.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Seguridad</h4>
            <p>
              Cumplimos con normas técnicas para proteger a usuarios y operarios.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Atención al Usuario</h4>
            <p>
              Asistencia ante reclamos, cortes y consultas administrativas.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INFO ================= */}
      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>

        <div className={styles.accordion}>
          {[
            {
              title: "¿Cómo solicitar conexión eléctrica?",
              text:
                "La solicitud se realiza en nuestras oficinas o mediante los canales digitales.",
            },
            {
              title: "Cortes programados",
              text:
                "Los cortes por mantenimiento se informan previamente.",
            },
            {
              title: "Reclamos por baja tensión",
              text:
                "Comuníquese con el área técnica para su verificación.",
            },
            {
              title: "Documentación necesaria para la habilitación",
              text:
                "Los documentos vigentes se encuentran disponibles para consulta.",
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

      {/* ================= CAMPAÑAS ================= */}
      <section className={styles.campaigns}>
        <h3>Campañas de Energía Eléctrica</h3>

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

export default Luz;
