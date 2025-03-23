import { experimental_createMCPClient } from "ai";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { zksyncSepoliaTestnet } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { PEPE, USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";

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

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: zksyncSepoliaTestnet,
});

export async function getWeb3Tools() {
  const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [
        sendETH(), // Enable ETH transfers
        erc20({ tokens: [USDC, PEPE] }), // Enable ERC20 token operations
    ],
});

  return tools;
  
}

// Helper function to get all tools
export async function getAllTools() {
  const braveWebSearchMcpClient = await createBraveWebSearchClient();
  const slackMcpClient = await createSlackClient();
  const mantleMcpClient = await createMantleClient();

  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const toolSetSlack = await slackMcpClient.tools();
  const toolSetMantle = await mantleMcpClient.tools();
  const web3Tools = await getWeb3Tools();

  return {
    ...toolSetWebSearch,
    ...toolSetSlack,
    ...toolSetMantle,
    ...web3Tools,
  };
} 