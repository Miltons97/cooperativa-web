import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* 🌐 WEB PÚBLICA */
import Navbar from "./componentes/navbar/Navbar";
import Inicio from "./componentes/home/Home";
import Institucional from "./componentes/institutional/Institutional";
import Novedades from "./componentes/news/News";
import Servicios from "./views/services-views/ServicesPage";
import PagosFacturas from "./componentes/Socios/MiFactura";
import Footer from "./componentes/Footer/footer";

/* 🔐 CONTEXT */
import { InstitucionProvider } from "./componentes/context/InstitutionContext";
import "./fix.css";

/* 🔐 ADMIN (CORRECTO) */
import AdminLayout from "./componentes/admin/AdminLayout";
import LoginAdmin from "./componentes/admin/admin-login/AdminUser";
import CrearNoticia from "./componentes/dashboard-news/AdminNews";

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

      
          <Route path="/admin/login" element={<LoginAdmin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="noticias/nueva" element={<CrearNoticia />} />
          </Route>
        </Routes>

        <Footer />

      </Router>
    </InstitucionProvider>
  );
}
//cambios nuevos
