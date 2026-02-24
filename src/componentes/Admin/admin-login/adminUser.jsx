// componentes/Admin/Login/adminUser.jsx
import { useState } from "react";
import { login } from "../../../services/authServices";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await login(email, password);
      
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/admin/noticias/nueva";
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <h2>Admin COPEOSPIL</h2>
        
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#666" }}>
        <p><strong>Usuarios de prueba:</strong></p>
        <p>admin@ejemplo.com / Admin123!</p>
        <p>user@ejemplo.com / User123!</p>
      </div>
    </div>
  );
}