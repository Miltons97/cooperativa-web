import SidebarAdmin from "../dashboard-news/SidebarAdminNews";
import styles from "./admin-layout.module.css";
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
//admin layout