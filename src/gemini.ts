import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Use your API key from .env.local
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // you can also use gemini-1.5-pro
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function askGemini(question: string) {
  try {
    const res = await model.invoke(question);
    return res.content[0].text;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Something went wrong!";
  }
}
