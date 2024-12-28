"use strict";

const { getChatGPTResponse } = require("../services/chatService");
const { formatJSONResponse } = require("../utils/responseFormatter");

/**
 * Extracts text and JSON object from a response string.
 * @param {string} response - The full response string.
 * @returns {Object} - An object containing the extracted text and JSON object.
 */
const extractTextAndJSON = (response) => {
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = response.match(jsonRegex);

  const jsonObject = match ? JSON.parse(match[1]) : null;
  const text = response.replace(jsonRegex, "").trim(); // Remove the JSON block and keep the text

  return { text, jsonObject };
};

/**
 * Lambda handler for getting a response from ChatGPT.
 * @param {Object} event - The API Gateway event
 * @returns {Object} - The formatted API response
 */
module.exports.getChatResponse = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return formatJSONResponse(400, { message: "Prompt is required." });
    }

    const response = await getChatGPTResponse(prompt);
    const { text, jsonObject } = extractTextAndJSON(response);

    return formatJSONResponse(200, { text, jsonObject });
  } catch (error) {
    console.error("Error in getChatResponse:", error);

    return formatJSONResponse(error.statusCode || 500, {
      message: error.message || "Internal Server Error",
    });
  }
};
