import { useState } from "react";
import useParts from "../store/parts";
import useAuth from "../store/auth";
import { useNavigate } from "react-router-dom";
import "./SellerHome.css";

export default function SellerHome() {
  const { addPart } = useParts();
  const { role } = useAuth();
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "description") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();            // Borra el rol
    navigate("/login");  // Redirige a login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const cleanPrice = form.price.replace(/\./g, "").replace(/\$/g, "");

    const partData = {
      ...form,
      price: cleanPrice,
      seller: user
    };

    try {
      const response = await fetch("https://delorean-parts-backend.onrender.com/publish-part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partData),
      });

      if (response.ok) {
        addPart(partData);
        setForm({ name: "", description: "", price: "" });
        setMsg("Repuesto publicado correctamente");
        setShowModal(true);
      } else {
        const errData = await response.json();
        setMsg("Error al publicar: " + errData.error);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Error al enviar el repuesto:", err);
      alert("Error al conectar con el servidor.");
    }
  };

  const cleanPrice = form.price.replace(/\./g, "").replace(/\$/g, "");

  const partData = {
    ...form,
    price: cleanPrice,
    seller: user,
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  function formatNumberWithDots(value) {
    // Elimina todo lo que no sea dígito
    const numericValue = value.replace(/\D/g, "");
    // Agrega los puntos
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">Hola, {user || "Usuario"}</div>
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </div>
      <div className="seller-container">

        <form className="seller-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre del repuesto"
            value={form.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Descripción del repuesto"
            value={form.description}
            onChange={handleChange}
            className="seller-textarea"
            rows={1}
          />
          <input
            name="price"
            placeholder="Precio"
            type="text"
            value={form.price}
            onChange={handleChange}
          />
          <button type="submit" className="seller-button">Publicar</button>
        </form>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{msg}</h3>
            <button onClick={handleModalClose} className="modal-ok-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
