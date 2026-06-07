import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./userManagement.module.css";
import { API_URL } from "../../../config/api";

const ROLES = ["admin", "servicios", "agua", "luz", "internet", "social", "aguaMineral"];

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

const roleLabel = (role) => ({
  superadmin: "Super Admin", admin: "Admin", servicios: "Servicios",
  agua: "Agua", luz: "Luz", internet: "Internet", social: "Social", aguaMineral: "Agua Mineral",
}[role] ?? role);

export default function UserManagement() {
  const [users, setUsers]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [myId, setMyId]                 = useState(null);
  const [toast, setToast]               = useState(null);
  const [showCreate, setShowCreate]     = useState(false);
  const [editUser, setEditUser]         = useState(null);
  const [confirmDel, setConfirmDel]     = useState(null);
  const [confirmReset, setConfirmReset] = useState(null);
  const [createForm, setCreateForm]     = useState({ email: "", role: "admin" });
  const [editForm, setEditForm]         = useState({ email: "", role: "admin" });
  const [saving, setSaving]             = useState(false);
  const [resetting, setResetting]       = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setMyId(jwtDecode(token).id);
    fetchUsers();
  }, []);

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users`, { headers: authHeader() });
      if (!res.ok) throw new Error();
      setUsers(await res.json());
    } catch {
      showToast("No se pudo cargar la lista de usuarios", "err");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createForm.email.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear usuario");
      showToast(
        data.emailSent
          ? `Usuario creado. Contraseña provisional enviada a ${createForm.email}.`
          : `Usuario creado. No se pudo enviar el email.`,
        data.emailSent ? "ok" : "warn"
      );
      setCreateForm({ email: "", role: "admin" });
      setShowCreate(false);
      fetchUsers();
    } catch (err) {
      showToast(err.message, "err");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (u) => {
    setEditUser(u);
    setEditForm({ email: u.email, role: u.role });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar");
      showToast("Usuario actualizado correctamente");
      setUsers((prev) => prev.map((u) => u.id === editUser.id ? data.user : u));
      setEditUser(null);
    } catch (err) {
      showToast(err.message, "err");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirmReset) return;
    setResetting(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ email: confirmReset.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al resetear");
      showToast(
        data.emailSent
          ? `Contraseña provisional enviada a ${confirmReset.email}.`
          : `Contraseña reseteada. No se pudo enviar el email.`,
        data.emailSent ? "ok" : "warn"
      );
    } catch (err) {
      showToast(err.message, "err");
    } finally {
      setResetting(false);
      setConfirmReset(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDel) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${confirmDel.id}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("Usuario eliminado correctamente");
      setUsers((prev) => prev.filter((u) => u.id !== confirmDel.id));
    } catch (err) {
      showToast(err.message || "Error al eliminar", "err");
    } finally {
      setConfirmDel(null);
    }
  };

  return (
    <div className={styles.page}>
      {toast && <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.msg}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Usuarios</h1>
          <p className={styles.subtitle}>Solo los correos registrados aquí pueden acceder al panel.</p>
        </div>
        <button className={styles.btnAdd} onClick={() => setShowCreate(true)}>+ Nuevo usuario</button>
      </div>

      {showCreate && (
        <div className={styles.modalOverlay} onClick={() => setShowCreate(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Crear nuevo usuario</h2>
            <p className={styles.modalSub}>Se genera una contraseña provisional y se envía al correo.</p>
            <form onSubmit={handleCreate} className={styles.form}>
              <label className={styles.label}>Correo electrónico</label>
              <input type="email" required className={styles.input}
                placeholder="usuario@ejemplo.com"
                value={createForm.email}
                onChange={(e) => setCreateForm((f) => ({ ...f, email: e.target.value }))} />
              <label className={styles.label}>Rol</label>
              <select className={styles.select} value={createForm.role}
                onChange={(e) => setCreateForm((f) => ({ ...f, role: e.target.value }))}>
                {ROLES.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}
              </select>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setShowCreate(false)}>Cancelar</button>
                <button type="submit" className={styles.btnSave} disabled={saving}>
                  {saving ? "Creando..." : "Crear y enviar email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editUser && (
        <div className={styles.modalOverlay} onClick={() => setEditUser(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Editar usuario</h2>
            <p className={styles.modalSub}>Modificá el correo o el rol del usuario.</p>
            <form onSubmit={handleEdit} className={styles.form}>
              <label className={styles.label}>Correo electrónico</label>
              <input type="email" required className={styles.input}
                value={editForm.email}
                onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} />
              <label className={styles.label}>Rol</label>
              <select className={styles.select} value={editForm.role}
                onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}>
                {ROLES.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}
              </select>
              <div className={styles.formActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setEditUser(null)}>Cancelar</button>
                <button type="submit" className={styles.btnSave} disabled={saving}>
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmReset && (
        <div className={styles.modalOverlay} onClick={() => setConfirmReset(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Resetear contraseña</h2>
            <p className={styles.modalSub}>
              Se va a generar una contraseña provisional y enviar a <strong>{confirmReset.email}</strong>.
              El usuario deberá cambiarla desde Mi Perfil.
            </p>
            <div className={styles.formActions}>
              <button className={styles.btnCancel} onClick={() => setConfirmReset(null)}>Cancelar</button>
              <button className={styles.btnSave} onClick={handleReset} disabled={resetting}>
                {resetting ? "Enviando..." : "Resetear y enviar email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDel && (
        <div className={styles.modalOverlay} onClick={() => setConfirmDel(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>¿Eliminar usuario?</h2>
            <p className={styles.modalSub}>
              Vas a eliminar a <strong>{confirmDel.email}</strong>. Esta acción no se puede deshacer.
            </p>
            <div className={styles.formActions}>
              <button className={styles.btnCancel} onClick={() => setConfirmDel(null)}>Cancelar</button>
              <button className={styles.btnDelete} onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className={styles.empty}>Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p className={styles.empty}>No hay usuarios registrados.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Correo</th>
                <th>Rol</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={u.id === myId ? styles.rowSelf : ""}>
                  <td className={styles.tdEmail}>
                    {u.email}
                    {u.id === myId && <span className={styles.youBadge}>Vos</span>}
                  </td>
                  <td>
                    <span className={`${styles.roleBadge} ${styles[`role_${u.role}`]}`}>
                      {roleLabel(u.role)}
                    </span>
                  </td>
                  <td className={styles.tdDate}>
                    {new Date(u.created_at).toLocaleDateString("es-AR", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className={styles.tdActions}>
                    <button className={styles.btnEdit} onClick={() => openEdit(u)} title="Editar">✏️</button>
                    <button className={styles.btnReset} onClick={() => setConfirmReset(u)} title="Resetear contraseña">🔑</button>
                    {u.id !== myId && (
                      <button className={styles.btnDeleteRow} onClick={() => setConfirmDel(u)} title="Eliminar">🗑</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
