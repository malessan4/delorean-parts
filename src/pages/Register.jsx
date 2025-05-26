import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("https://delorean-parts-backend.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("Usuario creado correctamente");
      setMsgType("success");
      setShowModal(true);
    } else {
      setMsg(data.error);
      setMsgType("error");
    }
  };

const handleModalClose = () => {
  setShowModal(false);
  setTimeout(() => navigate("/login"), 300); // da tiempo a que desaparezca suavemente
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}     // estado inicial
      animate={{ opacity: 1, y: 0 }}      // animación de entrada
      exit={{ opacity: 0, y: -50 }}       // animación de salida
      transition={{ duration: 1.0 }}      // duración
    >
      <div>
        <h1>Delorean Parts</h1>
        <div className="login-container">
          <h2 className="login-title">Crear Usuario</h2>
          {msgType === "error" && <p className="error-message">{msg}</p>}
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Usuario:</label>
              <input
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="buyer">Comprador</option>
                <option value="seller">Vendedor</option>
                <option value="guest">Invitado</option>
              </select>
            </div>
            <button className="register-button">Registrar</button>
          </form>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{msg}</h3>
              <button onClick={handleModalClose} className="modal-ok-button">OK</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}