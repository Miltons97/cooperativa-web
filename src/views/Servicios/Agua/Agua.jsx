import React, { useState, useRef, useEffect } from "react";
import styles from "./Agua.module.css";

/* ================= CAMPAÑAS ================= */
const campaignsData = [
  {
    img: "/assets/grifo.jpg",
    title: "Cuidemos el Agua",
    text: "Promovemos el uso responsable del agua en los hogares.",
  },
  {
    img: "/assets/ApaIa.jpg",
    title: "Uso Responsable",
    text: "Pequeñas acciones diarias ayudan a preservar el recurso.",
  },
  {
    img: "/assets/ObraAgua1.jpg",
    title: "Nuevas Obras de Extensiones",
    text: "Trabajos programados para mejorar el servicio.",
  },
  {
    img: "/assets/MaquinaObra2.jpg",
    title: "Conciencia Ambiental",
    text: "El agua es un recurso vital, hagamos uso racional.",
  },
  {
    img: "/assets/AguaCamioneta1.jpg",
    title: "Optimización del Servicio",
    text: "Mejoras en la infraestructura para garantizar un suministro más eficiente.",
  },
  {
    img: "/assets/niño2.jpg",
    title: "Cuidado del Recurso",
    text: "Entre todos podemos proteger el agua para las futuras generaciones.",
  },
  {
    img: "/assets/mantenimiento1.jpg",
    title: "Mantenimiento de Red",
    text: "Tareas preventivas y correctivas para asegurar la continuidad del servicio.",
  },
];

const infiniteData = [...campaignsData, ...campaignsData];

function Agua() {
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
      const maxScroll = totalCards * cardSize;

      if (container.scrollLeft >= maxScroll) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = 0;
        container.style.scrollBehavior = "smooth";
      }

      container.scrollLeft += cardSize;
    }, 4000);

    return () => clearInterval(interval);
  }, [totalCards, cardSize]);

  return (
    <div className={styles.aguaContainer}>
 
      <div className={styles.heroContainer}>
        <img
          src="/assets/aguaGota.jpg"
          alt="Servicio de Agua Potable"
          className={styles.heroImage}
        />

        <h1 className={styles.heroTitle}>Servicio de Agua Potable</h1>

        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      {/* ================= HEADER ================= */}
      <header className={styles.header}>
      
        <p>
          Garantizamos el acceso al agua potable con estándares de calidad,
          mantenimiento continuo y atención permanente a nuestros usuarios.
        </p>
      </header>

      {/* ================= FEATURES ================= */}
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

      {/* ================= INFO ================= */}
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

      {/* ================= CAMPAÑAS ================= */}
      <section className={styles.campaigns}>
        <h3>Campañas de Agua de Red COPEOSPIL Ltda.</h3>

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

export default Agua;
