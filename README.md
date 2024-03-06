# BincryInteract

`BincryInteract` is a Node.js package designed for advanced interactions with Binance's API and the Ethereum blockchain, enabling users to fetch account information, balances, and interact with smart contracts.

## Installation

To install `BincryInteract`, run the following command in your project directory:

```bash
npm install bincry-interact
```

## Usage

```bash
const BincryInteract = require('bincry-interact');

// Initialize with your API keys and Ethereum node URL
const bincry = new BincryInteract('yourBinanceApiKey', 'yourBinanceApiSecret', 'yourEthereumNodeUrl');

// Fetch Binance account info
bincry.getBinanceAccountInfo().then(info => console.log(info)).catch(err => console.error(err));

// Get Ethereum balance
bincry.getEthBalance('0x...').then(balance => console.log(balance)).catch(err => console.error(err));

// Interact with a smart contract
bincry.interactWithSmartContract('0x...', 'yourPrivateKey', 'functionName', ['arg1', 'arg2'])
  .then(receipt => console.log(receipt))
  .catch(err => console.error(err));
  ```


## Important Notes
Ensure your API keys and private keys are securely stored and never hard-coded directly into your applications

The package assumes familiarity with Ethereum smart contracts





