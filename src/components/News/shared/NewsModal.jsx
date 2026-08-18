import { useEffect } from "react";
import SafeImage from "./SafeImage";
import styles from "./newsModal.module.css";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Editorial split modal: image and text live in separate panes so the
 * title never has to fight an unpredictable image for legibility.
 * Stacks vertically on small screens. Closes on Escape, backdrop click,
 * or the close button; locks page scroll while open.
 */
function NewsModal({ noticia, imageUrl, color = "#0b2b4a", onClose }) {
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
        <div className={styles.imagePane}>
          <SafeImage src={imageUrl} alt={noticia.titulo} aspectRatio={null}>
            <span className={styles.chip}>{noticia.categoria}</span>
          </SafeImage>
        </div>

        <div className={styles.contentPane}>
          <div className={styles.contentScroll}>
            <div className={styles.topRow}>
              <div className={styles.brand}>
                <img src="/assets/logoSinFondo.jpg" alt="Copeospil Ltda." className={styles.logo} />
                <span className={styles.brandName}>Copeospil Ltda.</span>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <CloseIcon />
              </button>
            </div>

            <h2 className={styles.title}>{noticia.titulo}</h2>
            {noticia.resumen && <p className={styles.subtitle}>{noticia.resumen}</p>}

            <div className={styles.metaRow}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.dot} />
              <span className={styles.category}>{noticia.categoria}</span>
            </div>

            <div className={styles.rule} />

            <p className={styles.content}>{noticia.contenido}</p>

            <div className={styles.footer}>www.copeospil.com.ar</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsModal;
