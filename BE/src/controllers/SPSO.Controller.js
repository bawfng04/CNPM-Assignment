const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService.js");
const models = require("../models/auth.Model.js");
const sendMail = require("../provider.js");
const Mail = require("../constant.js");
const { StatusCodes } = require("http-status-codes");

async function getPrinter(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getPrinter());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}
async function create(req, res) {
  try {
    // res.status(StatusCodes.CREATED).json(await models.create(req.body));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

module.exports = { getPrinter, create };
