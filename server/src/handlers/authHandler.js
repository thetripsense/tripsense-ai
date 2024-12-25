"use strict";

const { registerUser, loginUser } = require("../services/authService");
const { formatJSONResponse } = require("../utils/responseFormatter");

module.exports.register = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const user = await registerUser(email, password);
    return formatJSONResponse(201, { user });
  } catch (error) {
    return formatJSONResponse(error.statusCode || 500, {
      message: error.message,
    });
  }
};

module.exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const token = await loginUser(email, password);
    return formatJSONResponse(200, { token });
  } catch (error) {
    return formatJSONResponse(error.statusCode || 500, {
      message: error.message,
    });
  }
};

module.exports.health = async (event) => {
  return "I am ok";
  //   return formatJSONResponse(200, { body: event.body });
};
