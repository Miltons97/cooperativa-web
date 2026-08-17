import React, { useRef, useEffect, useState } from "react";
import styles from "./newsSlider.module.css";
import { API_URL } from "../../config/api";

const CAT_COLORS = {
  AGUA:      "#0077b6",
  LUZ:       "#e67e22",
  INTERNET:  "#6c5ce7",
  NOVEDADES: "#e74c3c",
  INICIO:    "#0b2b4a",
};

function NewsSlider({ noticias }) {
  const items = noticias.filter((n) => n.categoria !== "SOCIAL");

  const scrollRef  = useRef(null);
  const [activeIndex, setActiveIndex]         = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState(null);
  const [heroRatio, setHeroRatio]             = useState(null);

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

  const sel = selectedNoticia;
  const catColor = sel ? (CAT_COLORS[sel.categoria] ?? CAT_COLORS.INICIO) : "#0b2b4a";

  const formattedDate = sel
    ? new Date(sel.created_at).toLocaleDateString("es-AR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.viewport}>
          <div ref={scrollRef} className={styles.scroll}>

            {items.map((n) => {
              const color    = CAT_COLORS[n.categoria] ?? CAT_COLORS.INICIO;
              const imageUrl = n.imagen
                ? `${API_URL}${n.imagen.startsWith("/") ? n.imagen : "/" + n.imagen}`
                : null;

              return (
                <article
                  key={n.id}
                  className={styles.card}
                  style={{ "--c": color }}
                  onClick={() => { setSelectedNoticia(n); setHeroRatio(null); }}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl ? (
                      <>
                        <div
                          className={styles.imgBlurBg}
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                        <img src={imageUrl} alt={n.titulo} className={styles.cardImg} />
                      </>
                    ) : (
                      <div
                        className={styles.imgFallback}
                        style={{ color }}
                      >
                        {n.categoria}
                      </div>
                    )}
                    <span className={styles.catChip} style={{ color }}>{n.categoria}</span>
                    <div className={styles.cardBrand}>
                      <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.cardBrandLogo} />
                      <span className={styles.cardBrandLabel}>COPEOSPIL</span>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{n.titulo}</h4>
                    {n.contenido && (
                      <p className={styles.cardExcerpt}>
                        {n.contenido.replace(/\n+/g, " ").slice(0, 72)}
                      </p>
                    )}
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{new Date(n.created_at).toLocaleDateString("es-AR")}</span>
                      <span className={styles.readMore}>Ver →</span>
                    </div>
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
      {sel && (
        <div className={styles.modalOverlay} onClick={() => setSelectedNoticia(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              className={styles.modalHero}
              style={heroRatio ? { aspectRatio: heroRatio } : undefined}
            >
              {sel.imagen ? (
                <>
                  <img
                    src={`${API_URL}${sel.imagen.startsWith("/") ? sel.imagen : "/" + sel.imagen}`}
                    alt=""
                    className={styles.modalHeroBlur}
                  />
                  <img
                    src={`${API_URL}${sel.imagen.startsWith("/") ? sel.imagen : "/" + sel.imagen}`}
                    alt={sel.titulo}
                    className={styles.modalHeroImg}
                    onLoad={(e) =>
                      setHeroRatio(e.target.naturalWidth / e.target.naturalHeight)
                    }
                  />
                </>
              ) : (
                <div
                  className={styles.modalHeroFallback}
                  style={{ background: `linear-gradient(145deg, ${catColor}bb 0%, #070b12 100%)` }}
                />
              )}
              <div className={styles.modalHeroGrad} />
              <div className={styles.modalHeroTop}>
                <div className={styles.modalBrand}>
                  <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL Ltda." className={styles.modalLogo} />
                  <span className={styles.modalOrgName}>COPEOSPIL Ltda.</span>
                </div>
                <span className={styles.modalCatBadge}>{sel.categoria}</span>
              </div>
              <div className={styles.modalHeroBottom}>
                <h2 className={styles.modalTitle}>{sel.titulo}</h2>
              </div>

              <button className={styles.closeBtn} onClick={() => setSelectedNoticia(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span className={styles.modalDate}>{formattedDate}</span>
                <span className={styles.modalCatTag} style={{ color: catColor }}>{sel.categoria}</span>
              </div>
              <div className={styles.modalAccent} style={{ background: catColor }} />
              <p className={styles.modalContent}>{sel.contenido}</p>
            </div>
            <div className={styles.modalFooter}>
              <span className={styles.modalWebsite}>www.copeospil.com.ar</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default NewsSlider;
