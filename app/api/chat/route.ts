import { streamText } from "ai";
import { defaultAgent, getAgentById } from "../agents";

export async function POST(req: Request) {
  const { messages, agentId } = await req.json();
  
  const receivedAgent = getAgentById(agentId);
  const agent = receivedAgent ?? defaultAgent;

  if (!agent) {
    return new Response(
      JSON.stringify({ error: `Agent with ID "${agentId}" not found` }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  const tools = await agent.getTools();

  const result = streamText({
    model: agent.model,
    messages,
    providerOptions: agent.providerOptions,
    tools,
    maxSteps: agent.maxSteps,
    toolCallStreaming: true,
    ...(agent.systemPrompt && { 
      system: agent.systemPrompt 
    }),
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}
