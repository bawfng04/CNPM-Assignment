// const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserService = require("../../database/userService");
const models = require("../models/auth.Model.js");
const sendMail = require("../provider.js");
const Mail = require("../constant.js");
const { StatusCodes } = require("http-status-codes");
const { boolean } = require("joi");
const { use } = require("../routes/printer.route.js");
const bcrypt = require("bcrypt");
async function register(req, res) {
  try {
    // console.log("haha1");
    // console.log(req.body);
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
    const email = req.body.email;
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
      student: student.data,
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
    const {
      email,
      firstname,
      lastname,
      phonenumber,
      studentID,
      faculty,
      address,
    } = req.body;

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
    user.first_name = firstname || null;
    user.last_name = lastname || null;
    user.phonenumber = phonenumber || null;
    const student = await UserService.findByID(user.id);
    if (!student || student.status !== 200 || !student.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Can't find student",
      });
    }

    student.data.student_id = studentID || null;
    student.data.faculty = faculty || null;
    student.data.address = address || null;
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
async function updatePass(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Kiểm tra nếu email hoặc mật khẩu cũ/mới không được cung cấp
    if (!email || !oldPassword || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Email, oldPassword, and newPassword are required",
      });
    }

    // Tìm người dùng theo email
    const result = await UserService.findByEmail(email);
    if (!result || result.status !== 200 || !result.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Can't find user",
      });
    }

    const user = result.data;

    // Kiểm tra mật khẩu cũ
    const isEqual = await bcrypt.compare(oldPassword, user.password);
    if (!isEqual) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Wrong password",
      });
    }

    // Kiểm tra mật khẩu mới có giống với mật khẩu cũ không
    if (oldPassword === newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "New password cannot be the same as the old password",
      });
    }

    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    // Cập nhật người dùng với mật khẩu mới
    const updateResult = await UserService.updateUser(user);
    if (!updateResult || updateResult.status !== 200) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Failed to update user",
      });
    }

    // Trả về thông báo thành công và thông tin người dùng
    res.status(StatusCodes.OK).json({
      message: "Update Password Successfully",
      user: { email: user.email, updatedAt: user.updatedAt }, // Trả về thông tin người dùng cần thiết
    });
  } catch (err) {
    // Xử lý lỗi tổng thể
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while updating the password",
    });
  }
}

async function checkPage(req, res) {
  const num_pages = req.body.num_pages; // Số trang yêu cầu
  const userID = req.body.userID; // ID người dùng
  let flag = false;

  // Kiểm tra nếu cần xử lý riêng với A3
  if (req.body.A3) {
    flag = true;
  }

  try {
    const student = await UserService.findByID(userID);

    // Kiểm tra nếu không tìm thấy sinh viên
    if (!student || student.status !== 200 || !student.data) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Can't find student",
      });
    }

    // Kiểm tra số trang còn lại
    if (student.data.pages_remaininga4 < num_pages) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Not enough pages remaining A4",
        flag: false,
        pageA4: num_pages - student.data.pages_remaininga4,
      });
    }

    // Kiểm tra điều kiện đặc biệt nếu flag bật (A3)
    if (flag && student.data.pages_remaininga3 < num_pages) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Not enough pages remaining  A3",
        flag: false,
        pageA3: num_pages - student.data.pages_remaininga3,
      });
    }

    // Nếu tất cả điều kiện đều đạt
    return res.status(StatusCodes.OK).json({
      message: "Enough pages remaining",
      flag: true,
    });
  } catch (error) {
    // Xử lý lỗi không mong muốn
    console.error("Error in checkPage:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while processing the request",
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
  checkPage,
  updatePass,
};
