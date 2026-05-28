import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./servicesPage.module.css";

import Water        from "./Water/Water.jsx";
import Electricity  from "./Electricity/Electricity.jsx";
import Internet     from "./Internet/Internet.jsx";
import Social       from "./Social/Social.jsx";
import MineralWater from "./MineralWater/MineralWater.jsx";

const serviciosData = [
  {
    id: 1,
    name: "Agua de Red",
    image: "/assets/agua1.jpg",
    route: "/servicios/agua",
    description: "Información y gestiones sobre el servicio de agua de red.",
  },
  {
    id: 2,
    name: "Energía Eléctrica",
    image: "/assets/Luz1.jpg",
    route: "/servicios/luz",
    description: "Todo sobre el suministro eléctrico y atención al usuario.",
  },
  {
    id: 3,
    name: "Internet",
    image: "/assets/FibraOptica.jpg",
    route: "/servicios/internet",
    description: "Planes, soporte técnico y conectividad.",
  },
  {
    id: 4,
    name: "Agua Mineral",
    image: "/assets/mineral2.jpg",
    route: "/servicios/agua-mineral",
    description: "Información sobre el servicio de agua mineral.",
  },
  {
    id: 5,
    name: "Servicio Social",
    image: "/assets/Luto1.jpg",
    route: "/servicios/social",
    description: "Programas sociales y asistencia comunitaria.",
  },
];

export default function ServicesPage() {
  const location = useLocation();
  const isServiciosHome = location.pathname === "/servicios";

  return (
    <div className={styles.serviciosContainer}>
      {isServiciosHome && (
        <>
          <h1 className={styles.serviciosTitle}>Nuestros Servicios</h1>
          <p className={styles.serviciosIntro}>
            Accedé a la información de cada servicio de forma rápida y sencilla.
            Seleccioná una categoría para conocer más detalles.
          </p>
          <div className={styles.serviciosGrid}>
            {serviciosData.map((serv) => (
              <Link key={serv.id} to={serv.route} className={styles.servicioCard}>
                <img src={serv.image} alt={serv.name} className={styles.cardImage} />
                <img src="/assets/logoSinFondo.jpg" alt="Copeospil" className={styles.cardLogo} />
                <div className={styles.cardOverlay}>
                  <h3>{serv.name}</h3>
                  <p>{serv.description}</p>
                  <span className={styles.cardAction}>Ver más →</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className={styles.servicioContent}>
        {location.pathname === "/servicios/agua"         && <Water />}
        {location.pathname === "/servicios/luz"          && <Electricity />}
        {location.pathname === "/servicios/internet"     && <Internet />}
        {location.pathname === "/servicios/social"       && <Social />}
        {location.pathname === "/servicios/agua-mineral" && <MineralWater />}
      </div>
    </div>
  );
}
