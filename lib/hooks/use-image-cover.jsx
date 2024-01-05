import { create } from "zustand";

export const useCoverImage = create((set) => ({
  imgKey: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, imgKey: undefined }),
  onClose: () => set({ isOpen: false, imgKey: undefined }),
  onReplace: (imgKey) => set({ isOpen: true, imgKey }),
}));
