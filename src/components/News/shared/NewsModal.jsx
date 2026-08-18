import { useEffect, useState } from "react";
import styles from "./newsModal.module.css";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Cinematic detail card: the photo is always shown whole (blurred ambient
 * fill behind it, never cropped), title/subtitle sit on a vignette over the
 * image the way the admin export cards already do, and the body continues
 * in the same dark surface instead of switching to a plain white panel.
 */
function NewsModal({ noticia, imageUrl, color = "#0b2b4a", onClose }) {
  const [imgStatus, setImgStatus] = useState(imageUrl ? "loading" : "empty");

  useEffect(() => {
    setImgStatus(imageUrl ? "loading" : "empty");
  }, [imageUrl]);

  useEffect(() => {
    if (!noticia) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [noticia, onClose]);

  if (!noticia) return null;

  const formattedDate = noticia.created_at
    ? new Date(noticia.created_at).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const hasImage = imgStatus === "loading" || imgStatus === "loaded";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{ "--accent": color }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={noticia.titulo}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>

        <div className={styles.scrollArea}>
          <div className={styles.hero}>
            {hasImage ? (
              <>
                <img
                  src={imageUrl}
                  alt=""
                  aria-hidden="true"
                  className={styles.heroBlur}
                />
                <img
                  src={imageUrl}
                  alt={noticia.titulo}
                  className={styles.heroImg}
                  style={{ opacity: imgStatus === "loaded" ? 1 : 0 }}
                  onLoad={() => setImgStatus("loaded")}
                  onError={() => setImgStatus("empty")}
                />
              </>
            ) : (
              <div className={styles.heroFallback} />
            )}

            <div className={styles.heroGrad} />

            <div className={styles.heroTop}>
              <div className={styles.brand}>
                <img src="/assets/logoSinFondo.jpg" alt="Copeospil Ltda." className={styles.logo} />
                <span className={styles.brandName}>Copeospil Ltda.</span>
              </div>
              <span className={styles.chip}>{noticia.categoria}</span>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.accent} />
            <h2 className={styles.title}>{noticia.titulo}</h2>
            {noticia.resumen && <p className={styles.subtitle}>{noticia.resumen}</p>}

            <div className={styles.metaRow}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.dot} />
              <span className={styles.category}>{noticia.categoria}</span>
            </div>
            <div className={styles.rule} />
            <p className={styles.content}>{noticia.contenido}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsModal;
