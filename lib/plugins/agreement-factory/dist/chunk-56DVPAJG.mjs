import {
  AgreementFactoryService
} from "./chunk-BSMA5NO7.mjs";

// src/agreement-factory.plugin.ts
import { PluginBase } from "@goat-sdk/core";
import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";
var DeployAgreementPairParameters = class extends createToolParameters(
  z.object({
    walletClient: z.any().describe("The EVMWalletClient to use for transaction"),
    minGasToComplete: z.string().describe("The minimum gas required for transactions in the paymaster").default("10000")
  })
) {
};
var AgreementFactoryPlugin = class extends PluginBase {
  constructor({ contractAddress }) {
    console.log("contractAddress", contractAddress);
    super("agreement-factory", [new AgreementFactoryService({ contractAddress })]);
  }
  supportsChain = (chain) => chain.type === "evm";
};
function agreementFactory({ contractAddress }) {
  return new AgreementFactoryPlugin({ contractAddress });
}

export {
  DeployAgreementPairParameters,
  AgreementFactoryPlugin,
  agreementFactory
};
//# sourceMappingURL=chunk-56DVPAJG.mjs.map