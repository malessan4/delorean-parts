// Este código utiliza la biblioteca Zustand para crear un store
// de estado global que maneja el rol de autenticación
// en una aplicación React


import { create } from 'zustand';

const useAuth = create((set) => ({
  user: null,
  role: null,
  setUser: (newUser) => set({ user: newUser }),
  setRole: (newRole) => set({ role: newRole }),
}));

export default useAuth;
