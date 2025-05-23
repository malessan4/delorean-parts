// Este código implementa un componente de ruta protegida
//  que controla el acceso a ciertas partes de 
//  una aplicación React basándose en los roles de usuario


import { Navigate } from "react-router-dom";
import useAuth from "../store/auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}