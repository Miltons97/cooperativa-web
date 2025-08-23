import React from "react";
import styles from "./Inicio.module.css";
import videoInicio from "../../assets/prueba2.mp4";
import logo from "../../assets/copeospil.jpg"; // Import del logo

function Inicio() {
  return (
    <div className={styles.container}>
      <video
        className={styles.video}
        src={videoInicio}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay}>
        <img src={logo} alt="Logo Cooperativa" className={styles.logo} />
        <h1 className={styles.title}>Bienvenidos a COPEOSPIL.Ltda</h1>
        <p className={styles.subtitle}>
          Creciendo juntos, porque tu bienestar es el nuestro. .
        </p>
      </div>
    </div>
  );
}

export default Inicio;
