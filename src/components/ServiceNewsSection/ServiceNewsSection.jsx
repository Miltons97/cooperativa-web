import { useState, useRef, useEffect } from "react";
import styles from "./serviceNewsSection.module.css";
import { API_URL } from "../../config/api";

const CAT_COLORS = {
  AGUA:        "#0077b6",
  LUZ:         "#e67e22",
  INTERNET:    "#6c5ce7",
  NOVEDADES:   "#e74c3c",
  INICIO:      "#0b2b4a",
  "AGUA MINERAL": "#00b894",
};

export default function ServiceNewsSection({ categoria, title }) {
  const [noticias, setNoticias]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);
  const [heroRatio, setHeroRatio]   = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const color = CAT_COLORS[categoria] ?? "#0b2b4a";

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

  const formattedDate = selected
    ? new Date(selected.created_at).toLocaleDateString("es-AR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  if (loading) return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color }}>{title}</h3>
      <p className={styles.empty}>Cargando...</p>
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
          {noticias.map((n) => {
            const img = n.imagen ? `${API_URL}${n.imagen}` : null;
            return (
              <div key={n.id} className={styles.card} style={{ "--c": color }} onClick={() => { setSelected(n); setHeroRatio(null); }}>
                <div className={styles.imageWrapper}>
                  {img ? (
                    <>
                      <div
                        className={styles.imgBlurBg}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <img src={img} alt={n.titulo} className={styles.cardImg} />
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
                    <span className={styles.cardReadMore}>Ver →</span>
                  </div>
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
            style={activeIndex === i ? { background: color, width: "22px" } : {}}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div
              className={styles.modalHero}
              style={heroRatio ? { aspectRatio: heroRatio } : undefined}
            >
              {selected.imagen ? (
                <>
                  <img
                    src={`${API_URL}${selected.imagen}`}
                    alt=""
                    className={styles.modalHeroBlur}
                  />
                  <img
                    src={`${API_URL}${selected.imagen}`}
                    alt={selected.titulo}
                    className={styles.modalHeroImg}
                    onLoad={(e) =>
                      setHeroRatio(e.target.naturalWidth / e.target.naturalHeight)
                    }
                  />
                </>
              ) : (
                <div
                  className={styles.modalHeroFallback}
                  style={{ background: `linear-gradient(145deg, ${color}bb 0%, #070b12 100%)` }}
                />
              )}
              <div className={styles.modalHeroGrad} />
              <div className={styles.modalHeroTop}>
                <div className={styles.modalBrand}>
                  <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL Ltda." className={styles.modalLogo} />
                  <span className={styles.modalOrg}>COPEOSPIL Ltda.</span>
                </div>
                <span className={styles.modalBadge}>{selected.categoria}</span>
              </div>
              <div className={styles.modalHeroBottom}>
                <h2 className={styles.modalTitle}>{selected.titulo}</h2>
              </div>

              <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span className={styles.modalDate}>{formattedDate}</span>
                <span className={styles.modalCatTag} style={{ color }}>{selected.categoria}</span>
              </div>
              <div className={styles.modalAccent} style={{ background: color }} />
              <p className={styles.modalContent}>{selected.contenido}</p>
            </div>
            <div className={styles.modalFooter}>
              <span className={styles.modalWebsite}>www.copeospil.com.ar</span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
