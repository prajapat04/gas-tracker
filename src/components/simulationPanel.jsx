import React, { useState } from 'react';
import { useGasStore } from '../store/useGasStore';

const SimulationPanel = () => {
  const [txAmount, setTxAmount] = useState(0.5);
  const { chains, usdPrice, setMode } = useGasStore();

  const gasLimit = 21000;

  const getUsdCost = (chainKey) => {
    const { baseFee, priorityFee } = chains[chainKey];
    const totalGwei = baseFee + priorityFee;
    const gasEth = (totalGwei * gasLimit) / 1e9;
    const gasUSD = gasEth * usdPrice;
    return gasUSD.toFixed(4);
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setTxAmount(value);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">🎯 Simulation Mode</h2>
        <button
          className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-500"
          onClick={() => setMode('live')}
        >
          Exit Simulation
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-1">Transaction Amount (ETH/MATIC/ETH):</label>
        <input
          type="number"
          value={txAmount}
          onChange={handleInputChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          step="0.01"
          min="0"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-1">Chain</th>
              <th className="py-1">Gas (USD)</th>
              <th className="py-1">Tx Value (USD)</th>
              <th className="py-1 font-semibold text-yellow-400">Total (USD)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chains).map((chain) => {
              const gasCost = parseFloat(getUsdCost(chain));
              const txValue = (txAmount * usdPrice).toFixed(2);
              const total = (gasCost + parseFloat(txValue)).toFixed(2);

              return (
                <tr key={chain} className="border-b border-gray-700">
                  <td className="py-1 capitalize">{chain}</td>
                  <td className="py-1 text-red-400">${gasCost}</td>
                  <td className="py-1">${txValue}</td>
                  <td className="py-1 font-bold text-yellow-300">${total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimulationPanel;
