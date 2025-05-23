import { create } from 'zustand';

const useParts = create((set) => ({
  parts: [],
  addPart: (part) =>
    set((state) => ({
      parts: [...state.parts, part],
    })),
}));

export default useParts;