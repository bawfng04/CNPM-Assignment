const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService.js");
const models = require("../models/SPSO.Model.js");
const { StatusCodes } = require("http-status-codes");

async function getPrinter(req, res) {
  try {
    res.status(StatusCodes.OK).json(await models.getPrinter());
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function create(req, res) {
  try {
    res.status(StatusCodes.CREATED).json(await models.create(req.body));
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function fetchAllUsers(req, res, next) {
  const limit = req.params.limit ? req.params.limit : 10;
  try {
    const result = await UserService.fetchUsers(limit);
    if (result.status !== 200) {
      statusCode: result.status, { ...result };
    }
    res.status(200).json({
      statusCode: 200,
      msg: `Fetch users LIMI ${limit}`,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getPrinter, create, fetchAllUsers };
