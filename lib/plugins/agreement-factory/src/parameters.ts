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