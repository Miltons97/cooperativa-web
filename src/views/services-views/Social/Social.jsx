import React, { useState, useRef, useEffect } from "react";
import styles from "./social.module.css";

/* ================= CAMPAÑAS ESTÁTICAS (fallback) ================= */
const campaignsDataStatic = [
  {
    img: "/assets/Luto1.jpg",
    title: "Servicio de Sepelio",
    text: "Acompañamiento en momentos difíciles con dignidad y respeto.",
  },
  {
    img: "/assets/social1.jpg",
    title: "Asistencia Comunitaria",
    text: "Programas de apoyo para familias de la comunidad.",
  },
  {
    img: "/assets/social2.jpg",
    title: "Eventos Solidarios",
    text: "Actividades para fortalecer lazos entre asociados.",
  },
  {
    img: "/assets/social3.jpg",
    title: "Cooperativismo",
    text: "Valores que nos unen como comunidad.",
  },
];

function Social() {
  /* ===== ACCORDION ===== */
  const [open, setOpen] = useState(null);
  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  /* ===== NOTICIAS DINÁMICAS ===== */
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/noticias?categoria=SOCIAL")
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando noticias de Social:", err);
        setLoading(false);
      });
  }, []);

  /* ===== SLIDER CAMPAÑAS ===== */
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Usar noticias de la API o las estáticas si no hay
  const campaignsData = noticias.length > 0 
    ? noticias.map(noticia => ({
        img: `http://localhost:3001${noticia.imagen}` || "/assets/Luto1.jpg",
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
    <div className={styles.socialContainer}>
      {/* ================= HERO ================= */}
      <div className={styles.heroContainer}>
        <img
          src="/assets/Luto1.jpg"
          alt="Servicio Social"
          className={styles.heroImage}
        />

        <h1 className={styles.heroTitle}>Servicio Social</h1>

        <img
          src="/assets/logoSinFondo.jpg"
          alt="COPEOSPIL"
          className={styles.heroLogo}
        />
      </div>

      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <p>
          Acompañamiento solidario y programas de asistencia para fortalecer el
          vínculo con nuestros asociados y la comunidad.
        </p>
      </header>

      {/* ================= FEATURES ================= */}
      <section className={styles.features}>
        <h3>Características del Servicio</h3>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h4>Servicio de Sepelio</h4>
            <p>
              Acompañamiento en momentos difíciles con profesionalismo y respeto.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Programas Sociales</h4>
            <p>
              Iniciativas de apoyo para familias de la cooperativa.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Eventos Comunitarios</h4>
            <p>
              Actividades que fortalecen el espíritu cooperativo.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h4>Asistencia Solidaria</h4>
            <p>
              Ayuda mutua entre asociados en situaciones de necesidad.
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
              title: "¿Cómo acceder al servicio de sepelio?",
              text:
                "Los asociados tienen acceso automático. Consultá los alcances en nuestras oficinas.",
            },
            {
              title: "Programas de ayuda",
              text:
                "Disponemos de diferentes programas según las necesidades de los asociados.",
            },
            {
              title: "Eventos y actividades",
              text:
                "Organizamos encuentros para fortalecer la comunidad cooperativa.",
            },
            {
              title: "Requisitos",
              text:
                "La información actualizada está disponible en nuestras oficinas.",
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
        <h3>Novedades del Servicio Social</h3>

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

export default Social;