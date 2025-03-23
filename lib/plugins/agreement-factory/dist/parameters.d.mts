import * as _goat_sdk_core from '@goat-sdk/core';
import { z } from 'zod';

declare const DeployAgreementPairParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    minGasToComplete: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    minGasToComplete: string;
}, {
    minGasToComplete?: string | undefined;
}>>;
declare class DeployAgreementPairParameters extends DeployAgreementPairParameters_base {
}
declare const IsContractDeployedParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
}, {
    contractAddress: string;
}>>;
declare class IsContractDeployedParameters extends IsContractDeployedParameters_base {
}
declare const GetDeployedContractByIndexParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    index: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    index: number;
}, {
    index: number;
}>>;
declare class GetDeployedContractByIndexParameters extends GetDeployedContractByIndexParameters_base {
}

export { DeployAgreementPairParameters, GetDeployedContractByIndexParameters, IsContractDeployedParameters };
