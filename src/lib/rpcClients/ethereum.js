import { ethers } from 'ethers';
import { useGasStore } from '../../store/useGasStore';

const ETHEREUM_RPC = 'https://eth-mainnet.public.blastapi.io'; // ✅ More reliable

export default function pollEthereumGas() {
  const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC);

  const fetchGas = async () => {
    try {
      const block = await provider.getBlock('latest');

      const baseFee = Number(ethers.formatUnits(block.baseFeePerGas || 0, 'gwei'));
      const priorityFee = 1.5;



      useGasStore.getState().updateChainGas('ethereum', {
        baseFee,
        priorityFee,
      });
    } catch (err) {
      console.error('Ethereum gas polling error:', err);
    }
  };

  fetchGas(); // initial
  setInterval(fetchGas, 6000); // poll every 6s
}
