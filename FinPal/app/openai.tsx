const BACKEND_URL = process.env.BACKEND_URL;

export const fetchOpenAIResponse = async (prompt: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/openai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log("Full API Response:", JSON.stringify(data, null, 2));
    return data.response || "No response from AI"

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Error fetching response";
  }
};
