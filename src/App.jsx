import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Institucional from "./components/Institutional/Institutional";
import Servicios from "./views/ServicesView/ServicesPage";
import PagosFacturas from "./components/Members/MyInvoice";
import Footer from "./components/Footer/Footer";

import { InstitucionProvider } from "./components/context/InstitutionContext";
import "./fix.css";

import AdminLayout from "./components/Admin/AdminLayout";
import PrivateRoute from "./components/Admin/PrivateRoute";
import LoginAdmin from "./components/Admin/AdminDashboard/AdminUserLogin";
import CrearNoticia from "./components/Dashboard/NewsAdmin/CreateNews";
import CrearNecrologica from "./components/Dashboard/NewsAdmin/CreateObituary";
import VerNoticiasAdmin from "./components/Dashboard/NewsAdmin/ViewNews";
import EditarNoticia from "./components/Dashboard/NewsAdmin/EditNews";
import ChangePassword from "./components/Dashboard/Profile/ChangePassword";
import UserManagement from "./components/Dashboard/Users/UserManagement";

export default function App() {
  return (
    <InstitucionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/pagos-facturas" element={<PagosFacturas />} />
          <Route path="/servicios/*" element={<Servicios />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route path="noticias/nueva" element={<CrearNoticia />} />
            <Route path="necrologica/nueva" element={<CrearNecrologica />} />
            <Route path="/admin/noticias" element={<VerNoticiasAdmin />} />
            <Route path="/admin/noticias/editar/:id" element={<EditarNoticia />} />
            <Route path="/admin/perfil" element={<ChangePassword />} />
            <Route path="/admin/usuarios" element={<UserManagement />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </InstitucionProvider>
  );
}
