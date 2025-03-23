import { EVMWalletClient } from '@goat-sdk/wallet-evm';
import { CreateAgreementParameters, CompleteBatchMilestonesParameters, InitiateDisputeParameters, GetAgreementParameters, GetMilestoneParameters, GetNextAgreementIdParameters } from './parameters.mjs';
import '@goat-sdk/core';
import 'zod';

declare class ServiceAgreementService {
    constructor();
    createAgreement(parameters: CreateAgreementParameters, walletClient: EVMWalletClient): Promise<{
        transactionHash: string;
        message: string;
    }>;
    completeBatchMilestones(parameters: CompleteBatchMilestonesParameters, walletClient: EVMWalletClient): Promise<{
        transactionHash: string;
        message: string;
    }>;
    initiateDispute(parameters: InitiateDisputeParameters, walletClient: EVMWalletClient): Promise<{
        transactionHash: string;
        message: string;
    }>;
    getAgreement(parameters: GetAgreementParameters, walletClient: EVMWalletClient): Promise<{
        client: string;
        serviceProvider: string;
        totalAmount: string;
        status: string;
        termsHash: string;
        completedMilestones: string;
        createdAt: string;
    }>;
    getMilestone(parameters: GetMilestoneParameters, walletClient: EVMWalletClient): Promise<{
        description: string;
        amount: string;
        completed: boolean;
        deadline: string;
    }>;
    getNextAgreementId(parameters: GetNextAgreementIdParameters, walletClient: EVMWalletClient): Promise<{
        nextAgreementId: string;
    }>;
    getAgreementStatus(parameters: GetAgreementParameters, walletClient: EVMWalletClient): Promise<{
        agreementId: string;
        status: string;
        statusCode: number;
    }>;
}

export { ServiceAgreementService };
