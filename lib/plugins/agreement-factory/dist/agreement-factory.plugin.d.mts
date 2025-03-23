import * as _goat_sdk_core from '@goat-sdk/core';
import { PluginBase, Chain } from '@goat-sdk/core';
import { EVMWalletClient } from '@goat-sdk/wallet-evm';

type AgreementFactoryPluginCtorParams = {
    contractAddress: `0x${string}`;
};
declare class AgreementFactoryPlugin extends PluginBase<EVMWalletClient> {
    constructor({ contractAddress }: AgreementFactoryPluginCtorParams);
    supportsChain: (chain: Chain) => chain is _goat_sdk_core.EvmChain;
}
declare function agreementFactory({ contractAddress }: AgreementFactoryPluginCtorParams): AgreementFactoryPlugin;

export { AgreementFactoryPlugin, type AgreementFactoryPluginCtorParams, agreementFactory };
