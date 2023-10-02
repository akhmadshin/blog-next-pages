import { create } from 'zustand';

interface PlaceholderState {
  placeholder?: any;
  setPlaceholder: (placeholder: any) => void;
}

export const usePlaceholderStore = create<PlaceholderState>((set) => ({
  placeholder: {},
  setPlaceholder: (placeholder) => set(() => ({placeholder})),
}));
