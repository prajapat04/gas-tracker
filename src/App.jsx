import React, { useEffect } from 'react';
import { useGasStore } from './store/useGasStore';
import GasWidget from './components/GasWidget';
import CandlestickChart from './components/CandlestickChart';
import SimulationPanel from './components/simulationPanel';
import { fetchUniswapPriceLoop } from './lib/uniswap';

import pollEthereumGas from './lib/rpcClients/ethereum';
import pollArbitrumGas from './lib/rpcClients/arbitrum';
import pollPolygonGas from './lib/rpcClients/polygon';


const App = () => {
  const mode = useGasStore((state) => state.mode);

useEffect(() => {
  pollEthereumGas();     // ETH
  pollPolygonGas();      // MATIC
  pollArbitrumGas();     // ARB
  fetchUniswapPriceLoop();
}, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">⛽ Cross-Chain Gas Tracker</h1>
        <p className="text-sm text-gray-400">Live gas & simulation across Ethereum, Polygon, Arbitrum</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <GasWidget />
        </section>
        <section>
          <SimulationPanel />
        </section>
        <section className="lg:col-span-2">
          <CandlestickChart />
        </section>
      </main>

      <footer className="text-center text-gray-500 text-xs mt-8">
        Built by Amit · Web3 Dashboard · Powered by RPC + Uniswap V3
      </footer>
    </div>
  );
};

export default App;
