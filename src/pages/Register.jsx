import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Rol por defecto
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // Verificar si el usuario ya existe
      const data = await fs.promises.readFile('users.txt', 'utf-8');
      const users = data.split('\n');
      
      if (users.some(line => line.startsWith(`${username}:`))) {
        setError('El usuario ya existe');
        return;
      }

      // Añadir nuevo usuario
      const newUser = `${username}:${password}:${role}\n`;
      await fs.promises.appendFile('users.txt', newUser);
      
      navigate('/login'); // Redirigir a login después del registro
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="buyer">Comprador</option>
            <option value="seller">Vendedor</option>
            <option value="guest">Invitado</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}