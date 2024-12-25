"use strict";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.USERS_TABLE; // from serverless.yml environment

/**
 * Gets a user by email.
 * @param {string} email
 * @returns {object} - The user object, or null if not found
 */
async function getUserByEmail(email) {
  const params = {
    TableName: TABLE_NAME,
    Key: { email },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item || null;
}

/**
 * Creates a new user record in the table.
 * @param {object} user - The user data
 * @returns {object} - The created user
 */
async function createUser(user) {
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };

  await dynamoDB.put(params).promise();
  return user;
}

module.exports = {
  getUserByEmail,
  createUser,
};
