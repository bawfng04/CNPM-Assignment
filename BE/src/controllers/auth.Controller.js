// const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService");
const { models } = require("../models/auth.Model.js");
const { sendMail } = require("../provider.js");
const { htmlVerify, htmlEmail } = require("../constant.js");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  try {
    const data = await models.register(req.body);

    const token = jwt.sign(data, process.env.SECRET_TOKEN);
    const subject = "XÁC THỰC TÀI KHOẢN BK_Printing";
    // const htmlContent = `<h1>Click vào link sau để xác thực email</h1>
    // <a href="http://localhost:4000/user/verify/${token}">Xác thực email</a>`;

    const htmlContent = htmlEmail(token);

    sendMail(data.email, subject, htmlContent);

    res.status(StatusCodes.OK).json({ message: "Vui long xac thuc email" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}
async function login(req, res) {
  try {
    const user = await models.login(req.body);
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userID: loadedUser.id,
        role: loadedUser.role,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    const newErr = new Error(err);
    // console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}
async function verify(req, res) {
  try {
    const user = jwt.verify(req.params.token, process.env.SECRET_TOKEN);
    delete user.iat;
    await models.verify(user);
    res
      .status(StatusCodes.CREATED)
      // .json({ message: "Registered successfully" });
      // .redirect("http://localhost:4000/login");
      .send(htmlVerify);
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
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

module.exports = {
  register,
  login,
  verify,
};
