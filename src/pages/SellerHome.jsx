import { useState } from "react";
import useParts from "../store/parts";
import useAuth from "../store/auth";
import "./SellerHome.css";

export default function SellerHome() {
  const { addPart } = useParts();
  const { role } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const numericValue = value.replace(/\D/g, ""); // Solo números
      const formatted = "$" + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setForm({ ...form, [name]: formatted });
    } else {
      setForm({ ...form, [name]: value });
      if (name === "description") {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const partData = {
      ...form,
      price: form.price.replace(/\./g, ""), // Limpia puntos
      seller: role
    };

    try {
      const response = await fetch("http://localhost:3000/publish-part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partData),
      });

      if (response.ok) {
        addPart(partData);
        setForm({ name: "", description: "", price: "" });
        alert("Repuesto publicado!");
      } else {
        const errData = await response.json();
        alert("Error al publicar: " + errData.error);
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
    seller: role,
  };

  function formatNumberWithDots(value) {
    // Elimina todo lo que no sea dígito
    const numericValue = value.replace(/\D/g, "");
    // Agrega los puntos
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="seller-container">
      <h2 className="seller-title">Publicar Repuesto</h2>
      <form className="seller-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Descripción"
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
  );
}
