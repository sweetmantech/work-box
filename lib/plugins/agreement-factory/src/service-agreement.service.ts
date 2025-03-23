import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { SERVICE_AGREEMENT_ABI } from "./service-agreement-abi";
import { 
    CreateAgreementParameters, 
    CompleteBatchMilestonesParameters,
    InitiateDisputeParameters,
    GetAgreementParameters,
    GetMilestoneParameters,
    GetNextAgreementIdParameters
} from "./parameters";

export class ServiceAgreementService {
    constructor() {}

    @Tool({
        description: "Create a new service agreement with milestones",
    })
    async createAgreement(parameters: CreateAgreementParameters, walletClient: EVMWalletClient) {
        try {
            const hash = await walletClient.sendTransaction({
                to: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "createAgreement",
                args: [
                    parameters.serviceProvider as `0x${string}`,
                    parameters.termsHash,
                    parameters.milestoneDescriptions,
                    parameters.milestoneAmounts.map(amount => BigInt(amount)),
                    parameters.milestoneDealines.map(deadline => BigInt(deadline))
                ],
                value: BigInt(parameters.value),
            });
            
            return {
                transactionHash: hash.hash,
                message: "Agreement creation transaction sent successfully",
            };
        } catch (error) {
            console.error(error);
            throw Error(`Failed to create Agreement: ${error}`);
        }
    }

    @Tool({
        description: "Complete multiple milestones at once for a service agreement",
    })
    async completeBatchMilestones(parameters: CompleteBatchMilestonesParameters, walletClient: EVMWalletClient) {
        try {
            const hash = await walletClient.sendTransaction({
                to: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "completeBatchMilestones",
                args: [
                    BigInt(parameters.agreementId),
                    parameters.milestoneIndices
                ],
            });
            
            return {
                transactionHash: hash.hash,
                message: "Batch milestone completion transaction sent successfully",
            };
        } catch (error) {
            throw Error(`Failed to complete batch milestones: ${error}`);
        }
    }

    @Tool({
        description: "Initiate a dispute for an agreement",
    })
    async initiateDispute(parameters: InitiateDisputeParameters, walletClient: EVMWalletClient) {
        try {
            const hash = await walletClient.sendTransaction({
                to: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "initiateDispute",
                args: [BigInt(parameters.agreementId)],
            });
            
            return {
                transactionHash: hash.hash,
                message: "Dispute initiation transaction sent successfully",
            };
        } catch (error) {
            throw Error(`Failed to initiate dispute: ${error}`);
        }
    }

    @Tool({
        description: "Get detailed information about an agreement",
    })
    async getAgreement(parameters: GetAgreementParameters, walletClient: EVMWalletClient) {
        try {
            const result = await walletClient.read({
                address: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "getAgreement",
                args: [BigInt(parameters.agreementId)],
            });
            
            const agreement = result.value as [string, string, bigint, number, string, bigint, bigint];
            
            // Convert BigInts to strings for JSON serialization
            const formattedAgreement = {
                client: agreement[0],
                serviceProvider: agreement[1],
                totalAmount: agreement[2].toString(),
                status: ["Created", "Ongoing", "Completed", "Disputed", "Cancelled"][Number(agreement[3])],
                termsHash: agreement[4],
                completedMilestones: agreement[5].toString(),
                createdAt: agreement[6].toString(),
            };
            
            return formattedAgreement;
        } catch (error) {
            throw Error(`Failed to get agreement: ${error}`);
        }
    }

    @Tool({
        description: "Get detailed information about a specific milestone",
    })
    async getMilestone(parameters: GetMilestoneParameters, walletClient: EVMWalletClient) {
        try {
            const result = await walletClient.read({
                address: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "getMilestone",
                args: [BigInt(parameters.agreementId), BigInt(parameters.milestoneIndex)],
            });
            
            const milestone = result.value as [string, bigint, boolean, bigint];
            
            // Convert BigInts to strings for JSON serialization
            const formattedMilestone = {
                description: milestone[0],
                amount: milestone[1].toString(),
                completed: milestone[2],
                deadline: milestone[3].toString(),
            };
            
            return formattedMilestone;
        } catch (error) {
            throw Error(`Failed to get milestone: ${error}`);
        }
    }

    @Tool({
        description: "Get the next agreement ID that will be used for the next created agreement",
    })
    async getNextAgreementId(parameters: GetNextAgreementIdParameters, walletClient: EVMWalletClient) {
        try {
            const result = await walletClient.read({
                address: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "nextAgreementId",
            });
            
            return {
                nextAgreementId: (result.value as bigint).toString(),
            };
        } catch (error) {
            throw Error(`Failed to get next agreement ID: ${error}`);
        }
    }

    @Tool({
        description: "Get the status of an agreement",
    })
    async getAgreementStatus(parameters: GetAgreementParameters, walletClient: EVMWalletClient) {
        try {
            const result = await walletClient.read({
                address: parameters.contractAddress as `0x${string}`,
                abi: SERVICE_AGREEMENT_ABI,
                functionName: "getAgreement",
                args: [BigInt(parameters.agreementId)],
            });
            
            const agreement = result.value as [string, string, bigint, number, string, bigint, bigint];
            
            const statusMap = {
                0: "Created",
                1: "Ongoing",
                2: "Completed",
                3: "Disputed",
                4: "Cancelled"
            };
            
            return {
                agreementId: parameters.agreementId,
                status: statusMap[agreement[3] as 0 | 1 | 2 | 3 | 4],
                statusCode: agreement[3],
            };
        } catch (error) {
            throw Error(`Failed to get agreement status: ${error}`);
        }
    }
} 