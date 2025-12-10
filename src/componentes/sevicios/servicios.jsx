
import React from "react";
import { Link, useLocation } from "react-router-dom";


import styles from "./servicios.module.css"
import Agua from "../../views/Servicios/Agua/AguaCopeospiL";
import Luz from "../../views/Servicios/Luz/LuzCopeospil";
import Internet from "../../views/Servicios/Internet/InternetCopeospi";
import Social from "../../views/Servicios/Social/Social"
// ÍCONOS MUI
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import WifiIcon from "@mui/icons-material/Wifi";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function Servicios() {
  const location = useLocation();

  // DATA DE LAS CARDS
  const serviciosData = [
    {
      id: 1,
      name: "Agua",
      image: "/assets/Agua.jpg",
      route: "/servicios/agua",
      icon: <WaterDropIcon className={styles.cardIcon} />,
    },
    {
      id: 2,
      name: "Luz",
      image: "/assets/Luz.jpg",
      route: "/servicios/luz",
      icon: <FlashOnIcon className={styles.cardIcon} />,
    },
    {
      id: 3,
      name: "Internet",
      image: "/assets/Internet.jpg",
      route: "/servicios/internet",
      icon: <WifiIcon className={styles.cardIcon} />,
    },
    {
      id: 4,
      name: "Social",
      image: "/assets/Social.jpg",
      route: "/servicios/social",
      icon: <VolunteerActivismIcon className={styles.cardIcon} />,
    },
  ];

  return (
    <div className={styles.serviciosContainer}>

      <h1 className={styles.serviciosTitle}>Servicios</h1>

      {/* GRID DE CARDS */}
      <div className={styles.serviciosGrid}>
        {serviciosData.map((serv) => (
          <Link
            key={serv.id}
            to={serv.route}
            className={styles.servicioCard}
          >
            <div className={styles.cardImageContainer}>
              <img src={serv.image} alt={serv.name} />
              {serv.icon}
              <span className={styles.cardCategory}>{serv.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* CONTENIDO SEGÚN RUTA */}
      <div className={styles.servicioContent}>
        {location.pathname === "/servicios/agua" && <Agua />}
        {location.pathname === "/servicios/luz" && <Luz />}
        {location.pathname === "/servicios/internet" && <Internet />}
        {location.pathname === "/servicios/social" && <Social />}

        {location.pathname === "/servicios" && (
          <p className={styles.selectText}>Seleccione un servicio para ver más información.</p>
        )}
      </div>

    </div>
  );
}
