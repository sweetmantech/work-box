import * as _goat_sdk_core from '@goat-sdk/core';
import { PluginBase, Chain } from '@goat-sdk/core';
import { EVMWalletClient } from '@goat-sdk/wallet-evm';
import { z } from 'zod';

declare const DeployAgreementPairParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    walletClient: z.ZodAny;
    minGasToComplete: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    minGasToComplete: string;
    walletClient?: any;
}, {
    minGasToComplete?: string | undefined;
    walletClient?: any;
}>>;
declare class DeployAgreementPairParameters extends DeployAgreementPairParameters_base {
}
type AgreementFactoryPluginCtorParams = {
    contractAddress: `0x${string}`;
};
declare class AgreementFactoryPlugin extends PluginBase<EVMWalletClient> {
    constructor({ contractAddress }: AgreementFactoryPluginCtorParams);
    supportsChain: (chain: Chain) => chain is _goat_sdk_core.EvmChain;
}
declare function agreementFactory({ contractAddress }: AgreementFactoryPluginCtorParams): AgreementFactoryPlugin;

export { AgreementFactoryPlugin, type AgreementFactoryPluginCtorParams, DeployAgreementPairParameters, agreementFactory };
