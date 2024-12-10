const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService.js");
const models = require("../models/SPSO.Model.js");
const { StatusCodes } = require("http-status-codes");
const printerService = require("../../database/printerService.js");
const userService = require("../../database/userService.js");
async function create(req, res) {
  try {
    // console.log(req.body);
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
    const totaluser = await UserService.countAllUsers();
    const totaloder = await printerService.countAllOder();
    if (result.status !== 200) {
      statusCode: result.status, { ...result };
    }
    res.status(200).json({
      statusCode: 200,
      msg: `Fetch users LIMI ${limit}`,
      data: result.data,
      Totaluser: totaluser,
      Totaloder: totaloder,
    });
  } catch (err) {
    next(err);
  }
}
async function getDetail(req, res, next) {
  const userID = req.params.userID;
  try {
    const reponse = await userService.getDetail(userID);
    if (reponse.status !== 200) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Error in getDetail",
        data: null,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        msg: `Detail of user ${userID}`,
        data: reponse.data,
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { create, fetchAllUsers, getDetail };
