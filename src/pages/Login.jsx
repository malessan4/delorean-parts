import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Login.css";

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

      console.log("Estado de la respuesta:", response.status);

      if (!response.ok) throw new Error("Login fallido");

      const user = await response.json();
      console.log("Respuesta del backend:", user);

      setRole(user.role);
      setUser(user.username);
      navigate(user.role === "seller" ? "/seller" : "/home");
    } catch (err) {
      console.error("Error en login:", err);
      setError("Credenciales incorrectas");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}     // estado inicial
      animate={{ opacity: 1, y: 0 }}      // animación de entrada
      exit={{ opacity: 0, y: -50 }}       // animación de salida
      transition={{ duration: 0.7 }}      // duración
    >
      <div>
        <h1>Delorean Parts</h1>
        <div className="login-container">
          <h2 className="login-title">Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-button" type="submit">Ingresar</button>
            <button className="register-button" type="button" onClick={handleGoToRegister}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}