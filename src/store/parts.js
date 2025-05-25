import { create } from "zustand";

const useParts = create((set) => ({
  parts: [],
  addPart: (part) =>
    set((state) => ({ parts: [...state.parts, part] })),

  fetchParts: async () => {
    try {
      const response = await fetch("http://localhost:3000/parts");
      const data = await response.json();
      set({ parts: data });
    } catch (error) {
      console.error("Error al obtener partes:", error);
    }
  },
}));

export default useParts;