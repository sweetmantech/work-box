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
  return agents[id];
}

export const defaultAgent = agents["combined"]; 