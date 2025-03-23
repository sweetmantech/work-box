import { anthropic } from "@ai-sdk/anthropic";
import { ToolSet } from "ai";
import { getAllTools, createBraveWebSearchClient, createSlackClient } from "./mcpClients";

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

Make sure to:
- Be specific in your web searches to find the most relevant legal templates
- Ask clear questions to gather all required information
- Explain any legal terms that might be confusing
- Provide a professional, complete contract as your final output
- Always recommend the user to have the document reviewed by a legal professional

Remember: Your goal is to assist users in creating legal documents based on professional templates found through web search, not to provide legal advice.`;

const combinedAgentPrompt = `You are a powerful AI assistant that can search the web and interact with Slack.
Use the appropriate tools based on the user's request.
For information retrieval, search the web. For communication tasks, use Slack.`;

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