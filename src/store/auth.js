// Este código utiliza la biblioteca Zustand para crear un store
// de estado global que maneja el rol de autenticación
// en una aplicación React


import { create } from 'zustand';

const useAuth = create((set) => ({
  user: "",
  role: "",
  setUser: (newUser) => set({ user: newUser }),
  setAuth: (role, username) => set({ role, username }),
  setRole: (newRole) => set({ role: newRole }),
  logout: () => set({ role: "" }),
}));

export default useAuth;
