import React, { useState, useEffect } from "react";
import styles from "./Institucional.module.css";

function Institucional() {
  // Slider imágenes tomadas desde /assets
  const sliderImages = [
    "/assets/Lineas1.jpg",
    "/assets/Galpon1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const mockPosts = [
    { id: 1, category: "AGUA", caption: "Visita alumnos carrera Maestro Mayor de Obras", media_url: "https://picsum.photos/id/1011/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 2, category: "INSTITUCIONAL", caption: "Nueva reunión con delegados de Chillar", media_url: "https://picsum.photos/id/1027/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 3, category: "INSTITUCIONAL", caption: "Reunión con delegados de Cacharí", media_url: "https://picsum.photos/id/1033/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 4, category: "AGUA", caption: "Visita Escuela Secundaria Nº5", media_url: "https://picsum.photos/id/1052/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 5, category: "INSTITUCIONAL", caption: "Recorrido de consejeros por TRANSBA", media_url: "https://picsum.photos/id/1062/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 6, category: "INSTITUCIONAL", caption: "Homenaje de la CEAL por los 50 años del Laboratorio Azul", media_url: "https://picsum.photos/id/1074/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 7, category: "INSTITUCIONAL", caption: "Reunión del Consejo de CEAL con concejales", media_url: "https://picsum.photos/id/1084/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 8, category: "INSTITUCIONAL", caption: "Firma convenios alumbrado público", media_url: "https://picsum.photos/id/109/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 9, category: "ENERGÍA", caption: "Acuerdo CEAL CAMMESA", media_url: "https://picsum.photos/id/119/600/400", permalink: "https://www.instagram.com/copeospil/" },
    { id: 10, category: "OBRAS", caption: "Nuevas columnas de hormigón", media_url: "https://picsum.photos/id/120/600/400", permalink: "https://www.instagram.com/copeospil/" },
  ];

  return (
    <div className={styles.novedadesContainer}>


      <div className={styles.sliderContainer}>
        <img
          src={sliderImages[currentIndex]}
          alt="Slide"
          className={styles.sliderImage}
        />
        <h1 className={styles.novedadesTitle}>Institucional</h1>
      </div>

      {/* Grid de noticias */}
      <div className={styles.novedadesGrid}>
        {mockPosts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.novedad}
          >
            <div className={styles.novedadImageContainer}>
              <img src={post.media_url} alt={post.caption} />
              <span className={styles.novedadCategory}>{post.category}</span>
            </div>
            <p className={styles.novedadCaption}>{post.caption}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Institucional;
