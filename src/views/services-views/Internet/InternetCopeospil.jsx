import React, { useState, useRef, useEffect } from "react";
import styles from "./internet.module.css";

/* ================= CAMPAÑAS ESTÁTICAS (fallback) ================= */
const campaignsDataStatic = [
  {
    img: "/assets/FibraOptica.jpg",
    title: "Fibra Óptica de Alta Velocidad",
    text: "Tecnología de punta para una conexión estable y rápida.",
  },
  {
    img: "/assets/internet1.jpg",
    title: "Planes para Todos",
    text: "Opciones adaptadas a tus necesidades de conectividad.",
  },
  {
    img: "/assets/internet2.jpg",
    title: "Soporte Técnico",
    text: "Asistencia permanente para resolver cualquier inconveniente.",
  },
  {
    img: "/assets/internet3.jpg",
    title: "Expansión de Red",
    text: "Trabajamos para llevar internet a más hogares.",
  },
];

function Internet() {
  /* ===== ACCORDION ===== */
  const [open, setOpen] = useState(null);
  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  /* ===== NOTICIAS DINÁMICAS ===== */
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/noticias?categoria=INTERNET")
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando noticias de Internet:", err);
        setLoading(false);
      });
  }, []);

  /* ===== SLIDER CAMPAÑAS ===== */
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Usar noticias de la API o las estáticas si no hay
  const campaignsData = noticias.length > 0 
    ? noticias.map(noticia => ({
        img: `http://localhost:3001${noticia.imagen}` || "/assets/FibraOptica.jpg",
        title: noticia.titulo,
        text: noticia.resumen || noticia.contenido.substring(0, 100) + "...",
      }))
    : campaignsDataStatic;

  const infiniteData = [...campaignsData, ...campaignsData];

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
    <div className={styles.internetContainer}>
      {/* ================= HERO ================= */}
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

      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <p>
          Conectividad de fibra óptica con alta velocidad, estabilidad y soporte
          técnico permanente para nuestros asociados.
        </p>
      </header>

      {/* ================= FEATURES ================= */}
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

      {/* ================= INFO ================= */}
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

      {/* ================= CAMPAÑAS / NOTICIAS ================= */}
      <section className={styles.campaigns}>
        <h3>Novedades de Internet</h3>

        {loading && <p style={{ textAlign: "center" }}>Cargando noticias...</p>}

        {!loading && (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}

export default Internet;