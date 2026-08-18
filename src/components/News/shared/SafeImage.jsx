import { useEffect, useState } from "react";
import styles from "./safeImage.module.css";

function PlaceholderIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M21 15l-5.5-5.5a2 2 0 0 0-2.8 0L3 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Renders any image src at a controlled aspect ratio without ever deforming it
 * or breaking the surrounding layout. Falls back to a designed placeholder
 * when src is empty or fails to load, instead of a blank box or broken icon.
 */
function SafeImage({ src, alt = "", aspectRatio = "16 / 9", fit = "cover", className, children }) {
  const [status, setStatus] = useState(src ? "loading" : "empty");

  useEffect(() => {
    setStatus(src ? "loading" : "empty");
  }, [src]);

  const frameStyle = aspectRatio ? { aspectRatio } : { height: "100%" };

  return (
    <div className={`${styles.frame} ${className ?? ""}`} style={frameStyle}>
      {status !== "empty" && status !== "error" && (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          style={{ objectFit: fit, opacity: status === "loaded" ? 1 : 0 }}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}

      {status === "loading" && <div className={styles.skeleton} />}

      {(status === "empty" || status === "error") && (
        <div className={styles.placeholder}>
          <PlaceholderIcon />
          <span>Sin imagen disponible</span>
        </div>
      )}

      {children}
    </div>
  );
}

export default SafeImage;
