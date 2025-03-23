import { parseAbi } from "viem";

export const AGREEMENT_FACTORY_ABI = parseAbi([
    // Deploy pair function
    "function deployAgreementPair(uint256 minGasToComplete) public returns (address paymaster, address serviceAgreement)",
    
    // Event
    "event AgreementPairDeployed(address indexed paymaster, address indexed serviceAgreement, uint256 minGasToComplete)",
]); 