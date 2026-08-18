import { useState, useRef, useEffect } from "react";
import styles from "./serviceNewsSection.module.css";
import { API_URL } from "../../config/api";
import NewsCard from "../News/shared/NewsCard";
import NewsModal from "../News/shared/NewsModal";
import { getCategoryColor } from "../News/shared/categoryColors";

function resolveImageUrl(noticia) {
  return noticia?.imagen ? `${API_URL}${noticia.imagen}` : null;
}

export default function ServiceNewsSection({ categoria, title }) {
  const [noticias, setNoticias]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const color = getCategoryColor(categoria);

  useEffect(() => {
    fetch(`${API_URL}/api/noticias?categoria=${encodeURIComponent(categoria)}`)
      .then((r) => r.json())
      .then((data) => { setNoticias(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [categoria]);

  const cardWidth  = 280;
  const gap        = 24;
  const cardSize   = cardWidth + gap;
  const visible    = 4;
  const totalDots  = Math.max(1, noticias.length - visible + 1);

  const scrollTo = (index) => {
    scrollRef.current?.scrollTo({ left: index * cardSize, behavior: "smooth" });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (noticias.length === 0) return;
    const interval = setInterval(() => {
      const next = activeIndex + 1 > totalDots - 1 ? 0 : activeIndex + 1;
      if (next === 0) {
        scrollRef.current.style.scrollBehavior = "auto";
        scrollRef.current.scrollLeft = 0;
        scrollRef.current.style.scrollBehavior = "smooth";
      } else {
        scrollRef.current.scrollLeft = next * cardSize;
      }
      setActiveIndex(next);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, cardSize, totalDots, noticias.length]);

  if (loading) return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color }}>{title}</h3>
      <div className={styles.skeletonRow}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </section>
  );

  if (noticias.length === 0) return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color }}>{title}</h3>
      <p className={styles.empty}>No hay publicaciones aún.</p>
    </section>
  );

  return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color }}>{title}</h3>
      <div className={styles.viewport}>
        <div ref={scrollRef} className={styles.scroll}>
          {noticias.map((n) => (
            <div key={n.id} className={styles.cardSlot}>
              <NewsCard
                noticia={n}
                imageUrl={resolveImageUrl(n)}
                color={color}
                onClick={() => setSelected(n)}
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
            style={activeIndex === i ? { background: color, width: "22px" } : {}}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      <NewsModal
        noticia={selected}
        imageUrl={resolveImageUrl(selected)}
        color={color}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
