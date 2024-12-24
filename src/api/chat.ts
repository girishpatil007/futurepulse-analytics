import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handleChatMessage(message: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
}