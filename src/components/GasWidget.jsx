import React from 'react';
import { useGasStore } from '../store/useGasStore';

const GasWidget = () => {
  const chains = useGasStore((state) => state.chains);

  const chainConfig = {
    ethereum: { label: 'Ethereum', color: 'border-blue-500' },
    polygon: { label: 'Polygon', color: 'border-purple-500' },
    arbitrum: { label: 'Arbitrum', color: 'border-green-500' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Object.entries(chains).map(([key, { baseFee = 0, priorityFee = 0 }]) => {
        const totalFee = baseFee + priorityFee;
       
        return (
          <div
            key={key}
            className={`bg-gray-800 border-l-4 ${chainConfig[key].color} p-4 rounded-xl shadow-md`}
          >
            <h2 className="text-lg font-semibold">{chainConfig[key].label}</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-400">Base Fee: {Number(baseFee).toFixed(2)} Gwei</p>
              <p className="text-sm text-gray-400">Priority Fee: {Number(priorityFee).toFixed(2)} Gwei</p>
              <p className="text-md mt-1 font-bold text-yellow-300">Total: {Number(totalFee).toFixed(2)} Gwei</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GasWidget;
