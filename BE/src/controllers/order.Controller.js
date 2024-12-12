const PrinterService = require("../../database/printerService");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const OrderService = require("../../database/orderService");
const UserService = require("../../database/userService");

class OrderController {
  // [POST] order/create
  // request: printFile (file), userID, printerID, pageSize, doubleSize, numCopy,
  async createOrder(req, res, next) {
    // console.log("Check file: ", req.file);
    const { email, printerID, pageSize, doubleSize, numCopy, num_pages } =
      req.body;
    const userData = await UserService.findByEmail2(email);
    const userID = userData.data;

    const fileName = req.body.fileName;
    const fileType = fileName.split(".").pop();
    const fileSize = req.fileSize;
    let flag = false;
    if (req.body.pageSize === "A3") {
      flag = true;
    }
    console.log(flag);
    try {
      const documentData = await OrderService.createDocument(
        fileName,
        fileType,
        null,
        fileSize
      );
      // console.log(documentData);
      const docsID = documentData.data;
      // console.log("Docs ID: ", docsID);
      let numPage;
      if (doubleSize) {
        numPage = (num_pages * numCopy) / 2;
      } else numPage = num_pages * numCopy;
      // Lấy thời gian hiện tại
      const currentDate = new Date();

      // Tính toán thời gian mới (giữa), tăng thêm 1 giây * pageNum * numCopy
      const adjustedDate = new Date(
        currentDate.getTime() + 1000 * numPage * numCopy
      );
      // Định dạng thời gian theo yêu cầu
      const formattedCurrentDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const formattedAdjustedDate = adjustedDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // Gọi hàm createOrder với các giá trị đã tính toán
      const result = await OrderService.createOrder(
        printerID,
        docsID,
        userID,
        formattedCurrentDate,
        formattedAdjustedDate,
        formattedCurrentDate, // Hoặc tính toán giá trị khác nếu cần
        pageSize,
        numPage,
        numCopy,
        doubleSize
      );
      if (result.status !== 200) {
        res.status(400).json({
          statusCode: 400,
          msg: result.msg,
          data: null,
        });
      } else {
        const student = await UserService.findByID(userID);
        if (!student || student.status !== 200 || !student.data) {
          const error = new Error("Can't find student");
          error.statusCode = 401;
          throw error;
        }
        if (flag) {
          student.data.pages_remaininga3 =
            student.data.pages_remaininga3 - numPage;
          UserService.updateStudent(student.data);
        } else {
          student.data.pages_remaininga4 =
            student.data.pages_remaininga4 - numPage;
          UserService.updateStudent(student.data);
        }
        res.status(200).json({
          statusCode: 200,
          msg: "Create order successfully!",
          data: result.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // [GET] /print/file/:orderID
  // file detaile
  async getOrderPrint(req, res, next) {
    const orderID = req.params.orderId;
    if (!orderID) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Missing orderID",
        data: null,
      });
    }

    try {
      const response = await PrinterService.findOrderByID(orderID);
      if (!response) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Invalid orderID",
          data: null,
        });
      }

      console.log("LOAD FILE: ", response);
      if (response.status === 200) {
        const fileName = response.data.filename;
        const fileType = response.data.filetype;
        let filePath = response.data.filepath;
        // filePath = filePath.replace(/\\/g, '/');
        const file = fs.createReadStream(filePath);
        res.setHeader("Content-Type", `${fileType}`);
        res.setHeader(
          "Content-Disposition",
          'inline; filename="' + fileName + '"'
        );
        file.pipe(res);
      } else {
        return res.status(400).json({
          statusCode: 200,
          msg: "Error in load file",
          data: null,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  async fetchRecentOrder(req, res, next) {
    try {
      const userID = req.params.userID;
      const response = await OrderService.fetchOrderByUserID(userID);
      if (response.status !== 200) {
        res.status(400).json({
          statusCode: 400,
          msg: response.msg,
          data: null,
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          msg: "10 recent orders",
          data: response.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  // [GET] /order/all by email, sort by tme
  async getAllOrders(req, res, next) {
    const { email } = req.body;
    const userData = await UserService.findByEmail2(email);
    if (userData.data === null) {
      res.status(400).json({
        statusCode: 400,
        msg: "Cannot find user by email",
        data: null,
      });
    }
    const userID = userData.data;
    console.log("CHECK userID: ", userID);
    try {
      const result = await OrderService.fetchOrderByUserID(userID);
      // console.log("Check result: ", result);
      if (result.status !== 200) {
        return res.status(400).json({
          statusCode: 400,
          msg: result.msg,
          data: null,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        msg: "Fetch successfully!",
        data: result.data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getOrderByRange(req, res, next) {
    const { startDate, endDate, email } = req.body;
    const userData = await UserService.findByEmail2(email);
    if (userData.data === null) {
      res.status(400).json({
        statusCode: 400,
        msg: "Cannot find user by email",
        data: null,
      });
    }
    const userID = userData.data;
    const startDateTime = new Date(`${startDate}T00:00:00`);
    const endDateTime = new Date(`${endDate}T23:59:59`);
    try {
      const result = await OrderService.filterOrderTimeRange(
        userID,
        startDateTime,
        endDateTime
      );
      if (result.status !== 200) {
        res.status(400).json({
          statusCode: 400,
          msg: result.msg,
          data: null,
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          msg: "Fetch success",
          data: result.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  catch(err) {
    console.log("ERROR");
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}

module.exports = new OrderController();
