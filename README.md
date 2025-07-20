# ⛽ Real-Time Cross-Chain Gas Tracker

A real-time Web3 dashboard that monitors gas fees across **Ethereum**, **Polygon**, and **Arbitrum** using public RPC endpoints — no third-party APIs used.

## 🚀 Features

- 🔄 Live gas tracking (base + priority fees)
- 📊 Candlestick chart of gas history
- 💰 ETH/USD simulation using Uniswap V3 pricing
- 🧠 Built with Zustand, Ethers.js, and modern React (Vite)



## 🛠️ Tech Stack

- React (with Vite)
- Zustand for global state
- Ethers.js for RPC interaction
- Tailwind CSS for UI styling
- Uniswap V3 price fetching

## 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/gas-tracker-app.git
cd gas-tracker-app

# Install dependencies
npm install

# Run the dev server
npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
