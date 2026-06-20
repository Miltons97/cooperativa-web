import React, { useState } from "react";
import styles from "./institutional.module.css";

const fotos = [
  "/assets/Sede1_001.jpg",
  "/assets/Historica1.jpg",
  "/assets/Historica2.jpg",
  "/assets/Lineas1.jpg",
  "/assets/Historica5.jpg",
  "/assets/Historica6.jpg",
  "/assets/Galpon1.jpg",
  "/assets/Historica7.jpg",
  "/assets/Historica8.jpg",
  "/assets/VIEJA USINA ING. LUIGGI_001.jpg",
  "/assets/Historica11.jpg",
  "/assets/Historica12.jpg",
  "/assets/Trabajando en Subestaciones_001.jpg",
  "/assets/Historica13.jpg",
  "/assets/Historica14.jpg",
  "/assets/4-CASA DE LA CULTURA - EX USINA_001.jpg",
  "/assets/luiggi1.jpg",
];

const polaroids = [
  { src: fotos[0],  style: { top: "8%",  left: "2%",   rotate: "-7deg"  } },
  { src: fotos[1],  style: { top: "5%",  right: "3%",  rotate: "6deg"   } },
  { src: fotos[2],  style: { bottom: "6%", left: "1%", rotate: "5deg"   } },
  { src: fotos[3],  style: { bottom: "4%", right: "2%",rotate: "-6deg"  } },
  { src: fotos[5],  style: { top: "18%", left: "18%",  rotate: "-4deg"  } },
  { src: fotos[7],  style: { top: "15%", right: "17%", rotate: "8deg"   } },
];

function Institutional() {
  const [modalIdx, setModalIdx] = useState(null);

  const prev = () => setModalIdx((i) => (i === 0 ? fotos.length - 1 : i - 1));
  const next = () => setModalIdx((i) => (i === fotos.length - 1 ? 0 : i + 1));

  return (
    <div className={styles.institucionalContainer}>

      <div className={styles.heroBanner}>

        {polaroids.map((p, i) => (
          <button
            key={i}
            className={styles.polaroid}
            style={{ top: p.style.top, left: p.style.left, right: p.style.right, bottom: p.style.bottom, "--rot": p.style.rotate }}
            onClick={() => setModalIdx(fotos.indexOf(p.src))}
          >
            <img src={p.src} alt="" className={styles.polaroidImg} />
          </button>
        ))}

        <div className={styles.bannerCenter}>
          <img src="/assets/LogoSinFondo.png" alt="COPEOSPIL" className={styles.bannerLogo} />
          <div className={styles.aniversario}>
            <span className={styles.aniosNum}>70</span>
            <span className={styles.aniosLabel}>AÑOS</span>
          </div>
          <p className={styles.frase}>"Trabajando juntos,<br />construyendo futuro"</p>
          <span className={styles.fechas}>1956 · 30 de Junio · 2026</span>
        </div>

      </div>

      <section className={styles.institucionalContent}>
        <h2>Quiénes somos</h2>
        <p>
          La Cooperativa Eléctrica de Servicios Públicos COPEOSPIL Ltda. nació por decisión
          de la comunidad de Ingeniero Luiggi, reunida en asamblea popular el 30 de junio de 1956,
          con el objetivo de brindar el servicio de energía eléctrica a la localidad.
        </p>
        <p>
          Con el paso de los años, la cooperativa amplió sus servicios y su alcance regional.
          El 3 de diciembre de 1971 comenzó la extensión hacia las localidades de Embajador Martini
          y Alta Italia. En 1983 quedaron oficialmente inaugurados los primeros 250 kilómetros de
          líneas rurales, fortaleciendo el desarrollo productivo de la zona.
        </p>
        <p>
          Posteriormente, COPEOSPIL incorporó nuevos servicios esenciales para la comunidad:
          agua de red en 1984, planta de agua mineralizada en 1991, servicio de sepelio desde 1999
          e internet desde 2008, evolucionando con el tiempo hacia la conectividad mediante fibra
          óptica al hogar (FTTH).
        </p>
        <p>
          Actualmente, la cooperativa cubre la totalidad de Ingeniero Luiggi con disponibilidad
          de conectividad de fibra óptica, brindando un servicio moderno y de calidad para hogares,
          comercios e instituciones.
        </p>
        <p>
          Desde sus inicios hasta hoy, la cooperativa continúa creciendo junto a la comunidad,
          sosteniendo los valores de compromiso, solidaridad y desarrollo para Ingeniero Luiggi, Embajador Martini, Alta Italia y Ojeda.
        </p>

        <h2 className={styles.galeriaTitle}>Galería Histórica</h2>
        <div className={styles.galeriaGrid}>
          {fotos.map((src, i) => (
            <button key={i} className={styles.galeriaItem} onClick={() => setModalIdx(i)}>
              <img src={src} alt={`Foto histórica ${i + 1}`} className={styles.galeriaImg} />
            </button>
          ))}
        </div>

        <div className={styles.mvvGrid}>
          <div className={styles.mvvItem}>
            <h3>Misión</h3>
            <p>Brindar servicios públicos eficientes y confiables, priorizando el bienestar de nuestros asociados y el desarrollo sustentable.</p>
          </div>
          <div className={styles.mvvItem}>
            <h3>Visión</h3>
            <p>Ser una cooperativa referente en la región por su compromiso social, innovación y transparencia en la gestión.</p>
          </div>
          <div className={styles.mvvItem}>
            <h3>Valores</h3>
            <ul>
              <li>Solidaridad</li>
              <li>Responsabilidad</li>
              <li>Transparencia</li>
              <li>Compromiso comunitario</li>
              <li>Participación democrática</li>
            </ul>
          </div>
        </div>

        <h2>Autoridades</h2>
        <div className={styles.autoridadesGrid}>
          <div className={styles.autoridadItem}>Presidente: Tarditi Marcelo Javier</div>
          <div className={styles.autoridadItem}>Vicepresidente: Gorodo Rubén Omar</div>
          <div className={styles.autoridadItem}>Secretario: Álvarez José Mateo</div>
          <div className={styles.autoridadItem}>Prosecretario: López María Cristina</div>
          <div className={styles.autoridadItem}>Tesorero: Gaggioli Hernán Luis</div>
          <div className={styles.autoridadItem}>Proesorero: Bogino Ariel Dario</div>
          <div className={styles.autoridadItem}>1°Vocal Titular: Cantelmi Hidalgo Juan Marcelo</div>
          <div className={styles.autoridadItem}>2°Vocal Titular: García Ezequiel</div>
          <div className={styles.autoridadItem}>3°Vocal Titular: Gorodo Juan José</div>
          <div className={styles.autoridadItem}>1°Vocal Suplente: Peano Raquel Beatriz</div>
          <div className={styles.autoridadItem}>2°Vocal Suplente: De Rosa Alejandra</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Muñoz Pedro Matías</div>
          <div className={styles.autoridadItem}>Vocal Suplente: Garro Vanesa Lujan</div>
        </div>
      </section>

      {modalIdx !== null && (
        <div className={styles.modal} onClick={() => setModalIdx(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setModalIdx(null)}>✕</button>
            <button className={styles.modalPrev} onClick={prev}>‹</button>
            <img src={fotos[modalIdx]} alt="Foto histórica" className={styles.modalImg} />
            <button className={styles.modalNext} onClick={next}>›</button>
            <p className={styles.modalCounter}>{modalIdx + 1} / {fotos.length}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Institutional;
