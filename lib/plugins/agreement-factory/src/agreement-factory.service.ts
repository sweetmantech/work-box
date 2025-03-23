import { Tool } from "@goat-sdk/core";
import { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { AGREEMENT_FACTORY_ABI } from "./abi";
import { DeployAgreementPairParameters } from "./parameters";

export class AgreementFactoryService {
    private contractAddress: `0x${string}`;

    constructor({ contractAddress }: { contractAddress: `0x${string}` }) {
        this.contractAddress = contractAddress;
    }

    @Tool({
        description: "Deploy agreement service contract pair in order to follow provider agreements",
    })
    async deployAgreementPair(walletClient: EVMWalletClient, parameters: DeployAgreementPairParameters) {
        try {
            const hash = await walletClient.sendTransaction({
                to: this.contractAddress,
                abi: AGREEMENT_FACTORY_ABI,
                functionName: "deployAgreementPair",
                args: [BigInt(parameters.minGasToComplete)],
            });
            
            return {
                transactionHash: hash.hash,
                message: "Agreement pair deployment transaction sent successfully",
            };
        } catch (error) {
            throw Error(`Failed to deploy Agreement pair: ${error}`);
        }
    }
} 