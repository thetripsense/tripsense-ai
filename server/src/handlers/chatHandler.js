const { getChatGPTResponse } = require("../services/chatService");
const { formatJSONResponse } = require("../utils/responseFormatter");

module.exports.getChatResponse = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const response = await getChatGPTResponse(prompt);
    return formatJSONResponse(200, { response });
  } catch (error) {
    return formatJSONResponse(error.statusCode || 500, {
      message: error.message,
    });
  }
};
