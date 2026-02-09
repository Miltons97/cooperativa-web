import SidebarAdmin from "../Dashboard/sidebarAdmin";
import styles from "./admin.module.css";
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
