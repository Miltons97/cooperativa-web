import React, { useRef, useEffect, useState } from "react";
import styles from "./noticiasSilder.module.css";

const API_URL = "http://localhost:3001";

function NoticiasSlider({ noticias }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  const visibleCards = 3;
  const cardWidth = 300;
  const gap = 24;
  const cardSize = cardWidth + gap;
  const totalDots = Math.max(1, noticias.length - visibleCards + 1);

  const scrollToCard = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: index * cardSize, behavior: "smooth" });
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
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots]);

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.viewport}>
          <div ref={scrollRef} className={styles.scroll}>
            {noticias.map((n) => {
              const imageUrl = n.imagen
                ? `${API_URL}${n.imagen.startsWith("/") ? n.imagen : "/" + n.imagen}`
                : null;

              return (
                <article
                  key={n.id}
                  className={styles.card}
                  onClick={() => setSelectedNoticia(n)}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={n.titulo}
                        onError={(e) => { e.target.src = "/assets/placeholder.jpg"; }}
                      />
                    ) : (
                      <div className={styles.placeholder}>SIN IMAGEN</div>
                    )}
                    <span className={styles.categoria}>{n.categoria}</span>
                  </div>

                  <div className={styles.text}>
                    <h4>{n.titulo}</h4>
                    <p>{n.resumen || n.contenido.substring(0, 100) + "..."}</p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>Leer más</span>
                  </div>
                </article>
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
      </div>

      {selectedNoticia && (
        <div className={styles.modalOverlay} onClick={() => setSelectedNoticia(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedNoticia(null)}>
              ✕
            </button>

            {selectedNoticia.imagen && (
              <img
                src={`${API_URL}${selectedNoticia.imagen}`}
                alt={selectedNoticia.titulo}
              />
            )}

            <div className={styles.modalBody}>
              <h2>{selectedNoticia.titulo}</h2>
              <span>{selectedNoticia.categoria}</span>
              <hr className={styles.modalDivider} />
              <p>{selectedNoticia.contenido}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoticiasSlider;