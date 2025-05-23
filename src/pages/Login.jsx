import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import { useState } from "react";

export default function Login() {
  const { setRole, setUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Estado de la respuest:", response.status);

      if (!response.ok) throw new Error("Login fallido");

      const user = await response.json();
      console.log("Respuesta del backend:", user);

      setRole(user.role);
      setUser(user.username);
      navigate(user.role === "seller" ? "/seller" : "/home");
    } catch (err) {
      console.error("Error en login:", err)
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
