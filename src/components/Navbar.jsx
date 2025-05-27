import { useNavigate } from "react-router-dom";
import useAuth from "../store/auth";

export default function Navbar() {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setRole(null);
    navigate("/");
  };

  return (
    <nav style={{ padding: "1em", backgroundColor: "#eee", display: "flex", justifyContent: "space-between" }}>
      <span>🧩 AutoPartes</span>
      {role && (
        <div>
          <span style={{ marginRight: "1em" }}>Rol: {role}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}
