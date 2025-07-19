import { ethers } from 'ethers';
import { useGasStore } from '../../store/useGasStore';

const POLYGON_RPC = 'https://polygon-rpc.com/';


let lastUpdated = 0;

export async function pollPolygonGas(interval = 6000) {
  const provider = new ethers.JsonRpcProvider(POLYGON_RPC);

  const fetchGas = async () => {
    try {
      const block = await provider.getBlock('latest');
      const baseFee = Number(ethers.formatUnits(block.baseFeePerGas, 'gwei'));
      const priorityFee = 0.3; // Estimated tip for Polygon

      useGasStore.getState().updateChainGas('polygon', {
        baseFee,
        priorityFee,
      });
    } catch (err) {
      console.error('Polygon gas error:', err);
    }
    setTimeout(fetchGas, interval);
  };

  fetchGas();
}

export default pollPolygonGas;