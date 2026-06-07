import { useState, useEffect } from "react";
import { createNoticia } from "../../../services/newsService";
import { jwtDecode } from "jwt-decode";
import styles from "./createNews.module.css";

const SERVICE_CATS = ["AGUA", "LUZ", "INTERNET", "AGUA MINERAL", "SOCIAL"];

export default function CreateNews() {
  const [userRole, setUserRole] = useState("");
  const [allowedCategories, setAllowedCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);

        const permissions = {
          superadmin: ["AGUA", "AGUA MINERAL", "LUZ", "INTERNET", "SOCIAL", "NOVEDADES", "INICIO"],
          admin: ["NOVEDADES", "INICIO"],
          servicios: ["AGUA", "LUZ", "INTERNET", "SOCIAL"],
          agua: ["AGUA"],
          luz: ["LUZ"],
          internet: ["INTERNET"],
          social: ["SOCIAL"],
        };

        setAllowedCategories(permissions[decoded.role] || []);
      } catch {
        setError("Sesión inválida. Por favor, inicia sesión nuevamente.");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = new FormData(e.target);

    if (!form.get("categoria")) {
      setError("Debes seleccionar una categoría");
      setLoading(false);
      return;
    }

    try {
      await createNoticia(form);
      setSuccess("Noticia publicada correctamente");
      e.target.reset();
      setSelectedCat("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al publicar la noticia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Nueva Noticia</h2>

      {userRole && (
        <p className={styles.roleInfo}>
          Rol: <strong>{userRole}</strong> |
          Categorías permitidas: <strong>{allowedCategories.join(", ")}</strong>
        </p>
      )}

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título *</label>
          <input id="titulo" name="titulo" placeholder="Título de la noticia" className={styles.inputField} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="resumen">Resumen</label>
          <textarea id="resumen" name="resumen" placeholder="Resumen breve (opcional)" className={styles.textareaField} rows="3" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contenido">Contenido *</label>
          <textarea id="contenido" name="contenido" placeholder="Contenido completo de la noticia" className={styles.textareaField} rows="8" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imagen">Imagen</label>
          <input id="imagen" type="file" name="imagen" accept="image/*" className={styles.fileInput} />
          <small className={styles.hint}>Formatos: JPG, PNG, GIF, WEBP (máx. 5MB)</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoria">Categoría *</label>
          <select id="categoria" name="categoria" className={styles.selectField} required value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
            <option value="" disabled>Seleccionar categoría</option>
            {allowedCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {SERVICE_CATS.includes(selectedCat) && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="mostrar_en_inicio" />
              <span>Publicar también en Inicio</span>
            </label>
            <small className={styles.hint}>
              La noticia aparecerá además en la sección de novedades del inicio.
            </small>
          </div>
        )}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Publicando..." : "Publicar Noticia"}
        </button>
      </form>
    </div>
  );
}
