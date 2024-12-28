"use strict";

const OpenAI = require("openai");

/**
 * Calls OpenAI ChatGPT API to get a response for a given prompt.
 * @param {string} prompt - The user’s prompt/question
 * @returns {Promise<string>} - The AI’s response
 */
async function getChatGPTResponse(prompt) {
  const openAIApiKey = process.env.OPENAI_API_KEY; // Ensure the API key is set in the environment
  if (!openAIApiKey) {
    throw new Error("Missing OpenAI API key. Ensure OPENAI_API_KEY is set.");
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: openAIApiKey,
  });

  try {
    // Call OpenAI chat completions API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Updated to a valid model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract and return the AI's response
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || error.message || "Unknown error";
    console.error("Error calling ChatGPT API:", error.response?.data || error);
    throw new Error(errorMessage);
  }
}

module.exports = {
  getChatGPTResponse,
};
