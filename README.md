# 🚀 Decentralized Task Marketplace DApp

![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-363636?style=for-the-badge&logo=solidity)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css)
![Hardhat](https://img.shields.io/badge/Hardhat-2.24.2-FFF100?style=for-the-badge&logo=hardhat)
![Ethers.js](https://img.shields.io/badge/Ethers.js-v6-274291?style=for-the-badge)

A fully decentralized, trustless freelance marketplace where clients can post tasks with cryptocurrency (ETH) rewards, and freelancers can complete them to earn funds. The platform removes the need for a middleman by utilizing Smart Contracts to escrow funds and manage the task lifecycle.

## ✨ Features

- **💼 For Clients:**
  - Create tasks with a specific ETH reward and deadline.
  - Funds are securely locked in the Smart Contract upon creation.
  - Review submitted work (proofs) and approve to release funds.
  - Cancel tasks (if unaccepted) or claim refunds (if deadlines are missed).

- **🧑‍💻 For Freelancers:**
  - Browse available open tasks.
  - Accept tasks and secure the workflow.
  - Submit proof of work (links, files) upon completion.
  - Receive automated payouts directly to your wallet once approved.

- **⚖️ Dispute & Refund:**
  - Seamless interface to handle delayed tasks and initiate refunds past the deadline.

## 🏗️ Technology Stack

### Smart Contract (Backend)
- **Solidity (`^0.8.20`)**: The core programming language for the smart contract.
- **Hardhat**: Development environment to compile, deploy, test, and debug Ethereum software.

### Frontend (User Interface)
- **React 19**: Modern UI library for building the single-page application.
- **Vite**: Lightning-fast frontend build tool.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid and responsive styling.
- **Framer Motion**: Smooth animations and transitions.
- **Ethers.js (v6)**: Library to interact with the Ethereum Blockchain and MetaMask.

## 📂 Project Structure

This is a monorepo containing both the Smart Contract and the Frontend:

```text
task-marketplace-dapp/
├── task-marketplace/          # Blockchain backend (Smart Contracts)
│   ├── contracts/             # Solidity source files (TaskMarketplace.sol)
│   ├── scripts/               # Deployment scripts
│   ├── test/                  # Unit tests for the contract
│   └── hardhat.config.js      # Hardhat network & compiler configuration
│
└── task-marketplace-frontend/ # React Vite Application
    ├── src/
    │   ├── components/        # Reusable UI components (Header, Sidebar, etc.)
    │   ├── config/            # Contract ABI & Web3 Configuration
    │   ├── pages/             # App Pages (Home, Dashboard, Create Task, etc.)
    │   └── utils/             # Helper functions
    ├── index.html
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MetaMask](https://metamask.io/) Extension installed in your browser.

### 1. Clone the repository
```bash
git clone https://github.com/wongun78/task-marketplace-dapp.git
cd task-marketplace-dapp
```

### 2. Setup Smart Contracts
```bash
cd task-marketplace
npm install

# Compile the contracts
npx hardhat compile

# (Optional) Run a local Ethereum node for testing
npx hardhat node

# Deploy the contract to your network (localhost or testnet)
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Setup Frontend
Before running the frontend, ensure the `CONTRACT_ADDRESS` in `task-marketplace-frontend/src/config/contract.js` matches your deployed contract address. Also, make sure to copy the latest ABI JSON file from the `/artifacts` folder.

```bash
cd ../task-marketplace-frontend
npm install

# Start the development server
npm run dev
```

The application will be running at `http://localhost:5173`. Connect your MetaMask wallet (switch to the correct network) to start interacting with the DApp.

## 📜 License

This project is licensed under the MIT License.
