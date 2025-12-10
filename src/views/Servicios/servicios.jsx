import { Link, useLocation } from "react-router-dom";
import Agua from "./Agua/AguaCopeospiL";
import Luz from "./Luz/LuzCopeospil";
import Internet from "./Internet/InternetCopeospi";
import Social from "./Social/Social";

export default function Servicios() {
  const location = useLocation();

  return (
    <div>
      <h2>Servicios</h2>

      <nav>
        <Link to="/servicios/agua">Agua</Link> |{" "}
        <Link to="/servicios/luz">Luz</Link> |{" "}
        <Link to="/servicios/internet">Internet</Link> |{" "}
        <Link to="/servicios/social">Social</Link>
      </nav>

      <div style={{ marginTop: "20px" }}>
        {location.pathname === "/servicios/agua" && <Agua />}
        {location.pathname === "/servicios/luz" && <Luz />}
        {location.pathname === "/servicios/internet" && <Internet />}
        {location.pathname === "/servicios/social" && <Social />}
        {location.pathname === "/servicios" && (
          <p>Seleccione un servicio para ver más información.</p>
        )}
      </div>
    </div>
  );
}
