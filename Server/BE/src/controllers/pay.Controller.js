const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const PrinterService = require("../../database/printerService");
const UserService = require("../../database/userService");
const PayService = require("../../database/payService");
const { date } = require("joi");
const PRICE_PER_PAGE_A4 = 500;

class PayController {
  constructor() {}

  changeToA4NumPage(pageSize, numPage, doubleSide = false) {
    const temp = +pageSize.slice(1);
    console.log("temp: ", temp);
    const x = 4 - +temp;
    const res = +numPage * Math.pow(2, x);
    if (doubleSide) return res / 2;
    return res;
  }

  async BuyPages(req, res) {
    const sotien =
      req.body.A4 * PRICE_PER_PAGE_A4 + req.body.A3 * 2 * PRICE_PER_PAGE_A4; // Tính số tiền
    const noidung = encodeURIComponent("Thanh toan mua trang in"); // Mã hóa nội dung để phù hợp với URL
    const qr = `https://img.vietqr.io/image/970436-1046583393-compact2.png?amount=${sotien}&addInfo=${noidung}&accountName=Thanh%20toan%20mua%20giay`;

    try {
      // Gửi về frontend cả số tiền và mã QR URL
      res.json({
        total: sotien,
        qrUrl: qr, // Gửi URL của mã QR về frontend
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi tạo mã QR");
    }
  }
  async SuccessBuyPages(req, res) {
    try {
      const email = req.body.email;
      const A4 = Number(req.body.A4);
      const A3 = Number(req.body.A3);
      const number = A4 + 2 * A3;

      // Tìm người dùng qua email
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

      // Cập nhật số trang còn lại
      student.data.pages_remaininga4 += A4;
      student.data.pages_remaininga3 += A3;

      // Lưu người dùng sau khi cập nhật
      const updateResult = await UserService.updateStudent(student.data);
      if (updateResult.status !== 200) {
        const error = new Error("Failed to update student pageNum");
        error.statusCode = 500;
        throw error;
      }

      // Trả về phản hồi thành công
      res.status(200).json({
        message: "Successfully updated student pages",
        data: student.data,
      });
    } catch (err) {
      console.error("Error in SuccessBuyPages:", err);
      res.status(err.statusCode || 500).json({
        error: err.message,
        stack: err.stack,
      });
    }
  }
  async TotalPage(req, res) {
    try {
      const email = req.body.email;
      // Tìm người dùng qua email
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

      // Trả về phản hồi thành công
      res.status(200).json({
        message: "Successfully",
        data: {
          pages_remainingA4: student.data.pages_remaininga4,
          pages_remainingA3: student.data.pages_remaininga3,
        },
      });
    } catch (err) {
      console.error("Error :", err);
      res.status(err.statusCode || 500).json({
        error: err.message,
        stack: err.stack,
      });
    }
  }
}

module.exports = new PayController();
