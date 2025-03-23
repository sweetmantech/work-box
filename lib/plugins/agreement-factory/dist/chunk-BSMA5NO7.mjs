import {
  AGREEMENT_FACTORY_ABI
} from "./chunk-TYQF6L43.mjs";
import {
  __decorateClass
} from "./chunk-SAWN7RJP.mjs";

// src/agreement-factory.service.ts
import { Tool } from "@goat-sdk/core";
var AgreementFactoryService = class {
  contractAddress;
  constructor({ contractAddress }) {
    this.contractAddress = contractAddress;
  }
  async deployAgreementPair(walletClient, parameters) {
    try {
      const hash = await walletClient.sendTransaction({
        to: this.contractAddress,
        abi: AGREEMENT_FACTORY_ABI,
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
__decorateClass([
  Tool({
    description: "Deploy agreement service contract pair in order to follow provider agreements"
  })
], AgreementFactoryService.prototype, "deployAgreementPair", 1);

export {
  AgreementFactoryService
};
//# sourceMappingURL=chunk-BSMA5NO7.mjs.map