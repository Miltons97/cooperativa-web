import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { getNoticias, deleteNoticia, createNoticia } from "../../../services/newsService";
import { generateCard } from "./exportEngine";
import styles from "./viewNews.module.css";
import { API_URL } from "../../../config/api";

const CATEGORIAS = [
  "TODAS", "INICIO", "NOVEDADES", "AGUA", "AGUA MINERAL", "LUZ", "INTERNET", "SOCIAL",
];

const CATEGORY_COLORS = {
  AGUA:           "#0077b6",
  "AGUA MINERAL": "#00b894",
  LUZ:            "#e67e22",
  INTERNET:       "#6c5ce7",
  SOCIAL:         "#27ae60",
  NOVEDADES:      "#e74c3c",
  INICIO:         "#0b2b4a",
};

const EXPORT_FORMATS = {
  square:    { w: 1080, h: 1080, label: "1 : 1"  },
  portrait:  { w: 1080, h: 1350, label: "4 : 5"  },
  landscape: { w: 1920, h: 1080, label: "16 : 9" },
  story:     { w: 1080, h: 1920, label: "9 : 16" },
};

const MAX_PW = 460;
const MAX_PH = 500;

export default function ViewNews() {
  const [noticias, setNoticias]         = useState([]);
  const [categoria, setCategoria]       = useState("TODAS");
  const [loading, setLoading]           = useState(true);
  const [selected, setSelected]         = useState(null);
  const [downloading, setDownloading]   = useState(false);
  const [cardStyle, setCardStyle]       = useState("news");
  const [exportFormat, setExportFormat] = useState("square");
  const [previewUrl,     setPreviewUrl]     = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewW,       setPreviewW]       = useState(MAX_PW);
  const [previewH,       setPreviewH]       = useState(MAX_PW);
  const [showObitForm, setShowObitForm] = useState(false);
  const [obitLoading, setObitLoading]   = useState(false);
  const [obitError, setObitError]       = useState("");
  const [obitSuccess, setObitSuccess]   = useState("");

  const cardRef = useRef(null);
  const genKey  = useRef(0);

  const loadNews = async () => {
    setLoading(true);
    try {
      const q    = categoria !== "TODAS" ? `?categoria=${categoria}` : "";
      const data = await getNoticias(q);
      setNoticias(data);
    } catch (err) {
      console.error("Error cargando noticias:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { loadNews(); }, [categoria]);

  const openModal = (n) => {
    setSelected(n);
    setPreviewUrl(null);
    setPreviewLoading(false);
    setCardStyle(n.categoria === "SOCIAL" ? "obituary" : "news");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta noticia?")) return;
    await deleteNoticia(id);
    loadNews();
  };

  const catColor = selected
    ? (CATEGORY_COLORS[selected.categoria] ?? CATEGORY_COLORS.INICIO)
    : "#0b2b4a";

  const formattedDate = selected
    ? new Date(selected.created_at).toLocaleDateString("es-AR", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  const buildPreview = useCallback(async (n, fmt, color, date) => {
    const key = ++genKey.current;
    setPreviewLoading(true);
    setPreviewUrl(null);
    try {
      const canvas = await generateCard({
        selected: n, catColor: color, formattedDate: date,
        format: EXPORT_FORMATS[fmt], API_URL,
      });
      if (genKey.current !== key) return;

      const { w, h } = EXPORT_FORMATS[fmt];
      const pScale   = Math.min(MAX_PW / w, MAX_PH / h);
      const pW       = Math.round(w * pScale);
      const pH       = Math.round(h * pScale);

      const small    = document.createElement("canvas");
      small.width    = pW;
      small.height   = pH;
      small.getContext("2d").drawImage(canvas, 0, 0, pW, pH);

      setPreviewW(pW);
      setPreviewH(pH);
      setPreviewUrl(small.toDataURL("image/jpeg", 0.92));
    } catch (err) {
      console.error("Preview error:", err);
    } finally {
      if (genKey.current === key) setPreviewLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selected || cardStyle !== "news") return;
    buildPreview(selected, exportFormat, catColor, formattedDate);
  }, [selected?.id, exportFormat, cardStyle]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      if (cardStyle === "news") {
        const canvas = await generateCard({
          selected, catColor, formattedDate,
          format: EXPORT_FORMATS[exportFormat], API_URL,
        });
        const a    = document.createElement("a");
        const slug = selected.titulo.slice(0, 30).replace(/\s+/g, "-").toLowerCase();
        a.download = `copeospil-${slug}-${exportFormat}.png`;
        a.href     = canvas.toDataURL("image/png", 1.0);
        a.click();
      } else {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
          useCORS: true, scale: 2, backgroundColor: null, logging: false,
        });
        const a    = document.createElement("a");
        const slug = selected.titulo.slice(0, 30).replace(/\s+/g, "-").toLowerCase();
        a.download = `copeospil-necrologica-${slug}.png`;
        a.href     = canvas.toDataURL("image/png");
        a.click();
      }
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  const openObitForm = () => {
    setObitError(""); setObitSuccess(""); setShowObitForm(true);
  };

  const handleObitSubmit = async (e) => {
    e.preventDefault();
    setObitError(""); setObitSuccess(""); setObitLoading(true);
    const form = new FormData(e.target);
    form.set("categoria", "SOCIAL");
    try {
      await createNoticia(form);
      setObitSuccess("Necrológica publicada correctamente");
      e.target.reset();
      loadNews();
    } catch (err) {
      setObitError(err.message || "Error al publicar la necrológica");
    } finally {
      setObitLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Administrar Noticias</h2>
        <button className={styles.btnNewObituary} onClick={openObitForm}>
          ✝ Nueva Necrológica
        </button>
      </div>

      <select
        className={styles.select}
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {loading ? (
        <p className={styles.loadingText}>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr><th>Título</th><th>Categoría</th><th>Fecha</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {noticias.map((n) => (
              <tr key={n.id} className={styles.row} onClick={() => openModal(n)}>
                <td className={styles.tdTitle}>{n.titulo}</td>
                <td>
                  <span
                    className={styles.badge}
                    style={{ background: CATEGORY_COLORS[n.categoria] ?? CATEGORY_COLORS.INICIO }}
                  >
                    {n.categoria}
                  </span>
                </td>
                <td>{new Date(n.created_at).toLocaleDateString("es-AR")}</td>
                <td className={styles.actions} onClick={(e) => e.stopPropagation()}>
                  <Link to={`/admin/noticias/editar/${n.id}`} title="Editar">✏️</Link>
                  <button onClick={() => openModal(n)} title="Descargar card" className={styles.btnDownloadRow}>⬇</button>
                  <button onClick={() => handleDelete(n.id)} title="Eliminar">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showObitForm && (
        <div className={styles.overlay} onClick={() => setShowObitForm(false)}>
          <div className={styles.obitFormBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.obitCloseBtn} onClick={() => setShowObitForm(false)}>✕</button>
            <div className={styles.obitFormHeader}>
              <span className={styles.obitCrossLarge}>✝</span>
              <h3 className={styles.obitFormTitle}>Publicar Necrológica</h3>
              <p className={styles.obitFormHint}>
                Se publicará en la categoría SOCIAL. Podés descargar la card desde la tabla.
              </p>
            </div>
            {obitError   && <div className={styles.obitError}>{obitError}</div>}
            {obitSuccess && <div className={styles.obitSuccess}>{obitSuccess}</div>}
            <form onSubmit={handleObitSubmit} className={styles.obitForm}>
              <div className={styles.obitGroup}>
                <label>Nombre del fallecido *</label>
                <input name="titulo" placeholder="Nombre completo" required />
              </div>
              <div className={styles.obitGroup}>
                <label>Mensaje de despedida</label>
                <textarea name="resumen" placeholder="Breve mensaje o datos del velatorio / sepelio" rows="3" />
              </div>
              <div className={styles.obitGroup}>
                <label>Información adicional *</label>
                <textarea name="contenido" placeholder="Horario, lugar de velatorio, sepelio, etc." rows="4" required />
              </div>
              <div className={styles.obitGroup}>
                <label>Imagen de acompañamiento (paloma, flores, etc.)</label>
                <input type="file" name="imagen" accept="image/*" />
                <small>Si no se sube ninguna, se usa la imagen de luto predeterminada.</small>
              </div>
              <div className={styles.obitFormActions}>
                <button type="button" className={styles.obitCancelBtn} onClick={() => setShowObitForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.obitSubmitBtn} disabled={obitLoading}>
                  {obitLoading ? "Publicando..." : "✝ Publicar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className={styles.overlay} onClick={() => setSelected(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>

            {cardStyle === "news" && (
              <>
                <div className={styles.formatToggle}>
                  {Object.entries(EXPORT_FORMATS).map(([key, { label }]) => (
                    <button
                      key={key}
                      className={`${styles.formatBtn} ${exportFormat === key ? styles.formatBtnActive : ""}`}
                      onClick={() => setExportFormat(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div
                  className={styles.previewBox}
                  style={{ width: previewW, height: previewLoading ? Math.max(previewH, 120) : previewH }}
                >
                  {previewLoading && (
                    <div className={styles.previewSpinner}>
                      <span className={styles.spinnerRing} />
                      <span className={styles.spinnerText}>Generando…</span>
                    </div>
                  )}
                  {previewUrl && !previewLoading && (
                    <img
                      src={previewUrl}
                      width={previewW}
                      height={previewH}
                      className={styles.previewImg}
                      alt="preview"
                      draggable={false}
                    />
                  )}
                </div>

                <p className={styles.exportHint}>
                  {EXPORT_FORMATS[exportFormat].w} × {EXPORT_FORMATS[exportFormat].h} px · PNG · HD 2×
                </p>
              </>
            )}

            {cardStyle === "obituary" && (
              <div
                ref={cardRef}
                className={styles.obituaryCard}
                style={{
                  backgroundImage: selected.imagen
                    ? `url(${API_URL}${selected.imagen})`
                    : "url(/assets/luto2.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <div className={styles.obituaryOverlay} />
                <div className={styles.obituaryContent}>
                  <div className={styles.obituaryHeader}>
                    <img src="/assets/logoSinFondo.jpg" alt="COPEOSPIL" className={styles.obituaryLogo} crossOrigin="anonymous" />
                    <span className={styles.obituaryBrandName}>COPEOSPIL Ltda.</span>
                    <span className={styles.obituaryService}>Servicio de Sepelio</span>
                  </div>
                  <div className={styles.obituaryDividerTop}>
                    <span className={styles.obituaryLine} />
                    <span className={styles.obituaryCross}>✝</span>
                    <span className={styles.obituaryLine} />
                  </div>
                  <div className={styles.obituaryBody}>
                    <p className={styles.obituaryQepd}>Q . E . P . D .</p>
                    <h2 className={styles.obituaryName}>{selected.titulo}</h2>
                    {(selected.resumen || selected.contenido) && (
                      <p className={styles.obituaryMessage}>
                        {selected.resumen || selected.contenido.substring(0, 160) + "..."}
                      </p>
                    )}
                  </div>
                  <div className={styles.obituaryDividerBottom} />
                  <div className={styles.obituaryFooter}>
                    <span className={styles.obituaryUrl}>www.copeospil.com.ar</span>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.modalActions}>
              <button className={styles.btnClose} onClick={() => setSelected(null)}>
                Cerrar
              </button>
              <button
                className={`${styles.btnDownload} ${cardStyle === "obituary" ? styles.btnDownloadObituary : ""}`}
                onClick={handleDownload}
                disabled={downloading || (cardStyle === "news" && (previewLoading || !previewUrl))}
                style={cardStyle === "news" ? { background: catColor } : undefined}
              >
                {downloading ? "Generando…" : "⬇ Descargar"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
