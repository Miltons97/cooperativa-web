import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNoticiaById, updateNoticia } from "../../../services/newsService";
import styles from "./editNews.module.css";

import { API_URL } from "../../../config/api";

const SERVICE_CATS = ["AGUA", "LUZ", "INTERNET", "AGUA MINERAL", "SOCIAL"];

const CATEGORIAS = ["INICIO", "NOVEDADES", "AGUA", "LUZ", "INTERNET", "AGUA MINERAL", "SOCIAL"];

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticia, setNoticia]           = useState(null);
  const [selectedCat, setSelectedCat]   = useState("");
  const [mostrarEnInicio, setMostrarEnInicio] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState("");

  useEffect(() => {
    getNoticiaById(id).then((n) => {
      setNoticia(n);
      setSelectedCat(n.categoria);
      setMostrarEnInicio(!!n.mostrar_en_inicio);
    }).catch(() => setError("No se pudo cargar la noticia."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = new FormData(e.target);
    if (mostrarEnInicio) {
      form.set("mostrar_en_inicio", "on");
    } else {
      form.delete("mostrar_en_inicio");
    }

    try {
      await updateNoticia(id, form);
      setSuccess("✅ Noticia actualizada correctamente");
      setTimeout(() => navigate("/admin/noticias"), 1200);
    } catch (err) {
      setError(err.message || "Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  if (!noticia) return (
    <div className={styles.page}>
      <div className={styles.loadingWrap}>Cargando noticia...</div>
    </div>
  );

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <Link to="/admin/noticias" className={styles.backBtn}>
          ← Volver
        </Link>
        <h2 className={styles.title}>Editar Noticia</h2>
      </div>

      {error   && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.card}>

          {/* ── SECCIÓN: CONTENIDO ── */}
          <div className={styles.cardSection}>
            <p className={styles.sectionLabel}>Contenido</p>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="titulo">
                Título <span className={styles.required}>*</span>
              </label>
              <input
                id="titulo"
                name="titulo"
                defaultValue={noticia.titulo}
                className={styles.input}
                placeholder="Título de la noticia"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="resumen">Resumen</label>
              <textarea
                id="resumen"
                name="resumen"
                defaultValue={noticia.resumen}
                className={styles.textarea}
                placeholder="Breve descripción (opcional)"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contenido">
                Contenido <span className={styles.required}>*</span>
              </label>
              <textarea
                id="contenido"
                name="contenido"
                defaultValue={noticia.contenido}
                className={styles.textarea}
                placeholder="Texto completo de la noticia"
                rows={6}
                required
              />
            </div>
          </div>

          {/* ── SECCIÓN: IMAGEN Y CATEGORÍA ── */}
          <div className={styles.cardSection}>
            <p className={styles.sectionLabel}>Imagen y categoría</p>

            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Categoría <span className={styles.required}>*</span>
                </label>
                <select
                  name="categoria"
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className={styles.select}
                  required
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Reemplazar imagen</label>
                {noticia.imagen && (
                  <div className={styles.imagePreview}>
                    <img
                      src={`${API_URL}${noticia.imagen}`}
                      alt="Imagen actual"
                      className={styles.previewImg}
                    />
                    <div className={styles.previewInfo}>
                      <span className={styles.previewLabel}>Imagen actual</span>
                      <span className={styles.previewHint}>Subí una nueva para reemplazarla</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  className={styles.fileInput}
                />
                <small className={styles.hint}>JPG, PNG, WEBP · máx. 5 MB</small>
              </div>
            </div>
          </div>

          {/* ── SECCIÓN: PUBLICAR EN INICIO ── */}
          {SERVICE_CATS.includes(selectedCat) && (
            <div className={styles.cardSection}>
              <p className={styles.sectionLabel}>Visibilidad</p>

              <label className={styles.checkboxCard}>
                <input
                  type="checkbox"
                  checked={mostrarEnInicio}
                  onChange={(e) => setMostrarEnInicio(e.target.checked)}
                />
                <div className={styles.checkboxText}>
                  <span className={styles.checkboxTitle}>Publicar también en Inicio</span>
                  <span className={styles.checkboxDesc}>
                    Aparecerá en la sección de novedades de la página principal.
                  </span>
                </div>
              </label>
            </div>
          )}

          {/* ── FOOTER ACCIONES ── */}
          <div className={styles.cardFooter}>
            <Link to="/admin/noticias" className={styles.cancelBtn}>
              Cancelar
            </Link>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
