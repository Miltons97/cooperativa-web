import React, { useState, useEffect } from "react";
import styles from "./news.module.css";
import { API_URL } from "../../config/api";
import NewsCard from "./shared/NewsCard";
import NewsModal from "./shared/NewsModal";
import { getCategoryColor } from "./shared/categoryColors";

function News() {
  const sliderImages = [
    "/assets/Lineas1.jpg",
    "/assets/Galpon1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/noticias?seccion=novedades`)
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando novedades:", err);
        setLoading(false);
      });
  }, []);

  const resolveImageUrl = (noticia) =>
    noticia?.imagen ? `${API_URL}${noticia.imagen}` : null;

  return (
    <div className={styles.novedadesContainer}>

      <div className={styles.sliderContainer}>
        <img
          src={sliderImages[currentIndex]}
          alt="Novedades"
          className={styles.sliderImage}
        />
        <h1 className={styles.novedadesTitle}>Novedades</h1>
      </div>

      <div className={styles.novedadesGrid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))
          : noticias.map((noticia) => (
              <NewsCard
                key={noticia.id}
                noticia={noticia}
                imageUrl={resolveImageUrl(noticia)}
                color={getCategoryColor(noticia.categoria)}
                onClick={() => setSelectedNoticia(noticia)}
              />
            ))}
      </div>

      <NewsModal
        noticia={selectedNoticia}
        imageUrl={resolveImageUrl(selectedNoticia)}
        color={getCategoryColor(selectedNoticia?.categoria)}
        onClose={() => setSelectedNoticia(null)}
      />
    </div>
  );
}

export default News;
