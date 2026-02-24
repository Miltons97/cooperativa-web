import React, { useRef, useEffect, useState } from "react";
import styles from "./noticiasSilder.module.css";

const API_URL = "http://localhost:3001";

function NoticiasSlider({ noticias }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCards = 3;
  const cardWidth = 280;
  const gap = 24;
  const cardSize = cardWidth + gap;

  const totalDots = noticias.length - visibleCards + 1;

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
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots]);

  return (
    <div className={styles.slider}>
      <div className={styles.viewport}>
        <div ref={scrollRef} className={styles.scroll}>
          {noticias.map((n) => {
            // ✅ CORREGIDO: Eliminar la barra inicial si existe
            const imageUrl = n.imagen
              ? `${API_URL}${n.imagen.startsWith('/') ? n.imagen : '/' + n.imagen}`
              : null;

            return (
              <article key={n.id} className={styles.card}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={n.titulo}
                    onError={(e) => {
                      console.error("❌ Error cargando:", imageUrl);
                      e.target.src = "/assets/placeholder.jpg"; // Imagen por defecto
                    }}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    SIN IMAGEN
                  </div>
                )}

                <span className={styles.categoria}>{n.categoria}</span>

                <div className={styles.text}>
                  <h4>{n.titulo}</h4>
                  <p>{n.resumen || n.contenido.substring(0, 100) + "..."}</p>
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
            className={`${styles.dot} ${
              activeIndex === i ? styles.dotActive : ""
            }`}
            onClick={() => scrollToCard(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default NoticiasSlider;