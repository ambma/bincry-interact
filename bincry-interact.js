const axios = require('axios');
const Web3 = require('web3');

class BincryInteract {
  constructor(binanceApiKey, binanceApiSecret, ethereumNodeUrl) {
    this.binanceApiKey = binanceApiKey;
    this.binanceApiSecret = binanceApiSecret;
    this.web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));
    this.binanceApiBase = 'https://api.binance.com';
    this.binanceHeaders = {
      'X-MBX-APIKEY': this.binanceApiKey,
    };
  }

  async getBinanceAccountInfo() {
    const endpoint = '/api/v3/account';
    const url = `${this.binanceApiBase}${endpoint}`;
    const params = {
      timestamp: Date.now(),
      // Additional parameters for signed endpoint
    };
    // Signature process here, omitted for brevity
    const config = {
      headers: this.binanceHeaders,
      params,
    };
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching Binance account info:', error);
      throw error;
    }
  }

  async getEthBalance(address) {
    try {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching Ethereum balance:', error);
      throw error;
    }
  }

  async interactWithSmartContract(contractAddress, privateKey, functionName, args) {
    // Simplified ERC-20 ABI
    const erc20ABI = [
      {
        "constant": true,
        "inputs": [{"name":"_owner","type":"address"}],
        "name": "balanceOf",
        "outputs": [{"name":"balance","type":"uint256"}],
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
        "name": "transfer",
        "outputs": [{"name":"","type":"bool"}],
        "type": "function"
      }
    ];

    const contract = new this.web3.eth.Contract(erc20ABI, contractAddress);
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.web3.eth.accounts.wallet.add(account);
    this.web3.eth.defaultAccount = account.address;

    try {
      let transaction;
      if (functionName === "balanceOf") {
        const balance = await contract.methods[functionName](...args).call();
        return balance;
      } else if (functionName === "transfer") {
        const gasPrice = await this.web3.eth.getGasPrice();
        const gasEstimate = await contract.methods[functionName](...args).estimateGas({ from: account.address });
        transaction = await contract.methods[functionName](...args).send({
          from: account.address,
          gas: gasEstimate,
          gasPrice
        });
      } else {
        throw new Error("Unsupported function");
      }

      return transaction;
    } catch (error) {
      console.error('Error interacting with smart contract:', error);
      throw error;
    }
  }
}

module.exports = BincryInteract;
