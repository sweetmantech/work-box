
import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createMCPClient, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const braveWebSearchMcpClient = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/bs1hevm8kn8t98",
    },
  });
  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const tools = {
    ...toolSetWebSearch,
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
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}
