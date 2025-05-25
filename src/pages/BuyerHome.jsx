import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useParts from "../store/parts";
import useAuth from "../store/auth";
import "./BuyerHome.css";

export default function BuyerHome() {
  const { parts, fetchParts } = useParts();
  const { role } = useAuth();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };


  useEffect(() => {
    fetchParts(); // carga al montar
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBuy = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/parts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Fallo la compra');

      setMsg("Compra realizada con éxito");
      setShowModal(true);

      // Vuelve a cargar los parts desde el backend (para reflejar el cambio)
      fetchParts();
    } catch (error) {
      alert("Hubo un error al realizar la compra");
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}     // estado inicial
        animate={{ opacity: 1, y: 0 }}      // animación de entrada
        exit={{ opacity: 0, y: -50 }}       // animación de salida
        transition={{ duration: 1.0 }}      // duración
      >

        <div className="navbar">
          <div className="navbar-left">Hola, {user || "Usuario"}</div>
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </div>
        <div className="parts-container">
          {parts.length === 0 ? (
            <p>No hay repuestos aún.</p>
          ) : (
            parts.map((part, idx) => (
              <div className="part-card" key={idx}>
                <h2>{part.name}</h2>
                <p className="description">{part.description}</p>
                <p className="price">
                  ${Number(part.price)?.toLocaleString("es-AR") || "Precio inválido"}
                </p>
                {role !== "guest" ? (
                  <>
                    <button className="buy-button" onClick={() => handleBuy(part.id)}>Comprar</button>
                    <p className="seller">Vendedor: {part.seller}</p>
                  </>
                ) : (
                  <>
                    <button disabled>Login requerido para comprar</button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{msg}</h3>
              <button onClick={handleModalClose} className="modal-ok-button">OK</button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
