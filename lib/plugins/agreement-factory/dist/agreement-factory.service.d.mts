import { EVMWalletClient } from '@goat-sdk/wallet-evm';
import { DeployAgreementPairParameters } from './parameters.mjs';
import '@goat-sdk/core';
import 'zod';

declare class AgreementFactoryService {
    private contractAddress;
    constructor({ contractAddress }: {
        contractAddress: `0x${string}`;
    });
    deployAgreementPair(parameters: DeployAgreementPairParameters, walletClient: EVMWalletClient): Promise<{
        transactionHash: string;
        message: string;
    }>;
}

export { AgreementFactoryService };
