import { GoogleGenAI } from "@google/genai";
import { RESUME } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Convert resume object to a string representation for the AI context
const getResumeContext = () => {
  return JSON.stringify(RESUME, null, 2);
};

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendChatMessage = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  if (!aiClient) {
    initializeGemini();
  }
  
  if (!aiClient) {
    return "I'm sorry, I cannot connect to the AI service at the moment (Missing API Key).";
  }

  const systemInstruction = `
    You are an AI assistant representing Omar Masmoudi based on his resume.
    Your goal is to answer questions from recruiters or visitors about Omar's experience, skills, and background.
    
    RESUME CONTEXT:
    ${getResumeContext()}
    
    GUIDELINES:
    1. Answer strictly based on the provided resume context.
    2. Be professional, concise, and polite.
    3. If asked about something not in the resume, state that you don't have that information but emphasize related skills if applicable.
    4. Highlight Omar's Full-Stack expertise (Next.js, Angular, Spring Boot) and AI integrations.
    5. Keep responses relatively short (under 150 words) unless detailed explanation is requested.
    6. Speak in the first person ("I have experience with...") or third person ("Omar has experience with...") as appropriate, but consistency is key. Let's stick to Third Person ("Omar") to be professional.
  `;

  try {
    const model = 'gemini-2.5-flash';
    const response = await aiClient.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: h.parts
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again.";
  }
};