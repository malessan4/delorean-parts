import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("Usuario creado correctamente");
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="buyer">Comprador</option>
          <option value="seller">Vendedor</option>
          <option value="guest">Invitado</option>
        </select>
        <button>Registrar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}