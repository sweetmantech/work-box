import { experimental_createMCPClient } from "ai";

// Function to create a Brave Web Search MCP client
export async function createBraveWebSearchClient() {
  return await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/bs1hevm8kn8t98",
    },
  });
}

// Function to create a Slack MCP client
export async function createSlackClient() {
  return await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://router.mcp.so/sse/hrqwgum8knwq9f",
    },
  });
}

export async function createMantleClient() {
  return await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: "https://onchain-beryl.vercel.app/sse",
    },
  });
}

// Helper function to get all tools
export async function getAllTools() {
  const braveWebSearchMcpClient = await createBraveWebSearchClient();
  const slackMcpClient = await createSlackClient();
  const mantleMcpClient = await createMantleClient();

  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const toolSetSlack = await slackMcpClient.tools();
  const toolSetMantle = await mantleMcpClient.tools();

  return {
    ...toolSetWebSearch,
    ...toolSetSlack,
    ...toolSetMantle,
  };
} 