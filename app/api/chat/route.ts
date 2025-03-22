import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createMCPClient, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const braveWebSearchMcpClient = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/a3w8qvm8kot4qz",
    },
  });

  const slackMcpClient = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/hrqwgum8knwq9f",
    },
  });

  const mantleMcpClient = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://onchain-beryl.vercel.app/sse",
    },
  });

  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const toolSetSlack = await slackMcpClient.tools();
  const toolSetMantle = await mantleMcpClient.tools();

  const tools = {
    ...toolSetWebSearch,
    ...toolSetSlack,
    ...toolSetMantle,
  };

  const result = streamText({
    model: anthropic("claude-3-7-sonnet-20250219"),
    messages,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
    tools,
    maxSteps: 11,
    toolCallStreaming: true,
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}
