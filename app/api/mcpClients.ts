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

// Helper function to get all tools
export async function getAllTools() {
  const braveWebSearchMcpClient = await createBraveWebSearchClient();
  const slackMcpClient = await createSlackClient();
  
  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const toolSetSlack = await slackMcpClient.tools();

  return {
    ...toolSetWebSearch,
    ...toolSetSlack,
  };
} 