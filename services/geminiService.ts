import { ChatMessage, TraceStep } from '../types';

export interface AgentReply {
  text: string;
  trace: TraceStep[];
}

/**
 * Sends a message to the resume agent.
 *
 * The model call and the tool loop both run in a Cloudflare Pages Function
 * (`functions/api/chat.ts`), so the API key stays a server-side secret. The
 * trace it returns is the agent's actual tool calls, not a reconstruction.
 */
export const sendChatMessage = async (
  message: string,
  history: Pick<ChatMessage, 'role' | 'text'>[],
): Promise<AgentReply> => {
  let response: Response;

  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.map(({ role, text }) => ({ role, text })),
      }),
    });
  } catch {
    return {
      text: "I couldn't reach the assistant — please check your connection and try again.",
      trace: [],
    };
  }

  const data = (await response.json().catch(() => null)) as
    | { text?: string; error?: string; trace?: TraceStep[] }
    | null;

  if (!response.ok || !data?.text) {
    return {
      text: data?.error ?? 'Something went wrong on my end. Please try again.',
      trace: data?.trace ?? [],
    };
  }

  return { text: data.text, trace: data.trace ?? [] };
};
