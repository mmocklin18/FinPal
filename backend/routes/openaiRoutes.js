const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const purpose = "Your job is to answer questions related to the user's personal finances and give advice on how to improve their financial situation. Be personable and give clear, concise answers. If you don't know the answer to a question, you can say so and offer to help the user find the information they need. If you need more information to answer a question, you can ask the user for it. If you need to clarify something, you can ask the user for more information. If you need to end the conversation, you can say goodbye and offer to help the user with anything else they need. Now here's their question: \n\n";

// OpenAI Chat API Route
router.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", 
        messages: [{ role: "assistant", content: purpose + req.body.prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

module.exports = router;
