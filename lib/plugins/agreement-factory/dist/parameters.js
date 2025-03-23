"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('./chunk-EUXUH3YW.js');

// src/parameters.ts
var _core = require('@goat-sdk/core');
var _zod = require('zod');
var DeployAgreementPairParameters = class extends _core.createToolParameters.call(void 0, 
  _zod.z.object({
    minGasToComplete: _zod.z.string().optional().describe("The minimum gas required for transactions in the paymaster").default("10000")
  })
) {
};
var IsContractDeployedParameters = class extends _core.createToolParameters.call(void 0, 
  _zod.z.object({
    contractAddress: _zod.z.string().describe("The address of the contract to check deployment status")
  })
) {
};
var GetDeployedContractByIndexParameters = class extends _core.createToolParameters.call(void 0, 
  _zod.z.object({
    index: _zod.z.number().describe("The index of the deployed contract to retrieve")
  })
) {
};




exports.DeployAgreementPairParameters = DeployAgreementPairParameters; exports.GetDeployedContractByIndexParameters = GetDeployedContractByIndexParameters; exports.IsContractDeployedParameters = IsContractDeployedParameters;
//# sourceMappingURL=parameters.js.map