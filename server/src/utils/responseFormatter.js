"use strict";

/**
 * Formats a JSON response for API Gateway.
 * @param {number} statusCode - HTTP status code
 * @param {object} body - Response body object
 * @returns {object} - Formatted response
 */
function formatJSONResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  formatJSONResponse,
};
