import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class DeployAgreementPairParameters extends createToolParameters(
    z.object({
        minGasToComplete: z.string().describe("The minimum gas required for transactions in the paymaster").default("10000"),
    }),
) {}

export class IsContractDeployedParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("The address of the contract to check deployment status"),
    }),
) {}

export class GetDeployedContractByIndexParameters extends createToolParameters(
    z.object({
        index: z.number().describe("The index of the deployed contract to retrieve"),
    }),
) {}

export class CreateAgreementParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
        serviceProvider: z.string().describe("Address of the service provider"),
        termsHash: z.string().describe("IPFS hash of agreement terms"),
        milestoneDescriptions: z.array(z.string()).describe("Array of milestone descriptions"),
        milestoneAmounts: z.array(z.string()).describe("Array of milestone amounts in wei"),
        milestoneDealines: z.array(z.string()).describe("Array of milestone deadlines as unix timestamps"),
        value: z.string().describe("Total value to send with the transaction in wei, must equal sum of milestoneAmounts"),
    }),
) {}

export class CompleteBatchMilestonesParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
        agreementId: z.string().describe("ID of the agreement"),
        milestoneIndices: z.array(z.number()).describe("Array of milestone indices to mark as completed"),
    }),
) {}

export class InitiateDisputeParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
        agreementId: z.string().describe("ID of the agreement to dispute"),
    }),
) {}

export class GetAgreementParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
        agreementId: z.string().describe("ID of the agreement to retrieve"),
    }),
) {}

export class GetMilestoneParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
        agreementId: z.string().describe("ID of the agreement"),
        milestoneIndex: z.number().describe("Index of the milestone to retrieve"),
    }),
) {}

export class GetNextAgreementIdParameters extends createToolParameters(
    z.object({
        contractAddress: z.string().describe("Address of the service agreement contract"),
    }),
) {} 