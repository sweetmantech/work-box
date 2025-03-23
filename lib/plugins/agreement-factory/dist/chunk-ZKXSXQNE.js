"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class;

var _chunkDELTW3USjs = require('./chunk-DELTW3US.js');

// src/agreement-factory.plugin.ts
var _core = require('@goat-sdk/core');

var _zod = require('zod');
var DeployAgreementPairParameters = class extends _core.createToolParameters.call(void 0, 
  _zod.z.object({
    walletClient: _zod.z.any().describe("The EVMWalletClient to use for transaction"),
    minGasToComplete: _zod.z.string().describe("The minimum gas required for transactions in the paymaster").default("10000")
  })
) {
};
var AgreementFactoryPlugin = (_class = class extends _core.PluginBase {
  constructor({ contractAddress }) {
    console.log("contractAddress", contractAddress);
    super("agreement-factory", [new (0, _chunkDELTW3USjs.AgreementFactoryService)({ contractAddress })]);_class.prototype.__init.call(this);;
  }
  __init() {this.supportsChain = (chain) => chain.type === "evm"}
}, _class);
function agreementFactory({ contractAddress }) {
  return new AgreementFactoryPlugin({ contractAddress });
}





exports.DeployAgreementPairParameters = DeployAgreementPairParameters; exports.AgreementFactoryPlugin = AgreementFactoryPlugin; exports.agreementFactory = agreementFactory;
//# sourceMappingURL=chunk-ZKXSXQNE.js.map