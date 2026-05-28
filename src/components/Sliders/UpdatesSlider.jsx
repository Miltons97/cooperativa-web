import React, { useRef, useEffect, useState } from "react";
import styles from "./updatesSlider.module.css";
import { API_URL } from "../../config/api";

function UpdatesSlider({ novedades }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCards = 3;
  const cardWidth = 320;
  const gap = 16;
  const cardSize = cardWidth + gap;

  const totalDots =
    novedades.length > visibleCards
      ? novedades.length - visibleCards + 1
      : 1;

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
    if (totalDots <= 1) return;

    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const maxIndex = totalDots - 1;
      let nextIndex = activeIndex + 1;

      if (nextIndex > maxIndex) {
        nextIndex = 0;
      }

      container.scrollTo({
        left: nextIndex * cardSize,
        behavior: "smooth",
      });

      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, totalDots, cardSize]);

  return (
    <div className={styles.slider}>
      <div className={styles.viewport}>
        <div ref={scrollRef} className={styles.scroll}>
          {novedades.map((n) => {
            const imageUrl = n.imagen
              ? `${API_URL}${n.imagen.startsWith("/") ? n.imagen : "/" + n.imagen}`
              : null;

            return (
              <article key={n.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={n.titulo}
                      onError={(e) => {
                        e.target.src = "/assets/placeholder.jpg";
                      }}
                    />
                  ) : (
                    <div className={styles.placeholder}>SIN IMAGEN</div>
                  )}

                  <span className={styles.categoria}>
                    {n.categoria}
                  </span>
                </div>

                <div className={styles.caption}>
                  {n.titulo}
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

export default UpdatesSlider;
