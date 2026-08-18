import SafeImage from "./SafeImage";
import styles from "./newsCard.module.css";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Grid tile: image and text never share the same space, so any image
 * proportion (portrait, landscape, tiny, missing) lands cleanly without
 * ever threatening title legibility or breaking card alignment.
 */
function NewsCard({ noticia, imageUrl, color = "#0b2b4a", onClick }) {
  const excerpt = (noticia.resumen || noticia.contenido || "")
    .replace(/\n+/g, " ")
    .trim();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={styles.card}
      style={{ "--accent": color }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={noticia.titulo}
    >
      <SafeImage src={imageUrl} alt={noticia.titulo} aspectRatio="4 / 3">
        <span className={styles.chip}>{noticia.categoria}</span>
      </SafeImage>

      <div className={styles.body}>
        <h4 className={styles.title}>{noticia.titulo}</h4>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}

        <div className={styles.meta}>
          <span className={styles.readMore}>
            Ver más <ArrowIcon />
          </span>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
