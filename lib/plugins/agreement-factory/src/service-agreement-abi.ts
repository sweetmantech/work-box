import { parseAbi } from "viem";

export const SERVICE_AGREEMENT_ABI = parseAbi([
    // View functions
    "function nextAgreementId() view returns (uint256)",
    "function agreements(uint256) view returns (address client, address serviceProvider, uint256 totalAmount, uint8 status, string termsHash, uint256 completedMilestones, uint256 createdAt)",
    "function getAgreement(uint256 _agreementId) view returns (address client, address serviceProvider, uint256 totalAmount, uint8 status, string termsHash, uint256 completedMilestones, uint256 createdAt)",
    "function getMilestone(uint256 _agreementId, uint256 _milestoneIndex) view returns (string description, uint256 amount, bool completed, uint256 deadline)",
    "function paymaster() view returns (address)",
    
    // Write functions
    "function createAgreement(address serviceProvider, string calldata termsHash, string[] calldata milestoneDescriptions, uint256[] calldata milestoneAmounts, uint256[] calldata milestoneDealines) payable",
    "function completeBatchMilestones(uint256 _agreementId, uint256[] calldata _milestoneIndices)",
    "function initiateDispute(uint256 _agreementId)",
    
    // Events
    "event AgreementCreated(uint256 id, address client, address serviceProvider, uint256 totalAmount)",
    "event MilestoneCompleted(uint256 agreementId, uint256 milestoneIndex)",
    "event AgreementDisputed(uint256 agreementId, address initiator)",
    "event AgreementCompleted(uint256 agreementId)",
    "event FundsReleased(uint256 agreementId, address to, uint256 amount)",
    "event BatchMilestonesCompleted(uint256 agreementId, uint256[] milestoneIndices)"
]); 