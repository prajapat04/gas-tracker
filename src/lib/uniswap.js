import { ethers } from 'ethers';
import { useGasStore } from '../store/useGasStore';

// Uniswap V3 ETH/USDC pool address
const POOL_ADDRESS = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'; // ETH/USDC

// Minimal ABI to read slot0
const ABI = [
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)'
];

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com'); // Fast free RPC

const contract = new ethers.Contract(POOL_ADDRESS, ABI, provider);

export async function fetchEthUsdPrice() {
  try {
    const { sqrtPriceX96 } = await contract.slot0();
    const sqrtPrice = BigInt(sqrtPriceX96.toString());
    const price = (sqrtPrice ** 2n * 10n ** 12n) / (2n ** 192n);
    const usd = Number(price) / 1e6; // USDC has 6 decimals
    return usd;
  } catch (err) {
    console.error('Uniswap fetch error:', err);
    return 0;
  }
}

// 🌀 Auto-fetch every 10 seconds
export function fetchUniswapPriceLoop(interval = 10000) {
  const store = useGasStore.getState();
  const update = useGasStore.getState().setUsdPrice;

  const loop = async () => {
    const price = await fetchEthUsdPrice();
    update(price);
    setTimeout(loop, interval);
  };

  loop(); // Start the loop
}
