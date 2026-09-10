import { ChatMessage } from '../types';

/**
 * Sends a message to the resume assistant.
 *
 * The Gemini call happens in a Cloudflare Pages Function (`functions/api/chat.ts`)
 * so the API key stays a server-side secret and is never shipped to the browser.
 */
export const sendChatMessage = async (
  message: string,
  history: Pick<ChatMessage, 'role' | 'text'>[],
): Promise<string> => {
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
    return "I couldn't reach the assistant — please check your connection and try again.";
  }

  const data = (await response.json().catch(() => null)) as
    | { text?: string; error?: string }
    | null;

  if (!response.ok || !data?.text) {
    return data?.error ?? 'Something went wrong on my end. Please try again.';
  }

  return data.text;
};
