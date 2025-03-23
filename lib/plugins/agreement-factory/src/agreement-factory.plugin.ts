import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";
import { AgreementFactoryService } from "./agreement-factory.service";
import { ServiceAgreementService } from "./service-agreement.service";
import { DeployAgreementPairParameters } from "./parameters";

export type AgreementFactoryPluginCtorParams = {
    contractAddress: `0x${string}`;
};

export class AgreementFactoryPlugin extends PluginBase<EVMWalletClient> {
    constructor({ contractAddress }: AgreementFactoryPluginCtorParams) {
        const services: Object[] = [
            new AgreementFactoryService({ contractAddress }),
            new ServiceAgreementService()
        ];
        
        super("agreement-factory", services);
    }

    supportsChain = (chain: Chain) => chain.type === "evm";
}

export function agreementFactory({ contractAddress }: AgreementFactoryPluginCtorParams) {
    return new AgreementFactoryPlugin({ contractAddress });
}
