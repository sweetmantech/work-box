import { create } from 'zustand';

interface ContractState {
  contract: string | null;
  setContract: (contract: string) => void;
  clearContract: () => void;
}

export const useContractStore = create<ContractState>((set) => ({
  contract: null,
  setContract: (contract) => set({ contract }),
  clearContract: () => set({ contract: null }),
})); 