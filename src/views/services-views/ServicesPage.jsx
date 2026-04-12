import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./services-page.module.css";

import Agua from "./Agua/Agua.jsx";
import Luz from "./Luz/LuzCopeospil.jsx";
import Internet from "./Internet/InternetCopeospil.jsx";
import Social from "./Social/Social.jsx";
import AguaMineral from "./AguaMineral/AguaMineral.jsx";

export default function Servicios() {
  const location = useLocation();
  const isServiciosHome = location.pathname === "/servicios";

  const serviciosData = [
    {
      id: 1,
      name: "Agua Potable",
      image: "../../../public/assets/agua1.jpg",
      route: "/servicios/agua",
      description: "Información y gestiones sobre el servicio de agua potable.",
    },
    {
      id: 2,
      name: "Energía Eléctrica",
      image: "../../../public/assets/Luz1.jpg",
      route: "/servicios/luz",
      description: "Todo sobre el suministro eléctrico y atención al usuario.",
    },
    {
      id: 3,
      name: "Internet",
      image: "../../../public/assets/FibraOptica.jpg",
      route: "/servicios/internet",
      description: "Planes, soporte técnico y conectividad.",
    },
     {
      id: 1,
      name: "Agua Mineral",
      image: "../../../public/assets/mineral2.jpg",
      route: "/servicios/agua-mineral",
      description: "Información sobre el servicio de agua mineral.",
    },
    {
      id: 4,
      name: "Servicio Social",
      image: "../../../public/assets/Luto1.jpg",
      route: "/servicios/social",
      description: "Programas sociales y asistencia comunitaria.",
    },
  ];

  return (
    <div className={styles.serviciosContainer}>
      {isServiciosHome && (
        <h1 className={styles.serviciosTitle}>Nuestros Servicios</h1>
      )}



      {isServiciosHome && (
        <p className={styles.serviciosIntro}>
          Accedé a la información de cada servicio de forma rápida y sencilla.
          Seleccioná una categoría para conocer más detalles.
        </p>
      )}


      {isServiciosHome && (
        <div className={styles.serviciosGrid}>
          {serviciosData.map((serv) => (
            <Link
              key={serv.id}
              to={serv.route}
              className={styles.servicioCard}
            >
              <img
                src={serv.image}
                alt={serv.name}
                className={styles.cardImage}
              />
              <img
                src="../../../public/assets/copeospil.jpg"
                alt="Copeospil"
                className={styles.cardLogo}
              />
              <div className={styles.cardOverlay}>
                <h3>{serv.name}</h3>
                <p>{serv.description}</p>
                <span className={styles.cardAction}>Ver más →</span>
              </div>
            </Link>
          ))}
        </div>
      )}


      <div className={styles.servicioContent}>
        {location.pathname === "/servicios/agua" && <Agua />}
        {location.pathname === "/servicios/luz" && <Luz />}
        {location.pathname === "/servicios/internet" && <Internet />}
        {location.pathname === "/servicios/social" && <Social />}
                {location.pathname === "/servicios/agua-mineral" && <AguaMineral />}
      </div>
    </div>
  );
}
