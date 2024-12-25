"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const SECRET_KEY = process.env.JWT_SECRET; // from serverless.yml environment

/**
 * Registers a new user in the system.
 * @param {string} email - User's email
 * @param {string} password - User's raw password
 * @returns {object} - The created user object
 */
async function registerUser(email, password) {
  // Check if user exists
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user in DB
  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  await userRepository.createUser(newUser);

  // Return user object without the password
  return {
    email: newUser.email,
    createdAt: newUser.createdAt,
  };
}

/**
 * Logs in an existing user and returns a signed JWT.
 * @param {string} email - User's email
 * @param {string} password - User's raw password
 * @returns {string} - JWT token
 */
async function loginUser(email, password) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    const error = new Error("User does not exist");
    error.statusCode = 404;
    throw error;
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = {
  registerUser,
  loginUser,
};
