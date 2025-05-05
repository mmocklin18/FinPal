import api from "../utils/api";

export const fetchOpenAIResponse = async (prompt: string) => {
  try {
    const response = await api.post("/openai/chat", {prompt}); 
    return response.data.response || "No response from AI"

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Error fetching response";
  }
};
