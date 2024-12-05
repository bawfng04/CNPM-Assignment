// const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService");
const models = require("../models/auth.Model.js");
const sendMail = require("../provider.js");
const Mail = require("../constant.js");
const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  try {
    const data = await models.register(req.body);
    const token = jwt.sign(data, process.env.SECRET_TOKEN);
    const subject = "XÁC THỰC TÀI KHOẢN BK_Printing";
    // const htmlContent = `<h1>Click vào link sau để xác thực email</h1>
    // <a href="http://localhost:4000/user/verify/${token}">Xác thực email</a>`;

    const htmlContent = Mail.htmlEmail(token);

    sendMail.sendMail(data.email, subject, htmlContent);

    res.status(StatusCodes.OK).json({ message: "Vui long xac thuc email" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function login(req, res) {
  try {
    const user = await models.login(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        userID: user.id,
        role: user.role,
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: err.message,
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
      .send(Mail.htmlVerify);
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({ message: "Logout success" });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function getIn4(req, res) {
  try {
    const email = JSON.parse(req.body.email);
    const result = await UserService.findByEmail(email);
    if (!result || result.status !== 200 || !result.data) {
      const error = new Error("Can't find user");
      error.statusCode = 401;
      throw error;
    }
    const user = result.data;
    const student = await UserService.findByID(user.id);
    if (!student || student.status !== 200 || !student.data) {
      const error = new Error("Can't find student");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      message: "get Information Successfully",
      user: user,
      studet: student.data,
    });
  } catch (err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}
async function updateProfile(req, res) {
  try {
    const { email, firstname, lastname, phonenumber, studentID } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email is required",
      });
    }

    const result = await UserService.findByEmail(email);
    if (!result || result.status !== 200 || !result.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Can't find user",
      });
    }

    const user = result.data;
    user.firstname = firstname || null;
    user.lastname = lastname || null;
    user.phonenumber = phonenumber || null;

    const student = await UserService.findByID(user.id);
    if (!student || student.status !== 200 || !student.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Can't find student",
      });
    }

    student.data.student_id = studentID || null;

    const updateResultu = await UserService.updateUser(user);
    if (!updateResultu || updateResultu.status !== 200) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to update user",
      });
    }

    const updateResults = await UserService.updateStudent(student.data);
    if (!updateResults || updateResults.status !== 200) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to update student",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Update Information Successfully",
      user: user, // Trả về thông tin đã cập nhật của user
      student: student.data, // Trả về thông tin đã cập nhật của student
    });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while updating profile",
      details: err.message,
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  verify,
  getIn4,
  updateProfile,
};
