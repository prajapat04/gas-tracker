import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts';
import { useGasStore } from '../store/useGasStore';
import { aggregateCandles } from '../utils/aggregateCandles';

const CHAIN_COLORS = {
  ethereum: '#627EEA',
  polygon: '#8247E5',
  arbitrum: '#28A0F0',
};

export default function CandlestickChart() {
  const [selectedChain, setSelectedChain] = useState('ethereum');
  const history = useGasStore((s) => s.chains[selectedChain].history);

  const candles = useMemo(() => {
    return aggregateCandles(history, 15 * 60 * 1000); // 15-minute intervals
  }, [history]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow w-full">
      <h2 className="text-lg font-bold mb-4 text-center">Gas Price Candlestick – {selectedChain}</h2>

      <div className="flex justify-center gap-4 mb-2">
        {['ethereum', 'polygon', 'arbitrum'].map((chain) => (
          <button
            key={chain}
            onClick={() => setSelectedChain(chain)}
            className={`px-3 py-1 rounded ${
              selectedChain === chain ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {chain}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={candles}>
          <XAxis dataKey="time" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
          <YAxis domain={['auto', 'auto']} unit=" Gwei" />
          <Tooltip
            formatter={(val) => `${val.toFixed(2)} Gwei`}
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />
          <CartesianGrid strokeDasharray="3 3" />
          {candles.map((c, idx) => (
            <Bar
              key={idx}
              dataKey="close"
              fill={CHAIN_COLORS[selectedChain]}
              x={c.time}
              y={Math.min(c.open, c.close)}
              height={Math.abs(c.close - c.open)}
              barSize={6}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
