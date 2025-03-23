"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/abi.ts
var _viem = require('viem');
var AGREEMENT_FACTORY_ABI = _viem.parseAbi.call(void 0, [
  // Deploy pair function
  "function deployAgreementPair(uint256 minGasToComplete) public returns (address paymaster, address serviceAgreement)",
  // Event
  "event AgreementPairDeployed(address indexed paymaster, address indexed serviceAgreement, uint256 minGasToComplete)"
]);



exports.AGREEMENT_FACTORY_ABI = AGREEMENT_FACTORY_ABI;
//# sourceMappingURL=chunk-E7MTXPNL.js.map