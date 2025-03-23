import { experimental_createMCPClient } from "ai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PEPE, USDC, erc20 } from "@goat-sdk/plugin-erc20";
import { zksyncSepoliaTestnet } from "viem/chains";
import { agreementFactory } from "../../lib/plugins/agreement-factory";
import { sendETH } from "@goat-sdk/wallet-evm";


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

export async function createOnchainClient() {
  if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error("WALLET_PRIVATE_KEY environment variable is required");
  }

  const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

  const walletClient = createWalletClient({
      account: account,
      transport: http(process.env.RPC_PROVIDER_URL),
      chain: zksyncSepoliaTestnet,
  });

  const plugins = [
    sendETH(),
    erc20({ tokens: [USDC, PEPE] }),
    agreementFactory({
      contractAddress: process.env.ZKSYNC_AGREEMENT_ADDRESS as `0x${string}`
    })
  ];

  return await getOnChainTools({
    wallet: viem(walletClient),
    plugins
  });
}
// Helper function to get all tools
export async function getAllTools() {
  const braveWebSearchMcpClient = await createBraveWebSearchClient();
  const slackMcpClient = await createSlackClient();
  const mantleMcpClient = await createMantleClient();
  const onchainMcpClient = await createOnchainClient();

  const toolSetWebSearch = await braveWebSearchMcpClient.tools();
  const toolSetSlack = await slackMcpClient.tools();
  const toolSetMantle = await mantleMcpClient.tools();
  const toolSetOnchain = onchainMcpClient;
  return {
    ...toolSetWebSearch,
    ...toolSetSlack,
    ...toolSetMantle,
    ...toolSetOnchain,
  };
} 