
import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createMCPClient, streamText } from "ai";
import { Experimental_StdioMCPTransport } from "ai/mcp-stdio";

export async function POST(req: Request) {
  const { messages } = await req.json();

  //   // Initialize an MCP client to connect to a `stdio` MCP server:
  //   const transport = new Experimental_StdioMCPTransport({
  //     command: "node",
  //     args: ["mcp/web-search/build/index.js"],
  //   });
  //   const clientOne = await experimental_createMCPClient({
  //     transport,
  //   });
  // Alternatively, you can connect to a Server-Sent Events (SSE) MCP server:
  const clientTwo = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/bs1hevm8kn8t98",
    },
  });
  const toolSetOne = await clientTwo.tools();
  const tools = {
    ...toolSetOne,
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
