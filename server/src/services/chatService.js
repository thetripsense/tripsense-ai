"use strict";

const axios = require("axios");

/**
 * Calls OpenAI ChatGPT API to get a response for a given prompt.
 * @param {string} prompt - The user’s prompt/question
 * @returns {string} - The AI’s response
 */
async function getChatGPTResponse(prompt) {
  const openAIApiKey = process.env.OPENAI_API_KEY; // from serverless.yml environment
  const url = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIApiKey}`,
    },
  };

  try {
    const response = await axios.post(url, requestBody, config);
    // Extract chat content
    return response.data?.choices?.[0]?.message?.content || "";
  } catch (error) {
    // Log or handle error
    console.error("Error calling ChatGPT API:", error);
    throw new Error("Failed to fetch response from ChatGPT");
  }
}

module.exports = {
  getChatGPTResponse,
};
