import { useState } from "react";
import { createNoticia } from "../../../services/newsService";
import styles from "./createNews.module.css";

export default function CreateObituary() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = new FormData(e.target);
    form.set("categoria", "SOCIAL");

    try {
      await createNoticia(form);
      setSuccess("✅ Necrológica publicada correctamente");
      e.target.reset();
    } catch (err) {
      setError(err.message || "Error al publicar la necrológica");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✝ Publicar Necrológica</h2>
      <p className={styles.roleInfo}>
        La necrológica se publicará en la categoría <strong>SOCIAL</strong> y podrás descargar
        la card desde <strong>Ver Noticias</strong>.
      </p>

      {error   && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.formContainer}>

        <div className={styles.formGroup}>
          <label htmlFor="titulo">Nombre del fallecido *</label>
          <input
            id="titulo"
            name="titulo"
            placeholder="Nombre completo"
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="resumen">Mensaje de despedida</label>
          <textarea
            id="resumen"
            name="resumen"
            placeholder="Breve mensaje o datos del velatorio / sepelio"
            className={styles.textareaField}
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contenido">Información adicional *</label>
          <textarea
            id="contenido"
            name="contenido"
            placeholder="Datos completos: horario, lugar de velatorio, sepelio, etc."
            className={styles.textareaField}
            rows="6"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imagen">Imagen de acompañamiento (paloma, flores, etc.)</label>
          <input
            id="imagen"
            type="file"
            name="imagen"
            accept="image/*"
            className={styles.fileInput}
          />
          <small className={styles.hint}>Se usará como fondo de la card. Si no se sube ninguna, se usa la imagen de luto predeterminada.</small>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
          style={{ background: "#1a1a2e", borderColor: "rgba(200,180,140,0.4)" }}
        >
          {loading ? "Publicando..." : "✝ Publicar Necrológica"}
        </button>

      </form>
    </div>
  );
}
