import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar/Navbar";
import Inicio from "./componentes/Inicio/Inicio";
import Institucional from "./componentes/Institucional/Institucional";
import Novedades from "./componentes/Novedades/Novedades";
import Servicios from "./componentes/sevicios/servicios";
import PagosFacturas from "./componentes/Socios/MiFactura";

import { InstitucionProvider } from "./componentes/context/intitucionContext";

export default function App() {
  return (
    <InstitucionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/pagos-facturas" element={<PagosFacturas />} />
          <Route path="/servicios/*" element={<Servicios />} />
        </Routes>
      </Router>
    </InstitucionProvider>
  );
}
