import { useState } from "react";
import useParts from "../store/parts";
import useAuth from "../store/auth";

export default function SellerHome() {
  const { addPart } = useParts();
  const { role } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addPart({ ...form, seller: role });
    setForm({ name: "", description: "", price: "" });
    alert("Repuesto publicado!");
  };

  return (
    <div>
      <h2>Publicar Repuesto</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Precio" type="number" value={form.price} onChange={handleChange} />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}
