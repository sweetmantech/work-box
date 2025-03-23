import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { AgreementFactoryService } from "./agreement-factory.service";
import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class DeployAgreementPairParameters extends createToolParameters(
    z.object({
        walletClient: z.any().describe("The EVMWalletClient to use for transaction"),
        minGasToComplete: z.string().describe("The minimum gas required for transactions in the paymaster").default("10000"),
    }),
) {} 

export type AgreementFactoryPluginCtorParams = {
    contractAddress: `0x${string}`;
};

export class AgreementFactoryPlugin extends PluginBase<EVMWalletClient> {
    constructor({ contractAddress }: AgreementFactoryPluginCtorParams) {
        super("agreement-factory", [new AgreementFactoryService({ contractAddress })]);
    }

    supportsChain = (chain: Chain) => chain.type === "evm";
}

export function agreementFactory({ contractAddress }: AgreementFactoryPluginCtorParams) {
    return new AgreementFactoryPlugin({ contractAddress });
}
