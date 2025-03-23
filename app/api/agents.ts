import { anthropic } from "@ai-sdk/anthropic";
import { ToolSet } from "ai";
import { getAllTools, createBraveWebSearchClient, createSlackClient, createOnchainClient } from "./mcpClients";

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  model: ReturnType<typeof anthropic>;
  getTools: () => Promise<ToolSet>;
  maxSteps: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providerOptions?: any;
}

const researchAgentPrompt = `You are a helpful AI assistant that can search the web to find information.
Use the tools available to you to provide the most helpful and accurate responses.
When searching the web, try to be specific and extract the most relevant information.`;

const slackAgentPrompt = `You are a helpful AI assistant that can interact with Slack.
You can send messages, search messages, and more using the Slack tools.
Be concise and helpful in your responses.`;

const contractsAgentPrompt = `You are a helpful AI assistant specialized in legal contracts.

IMPORTANT WORKFLOW:
1. First, use the Brave web search tool to find relevant legal document templates based on the user's needs.
2. Ask the user for any specific requirements for the contract they need.
3. Search for the most appropriate template for their situation.
4. Once you find a suitable template, ask the user for all necessary information to fill out the template.
5. Collect ALL required information from the user through a series of questions.
6. After gathering all required information, generate the completed contract.
7. Present the final contract to the user in a clear, well-formatted manner.
8. Send a "CONTRACT BEGINS HERE:" message when the contract is generated

Make sure to:
- Be specific in your web searches to find the most relevant legal templates
- Ask clear questions to gather all required information
- Explain any legal terms that might be confusing
- Provide a professional, complete contract as your final output
- Always recommend the user to have the document reviewed by a legal professional
- send a "CONTRACT BEGINS HERE:" message when the contract is generated

Remember: Your goal is to assist users in creating legal documents based on professional templates found through web search, not to provide legal advice.`;

const web3AgentPrompt = `You are a helpful AI assistant that can interact with the web3.
You can send messages, search messages, and more using the web3 tools.
Be concise and helpful in your responses.

also, we deployed this contract on zksync sepolia: 0x4D09Df02d3Ab9566258300F316Ccd760C5a9EbE4

it has a deployAgreementPair function that allows you to deploy a new agreement pair, this is the function signature:
"function deployAgreementPair(uint256 minGasToComplete) public returns (address paymaster, address serviceAgreement)",
`;

const combinedAgentPrompt = `You are a powerful AI assistant that can search the web and interact with Slack.
Use the appropriate tools based on the user's request.
For information retrieval, search the web. For communication tasks, use Slack.`;

const onchainAgentPrompt = `You are a blockchain assistant that can interact with on-chain data and services.
Use the available blockchain tools to help users interact with smart contracts, check balances, and perform other blockchain operations.
Explain blockchain concepts in simple terms and guide users through complex operations step by step.

You have special access to and ownership of an AgreementFactory smart contract deployed on zkSync Sepolia testnet at address ${process.env.ZKSYNC_AGREEMENT_ADDRESS}.
This contract allows for creating and managing blockchain-based agreements between parties.

When users want to interact with the AgreementFactory contract:
1. Help them understand the purpose and capabilities of the contract
2. Guide them through the process of creating new agreements
3. Show them how to check existing agreements and their status
4. Assist with any other operations available through the contract interface

For all blockchain operations, always verify transactions carefully before submission and explain gas costs when relevant.`;

export const agents: Record<string, AgentConfig> = {
  "research": {
    id: "research",
    name: "Research Assistant",
    description: "An agent that can search the web to find information",
    systemPrompt: researchAgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: async () => {
      const braveClient = await createBraveWebSearchClient();
      return await braveClient.tools();
    },
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
  "slack": {
    id: "slack",
    name: "Slack Assistant",
    description: "An agent that can interact with Slack",
    systemPrompt: slackAgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: async () => {
      const slackClient = await createSlackClient();
      return await slackClient.tools();
    },
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
  "contracts-agent": {
    id: "contracts-agent",
    name: "Contracts Agent",
    description: "An agent that can search for legal templates and help users fill them out",
    systemPrompt: contractsAgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: async () => {
      const braveClient = await createBraveWebSearchClient();
      const slackClient = await createSlackClient();
      const combinedTools = {
        ...(await braveClient.tools()),
        ...(await slackClient.tools())
      };

      return combinedTools;
    },
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
  "web3-agent": {
    id: "web3-agent",
    name: "Web3 Agent",
    description: "An agent that can interact with the web3",
    systemPrompt: web3AgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: async () => {
      const web3Tools = await getWeb3Tools();
      return web3Tools;
    },
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
  "combined": {
    id: "combined",
    name: "Combined Assistant",
    description: "An agent that can search the web and interact with Slack",
    systemPrompt: combinedAgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: getAllTools,
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
  "onchain-agent": {
    id: "onchain-agent",
    name: "Onchain Agent",
    description: "An agent that can interact with the blockchain",
    systemPrompt: onchainAgentPrompt,
    model: anthropic("claude-3-7-sonnet-20250219"),
    getTools: async () => {
      const onchainClient = await createOnchainClient();
      return onchainClient;
    },
    maxSteps: 10,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
  },
};

export function getAgentById(id: string): AgentConfig | undefined {
  const agent = agents[id];
  console.log(agent);
  console.log(agent?.description);
  if (agent?.description !== undefined) {
    return agent;
  }
  return undefined;
}

export const defaultAgent = agents["combined"]; 