import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./news.module.css";

function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/noticias/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNoticia(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando noticia:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <div className={styles.detalleContainer}>
      {noticia.imagen && (
        <img
          src={`http://localhost:3001${noticia.imagen}`}
          alt={noticia.titulo}
          className={styles.imagenPrincipal}
        />
      )}

      <h1>{noticia.titulo}</h1>
      <span className={styles.categoria}>{noticia.categoria}</span>
      <p className={styles.fecha}>
        {new Date(noticia.fecha_publicacion).toLocaleDateString()}
      </p>

      <div className={styles.contenido}>
        <p>{noticia.contenido}</p>
      </div>
    </div>
  );
}

export default NoticiaDetalle;