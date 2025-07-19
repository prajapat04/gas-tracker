// src/store/useGasStore.js
import { create } from 'zustand';

export const useGasStore = create((set) => ({
  mode: 'live',

  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },

  usdPrice: 0,

  setMode: (mode) => set(() => ({ mode })),
  setUsdPrice: (price) => set(() => ({ usdPrice: price })),

  updateChainGas: (chain, { baseFee, priorityFee }) => {
    set((state) => {
      const current = state.chains[chain];
      const now = Date.now();

      const newHistory = [
        ...current.history,
        { timestamp: now, baseFee },
      ].slice(-60); // last 15 min if fetched every 15s

      return {
        chains: {
          ...state.chains,
          [chain]: {
            ...current,
            baseFee,
            priorityFee,
            history: newHistory,
          },
        },
      };
    });
  },
}));
