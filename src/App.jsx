import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./componentes/Navbar/Navbar";
import Home from "./componentes/home/Home";
import Institucional from "./componentes/institutional/Institutional";
import News  from "./componentes/news/News";
import Servicios from "./views/services-views/ServicesPage";
import PagosFacturas from "./componentes/Socios/MiFactura";
import Footer from "./componentes/Footer/footer";


import { InstitucionProvider } from "./componentes/context/InstitutionContext";
import "./fix.css";


import AdminLayout from "./componentes/Admin/adminLayout";
import LoginAdmin from "./componentes/Admin/admin-dashboard/AdminUserLogin";
import CrearNoticia from "./componentes/Dashboard/noticias-admin/crearNoticias";
import VerNoticiasAdmin from "./componentes/Dashboard/noticias-admin/verNoticias";
import EditarNoticia from "./componentes/Dashboard/noticias-admin/editarNoticias";
// import NovedadesDetalle from "./componentes/Novedades/Novedades";

export default function App() {
  return (
    <InstitucionProvider>
      <Router>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/institucional" element={<Institucional />} />
        <Route path="/novedades" element={<News />} />
<Route path="/novedades/:id" element={<NovedadesDetalle />} />

          <Route path="/pagos-facturas" element={<PagosFacturas />} />
          <Route path="/servicios/*" element={<Servicios />} />


          <Route path="/admin/login" element={<LoginAdmin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="noticias/nueva" element={<CrearNoticia />} />
            <Route path="/admin/noticias" element={<VerNoticiasAdmin />} />
            <Route path="/admin/noticias/editar/:id" element={<EditarNoticia />} />

          </Route>
        </Routes>

        <Footer />

      </Router>
    </InstitucionProvider>
  );
}
//cambios nuevos
