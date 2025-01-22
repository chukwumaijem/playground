# Tether Wallet CLI

This is a command-line wallet implementation based on [lib-wallet](https://github.com/tetherto/lib-wallet). It provides a simple interface for managing multiple cryptocurrencies and tokens.

## Prerequisites

Before running the wallet, ensure you have the following services running:

1. **Bitcoin Core** (for Bitcoin regtest)

   ```bash
   bitcoind -regtest
   ```

2. **Fulcrum Server** (Electrum server)

   ```bash
   fulcrum fulcrum.conf
   ```

   Open your electrum wallet and create a new wallet. Then, send some bitcoin to the wallet address.

3. **Hardhat Node**

   ```bash
   npx hardhat node
   ```

4. **lib-wallet-indexer**
   ```bash
   git clone https://github.com/tetherto/lib-wallet-indexer.git
   cd lib-wallet-indexer && npm install
   npm run start-hardhat
   ```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## SeaShell Node

1. Start the CLI:
   ```bash
   node 6_tether_wdk/cli.js
   ```

### Available Commands

- `.paymethods` - List all available payment methods
- `.newaddress <asset> <token?>` - Generate new address for an asset/token
- `.sync` - Sync wallet history
- `.balance <asset> <token> --addr <address>` - Get balance for asset/token
- `.addr-bal <asset> <token>` - List addresses and their balances
- `.send <asset> <token> --addr <receiver> --sender <sender> --amt <amount>` - Send transaction
- `.history <asset> <token>` - View transaction history

### Examples

Generate new Bitcoin address

```bash
.newaddress btc
```

Send btc from your electrum wallet to the new address

Check the balance of the new address

```bash
.balance btc
```

View Bitcoin transaction history

```bash
.history btc
```

## AI Agent

The AI agent is a simple web application that uses the Tether Wallet Library to interact with the wallet. It allows you to record your voice and transcribe it into a JSON format. The JSON is then parsed and used to call the appropriate wallet methods.

An extra prerequisite is needed to run the AI agent. You need to have a local instance of Whisper and Ollama running.

To run the AI agent, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Start the AI agent:

```bash
npm run dev
```

3. Open the AI agent in your browser:

```bash
http://localhost:8080
```

4. Follow the on screen instructions to record your voice and transcribe it into a JSON format.
