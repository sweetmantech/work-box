import "./chunk-SAWN7RJP.mjs";

// src/parameters.ts
import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";
var DeployAgreementPairParameters = class extends createToolParameters(
  z.object({
    minGasToComplete: z.string().optional().describe("The minimum gas required for transactions in the paymaster").default("10000")
  })
) {
};
var IsContractDeployedParameters = class extends createToolParameters(
  z.object({
    contractAddress: z.string().describe("The address of the contract to check deployment status")
  })
) {
};
var GetDeployedContractByIndexParameters = class extends createToolParameters(
  z.object({
    index: z.number().describe("The index of the deployed contract to retrieve")
  })
) {
};
export {
  DeployAgreementPairParameters,
  GetDeployedContractByIndexParameters,
  IsContractDeployedParameters
};
//# sourceMappingURL=parameters.mjs.map