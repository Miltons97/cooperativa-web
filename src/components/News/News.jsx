import React, { useState, useEffect } from "react";
import styles from "./news.module.css";
import { API_URL } from "../../config/api";

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
        {loading ? (
          <p>Cargando novedades...</p>
        ) : (
          noticias.map((noticia) => (
            <div
              key={noticia.id}
              className={styles.novedad}
              onClick={() => setSelectedNoticia(noticia)}
            >
              <div className={styles.novedadImageContainer}>
                {noticia.imagen && (
                  <img
                    src={`${API_URL}${noticia.imagen}`}
                    alt={noticia.titulo}
                  />
                )}
                <span className={styles.novedadCategory}>
                  {noticia.categoria}
                </span>
              </div>

              <div className={styles.novedadCaption}>
                {noticia.titulo}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedNoticia && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedNoticia(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedNoticia(null)}
            >
              ✕
            </button>

            {selectedNoticia.imagen && (
              <div className={styles.modalImageContainer}>
                <img
                  src={`${API_URL}${selectedNoticia.imagen}`}
                  alt=""
                  aria-hidden="true"
                  className={styles.modalImageBlur}
                />
                <img
                  src={`${API_URL}${selectedNoticia.imagen}`}
                  alt={selectedNoticia.titulo}
                  className={styles.modalImageMain}
                />
                <span className={styles.modalCategoriaBadge}>
                  {selectedNoticia.categoria}
                </span>
              </div>
            )}

            <div className={styles.modalBody}>
              <h2>{selectedNoticia.titulo}</h2>
              <p>{selectedNoticia.contenido}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
