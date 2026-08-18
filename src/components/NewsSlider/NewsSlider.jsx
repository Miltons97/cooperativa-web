import React, { useRef, useEffect, useState } from "react";
import styles from "./newsSlider.module.css";
import { API_URL } from "../../config/api";
import NewsCard from "../News/shared/NewsCard";
import NewsModal from "../News/shared/NewsModal";
import { getCategoryColor } from "../News/shared/categoryColors";

function resolveImageUrl(noticia) {
  if (!noticia?.imagen) return null;
  return `${API_URL}${noticia.imagen.startsWith("/") ? noticia.imagen : "/" + noticia.imagen}`;
}

function NewsSlider({ noticias }) {
  const items = noticias.filter((n) => n.categoria !== "SOCIAL");

  const scrollRef  = useRef(null);
  const [activeIndex, setActiveIndex]         = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  const visibleCards = 3;
  const cardWidth    = 300;
  const gap          = 24;
  const cardSize     = cardWidth + gap;
  const totalDots    = Math.max(1, items.length - visibleCards + 1);

  const scrollToCard = (index) => {
    scrollRef.current?.scrollTo({ left: index * cardSize, behavior: "smooth" });
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
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
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots]);

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.viewport}>
          <div ref={scrollRef} className={styles.scroll}>
            {items.map((n) => (
              <div key={n.id} className={styles.cardSlot}>
                <NewsCard
                  noticia={n}
                  imageUrl={resolveImageUrl(n)}
                  color={getCategoryColor(n.categoria)}
                  onClick={() => setSelectedNoticia(n)}
                />
              </div>
            ))}
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

      <NewsModal
        noticia={selectedNoticia}
        imageUrl={resolveImageUrl(selectedNoticia)}
        color={getCategoryColor(selectedNoticia?.categoria)}
        onClose={() => setSelectedNoticia(null)}
      />
    </>
  );
}

export default NewsSlider;
