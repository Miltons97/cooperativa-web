import SidebarAdmin from "../DashboardNews/SidebarAdminNews";
import styles from "./adminLayout.module.css";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <SidebarAdmin />
      <main className={styles.adminContent}>
        <Outlet />
      </main>
    </div>
  );
}
