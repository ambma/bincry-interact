// bincry-consumer.js
const BincryInteract = require('bincry-interact');

class BincryConsumer {
  constructor() {
    this.bincryInteract = new BincryInteract('YOUR_BINANCE_API_KEY', 'YOUR_BINANCE_API_SECRET');
  }

  async runConsumerLogic() {
    try {
      const binanceAccountInfo = await this.bincryInteract.getBinanceAccountInfo();
      console.log('Binance Account Info in Consumer:', binanceAccountInfo);

      const ethBalance = await this.bincryInteract.getEthBalance('0x5FbDB2315678afecb367f032d93F642f64180aa3');
      console.log('Ethereum Balance in Consumer:', ethBalance);

      const contractInteractionResult = await this.bincryInteract.interactWithSmartContract(
        '0xContractAddress',
        '0xYourPrivateKey',
        'yourSmartContractFunction',
        ['arg1', 'arg2']
      );

      console.log('Contract Interaction Result in Consumer:', contractInteractionResult);
    } catch (error) {
      console.error('Error in Consumer:', error.message);
    }
  }
}

// Usage
const bincryConsumer = new BincryConsumer();
bincryConsumer.runConsumerLogic();
