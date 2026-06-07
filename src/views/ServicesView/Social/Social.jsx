import React, { useState, useRef, useEffect } from "react";
import styles from "./social.module.css";
import { API_URL } from "../../../config/api";

function Social() {
  const [open, setOpen] = useState(null);
  const toggle = (index) => setOpen(open === index ? null : index);

  const [noticias, setNoticias]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/noticias?categoria=SOCIAL`)
      .then((res) => res.json())
      .then((data) => { setNoticias(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const scrollRef    = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCards = 4;
  const cardWidth    = 280;
  const gap          = 24;
  const cardSize     = cardWidth + gap;
  const totalDots    = Math.max(1, noticias.length - visibleCards + 1);

  const scrollToCard = (index) => {
    scrollRef.current?.scrollTo({ left: index * cardSize, behavior: "smooth" });
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || noticias.length === 0) return;
    const interval = setInterval(() => {
      const maxIndex = totalDots - 1;
      let next = activeIndex + 1 > maxIndex ? 0 : activeIndex + 1;
      if (next === 0) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = 0;
        container.style.scrollBehavior = "smooth";
      } else {
        container.scrollLeft = next * cardSize;
      }
      setActiveIndex(next);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots, noticias.length]);

  const formattedDate = selectedNoticia
    ? new Date(selectedNoticia.created_at).toLocaleDateString("es-AR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  const bgImage = selectedNoticia?.imagen
    ? `${API_URL}${selectedNoticia.imagen}`
    : "/assets/luto2.jpg";

  return (
    <div className={styles.socialContainer}>

      <div className={styles.heroContainer}>
        <img src="/assets/luto4.jpg" alt="Servicio Social" className={styles.heroImage} />
        <h1 className={styles.heroTitle}>Servicio Social</h1>
        <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.heroLogo} />
      </div>

      <header className={styles.header}>
        <p>Acompañamiento solidario y programas de asistencia para fortalecer el vínculo con nuestros asociados y la comunidad.</p>
      </header>

      <section className={styles.features}>
        <h3>Características del Servicio</h3>
        <div className={styles.featuresGrid}>
          {[
            { title: "Servicio de Sepelio",    text: "Acompañamiento en momentos difíciles con profesionalismo y respeto." },
            { title: "Programas Sociales",     text: "Iniciativas de apoyo para familias de la cooperativa." },
            { title: "Eventos Comunitarios",   text: "Actividades que fortalecen el espíritu cooperativo." },
            { title: "Asistencia Solidaria",   text: "Ayuda mutua entre asociados en situaciones de necesidad." },
          ].map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3>Información del Servicio</h3>
        <div className={styles.accordion}>
          {[
            { title: "¿Cómo acceder al servicio de sepelio?", text: "Los asociados tienen acceso automático. Consultá los alcances en nuestras oficinas." },
            { title: "Programas de ayuda",   text: "Disponemos de diferentes programas según las necesidades de los asociados." },
            { title: "Eventos y actividades", text: "Organizamos encuentros para fortalecer la comunidad cooperativa." },
            { title: "Requisitos",            text: "La información actualizada está disponible en nuestras oficinas." },
          ].map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button onClick={() => toggle(index)}>
                {item.title}
                <span>{open === index ? "−" : "+"}</span>
              </button>
              {open === index && (
                <div className={styles.accordionContent}><p>{item.text}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.campaigns}>
        <h3>Necrológicas</h3>

        {loading && <p style={{ textAlign: "center", color: "#999" }}>Cargando...</p>}

        {!loading && noticias.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", fontStyle: "italic" }}>
            No hay necrológicas publicadas.
          </p>
        )}

        {!loading && noticias.length > 0 && (
          <>
            <div className={styles.campaignsViewport}>
              <div ref={scrollRef} className={styles.campaignsScroll}>
                {noticias.map((n) => {
                  const bg = n.imagen
                    ? `${API_URL}${n.imagen}`
                    : "/assets/luto2.jpg";

                  return (
                    <div
                      key={n.id}
                      className={styles.obituaryCard}
                      onClick={() => setSelectedNoticia(n)}
                      style={{ backgroundImage: `url(${bg})` }}
                    >
                      <div className={styles.obituaryCardOverlay} />
                      <div className={styles.obituaryCardContent}>
                        <span className={styles.obCross}>✝</span>
                        <p className={styles.obQepd}>Q . E . P . D .</p>
                        <h4 className={styles.obName}>{n.titulo}</h4>
                        {(n.resumen || n.contenido) && (
                          <p className={styles.obPreview}>
                            {n.resumen || n.contenido.substring(0, 80) + "..."}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.dots}>
              {Array.from({ length: totalDots }).map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ""}`}
                  onClick={() => scrollToCard(i)}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {selectedNoticia && (
        <div className={styles.modalOverlay} onClick={() => setSelectedNoticia(null)}>
          <div className={styles.obituaryModal} onClick={(e) => e.stopPropagation()}>

            <button className={styles.obituaryCloseBtn} onClick={() => setSelectedNoticia(null)}>✕</button>

            <div className={styles.obituaryModalBg} style={{ backgroundImage: `url(${bgImage})` }} />
            <div className={styles.obituaryModalOverlay} />

            <div className={styles.obituaryModalContent}>

              <div className={styles.obituaryModalBrand}>
                <img src="/assets/LogoSinFondo.png" alt="COPEOSPIL" className={styles.obituaryModalLogo} />
                <span className={styles.obituaryModalBrandName}>COPEOSPIL</span>
                <span className={styles.obituaryModalService}>Servicio de Sepelio</span>
              </div>

              <div className={styles.obituaryModalDivider}>
                <span className={styles.obituaryModalLine} />
                <span className={styles.obituaryModalCross}>✝</span>
                <span className={styles.obituaryModalLine} />
              </div>

              <div className={styles.obituaryModalBody}>
                <p className={styles.obituaryModalQepd}>Q . E . P . D .</p>
                <h2 className={styles.obituaryModalName}>{selectedNoticia.titulo}</h2>
                {(selectedNoticia.resumen || selectedNoticia.contenido) && (
                  <p className={styles.obituaryModalMessage}>
                    {selectedNoticia.resumen || selectedNoticia.contenido}
                  </p>
                )}
              </div>

              <div className={styles.obituaryModalFooterDivider} />

              <div className={styles.obituaryModalFooter}>
                <span className={styles.obituaryModalDate}>{formattedDate}</span>
                <span className={styles.obituaryModalUrl}>www.copeospil.com.ar</span>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Social;
