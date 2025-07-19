import { ethers } from 'ethers';
import { useGasStore } from '../../store/useGasStore';

const ARBITRUM_RPC = 'https://arb1.arbitrum.io/rpc';

export default function pollArbitrumGas() {
  const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC);

  const fetchGas = async () => {
    try {
      const block = await provider.getBlock('latest');

      // Arbitrum doesn't expose baseFee directly; use estimateGas as proxy
      const feeData = await provider.getFeeData();
      const baseFee = Number(ethers.formatUnits(feeData.maxFeePerGas || 0, 'gwei'));
      const priorityFee = 1.2;

      useGasStore.getState().updateChainGas('arbitrum', {
        baseFee,
        priorityFee,
      });
    } catch (err) {
      console.error('Arbitrum gas error:', err);
    }
  };

  fetchGas();
  setInterval(fetchGas, 6000);
}
