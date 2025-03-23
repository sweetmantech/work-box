// src/abi.ts
import { parseAbi } from "viem";
var AGREEMENT_FACTORY_ABI = parseAbi([
  // Deploy pair function
  "function deployAgreementPair(uint256 minGasToComplete) public returns (address paymaster, address serviceAgreement)",
  // Event
  "event AgreementPairDeployed(address indexed paymaster, address indexed serviceAgreement, uint256 minGasToComplete)"
]);

export {
  AGREEMENT_FACTORY_ABI
};
//# sourceMappingURL=chunk-TYQF6L43.mjs.map