import { create } from 'zustand';

interface AlertState {
  visible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void; 
  onCancel?: () => void;
  show: (params: Omit<AlertState, 'visible' | 'show' | 'hide'>) => void;
  hide: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  show: (params) => set({ visible: true, ...params }),
  hide: () => set({ visible: false }),
}));
