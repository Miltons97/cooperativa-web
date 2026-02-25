import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticias, deleteNoticia } from "../../../services/noticiasServices";
import styles from "./verNoticias.module.css";

const CATEGORIAS = [
  "TODAS",
  "INICIO",
  "NOVEDADES",
  "AGUA",
  "LUZ",
  "INTERNET",
  "SOCIAL",
];

export default function VerNoticiasAdmin() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState("TODAS");
  const [loading, setLoading] = useState(true);

  const cargarNoticias = async () => {
    setLoading(true);
    const query =
      categoria !== "TODAS" ? `?categoria=${categoria}` : "";
    const data = await getNoticias(query);
    setNoticias(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarNoticias();
  }, [categoria]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta noticia?")) return;
    await deleteNoticia(id);
    cargarNoticias();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📰 Administrar Noticias</h2>

      <select
        className={styles.select}
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((n) => (
              <tr key={n.id}>
                <td>{n.titulo}</td>
                <td>{n.categoria}</td>
                <td>{new Date(n.created_at).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <Link to={`/admin/noticias/editar/${n.id}`}>✏️</Link>
                  <button onClick={() => handleDelete(n.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
