import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoticiaById, updateNoticia } from "../../../services/noticiasServices";
import styles from "./editarNoticias.module.css";

export default function EditarNoticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    getNoticiaById(id).then(setNoticia);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await updateNoticia(id, form);
    navigate("/admin/noticias");
  };

  if (!noticia) return <p>Cargando...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✏️ Editar Noticia</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="titulo"
          defaultValue={noticia.titulo}
          className={styles.input}
          required
        />

        <textarea
          name="resumen"
          defaultValue={noticia.resumen}
          className={styles.textarea}
        />

        <textarea
          name="contenido"
          defaultValue={noticia.contenido}
          className={styles.textarea}
          required
        />

        <select
          name="categoria"
          defaultValue={noticia.categoria}
          className={styles.select}
        >
          <option>INICIO</option>
          <option>NOVEDADES</option>
          <option>AGUA</option>
          <option>LUZ</option>
          <option>INTERNET</option>
          <option>SOCIAL</option>
        </select>

        <input type="file" name="imagen" />

        <button className={styles.button}>Guardar Cambios</button>
      </form>
    </div>
  );
}
