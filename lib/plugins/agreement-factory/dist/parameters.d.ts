import * as _goat_sdk_core from '@goat-sdk/core';
import { z } from 'zod';

declare const DeployAgreementPairParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    minGasToComplete: z.ZodDefault<z.ZodString>;
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
declare const CreateAgreementParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
    serviceProvider: z.ZodString;
    termsHash: z.ZodString;
    milestoneDescriptions: z.ZodArray<z.ZodString, "many">;
    milestoneAmounts: z.ZodArray<z.ZodString, "many">;
    milestoneDealines: z.ZodArray<z.ZodString, "many">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    contractAddress: string;
    serviceProvider: string;
    termsHash: string;
    milestoneDescriptions: string[];
    milestoneAmounts: string[];
    milestoneDealines: string[];
}, {
    value: string;
    contractAddress: string;
    serviceProvider: string;
    termsHash: string;
    milestoneDescriptions: string[];
    milestoneAmounts: string[];
    milestoneDealines: string[];
}>>;
declare class CreateAgreementParameters extends CreateAgreementParameters_base {
}
declare const CompleteBatchMilestonesParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
    agreementId: z.ZodString;
    milestoneIndices: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
    agreementId: string;
    milestoneIndices: number[];
}, {
    contractAddress: string;
    agreementId: string;
    milestoneIndices: number[];
}>>;
declare class CompleteBatchMilestonesParameters extends CompleteBatchMilestonesParameters_base {
}
declare const InitiateDisputeParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
    agreementId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
    agreementId: string;
}, {
    contractAddress: string;
    agreementId: string;
}>>;
declare class InitiateDisputeParameters extends InitiateDisputeParameters_base {
}
declare const GetAgreementParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
    agreementId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
    agreementId: string;
}, {
    contractAddress: string;
    agreementId: string;
}>>;
declare class GetAgreementParameters extends GetAgreementParameters_base {
}
declare const GetMilestoneParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
    agreementId: z.ZodString;
    milestoneIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
    agreementId: string;
    milestoneIndex: number;
}, {
    contractAddress: string;
    agreementId: string;
    milestoneIndex: number;
}>>;
declare class GetMilestoneParameters extends GetMilestoneParameters_base {
}
declare const GetNextAgreementIdParameters_base: _goat_sdk_core.ToolParametersStatic<z.ZodObject<{
    contractAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contractAddress: string;
}, {
    contractAddress: string;
}>>;
declare class GetNextAgreementIdParameters extends GetNextAgreementIdParameters_base {
}

export { CompleteBatchMilestonesParameters, CreateAgreementParameters, DeployAgreementPairParameters, GetAgreementParameters, GetDeployedContractByIndexParameters, GetMilestoneParameters, GetNextAgreementIdParameters, InitiateDisputeParameters, IsContractDeployedParameters };
