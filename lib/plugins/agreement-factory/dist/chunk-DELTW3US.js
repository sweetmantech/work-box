"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkE7MTXPNLjs = require('./chunk-E7MTXPNL.js');


var _chunkEUXUH3YWjs = require('./chunk-EUXUH3YW.js');

// src/agreement-factory.service.ts
var _core = require('@goat-sdk/core');
var AgreementFactoryService = class {
  
  constructor({ contractAddress }) {
    this.contractAddress = contractAddress;
  }
  async deployAgreementPair(walletClient, parameters) {
    try {
      const hash = await walletClient.sendTransaction({
        to: this.contractAddress,
        abi: _chunkE7MTXPNLjs.AGREEMENT_FACTORY_ABI,
        functionName: "deployAgreementPair",
        args: [BigInt(parameters.minGasToComplete)]
      });
      return {
        transactionHash: hash.hash,
        message: "Agreement pair deployment transaction sent successfully"
      };
    } catch (error) {
      throw Error(`Failed to deploy Agreement pair: ${error}`);
    }
  }
};
_chunkEUXUH3YWjs.__decorateClass.call(void 0, [
  _core.Tool.call(void 0, {
    description: "Deploy agreement service contract pair in order to follow provider agreements"
  })
], AgreementFactoryService.prototype, "deployAgreementPair", 1);



exports.AgreementFactoryService = AgreementFactoryService;
//# sourceMappingURL=chunk-DELTW3US.js.map