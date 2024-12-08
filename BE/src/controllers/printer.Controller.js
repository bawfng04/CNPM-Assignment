const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const PrinterService = require("../../database/printerService");
const userService = require("../../database/userService");
const PayService = require("../../database/payService");
const printerService = require("../../database/printerService");

class PrinterController {
  async createOrder(req, res, next) {
    console.log("Check file: ", req.file);
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Error in uploaded file!",
        data: null,
      });
    }
    const { studentID, printerID } = req.body;
    // const cusID =  "3db7b86a-e72f-4e7d-ae06-e992d7e3be43";
    // const printerID = "3bbd7dd8-bc13-48ae-9edf-053b6302af10";

    let filePath = req.file.path;
    filePath = filePath.replace(/\\/g, "/");
    let pageNum;
    let dataBuffer = fs.readFileSync(filePath);
    if (req.file.mimetype === "application/pdf") {
      pdf(dataBuffer).then(function (data) {
        pageNum = data.numpages;
        console.log(`Number of pages: ${data.numpages}`);
      });
      const dataFile = await pdf(dataBuffer);
      pageNum = dataFile.numpages;
    }

    console.log("CHECK PAGENUM: ", pageNum);
    const orderId = uuidv4();
    // const filePath = req.file.path;
    const fileName = Buffer.from(req.file.originalname, "latin1").toString(
      "utf8"
    );
    const fileType = req.file.mimetype;
    let pageSize = req.body.pageSize;
    if (!pageSize) pageSize = "A4";
    let pageSide = req.body.pageSide;
    if (!pageSide) pageSide = "single";
    try {
      // const data = await PrinterService.createOrder(orderId, studentID, printerID, fileName, filePath, fileType, pageNum);
      const data = await PrinterService.createOrder(
        orderId,
        studentID,
        printerID,
        fileName,
        filePath,
        fileType,
        pageNum,
        pageSize,
        pageSide,
        new Date(),
        new Date()
      );
      console.log("Check respone: ", data);
      if (data.status !== 200) {
        return res.status(data.status).json({
          statusCode: data.status,
          ...data,
        });
      } else {
        return res.status(data.status).json({
          statusCode: data.status,
          ...data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // [GET] /print/orders/:orderID
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

  // [GET] /print/roders
  async getAllOrders(req, res, next) {}

  async fetchAllPrinters(req, res, next) {
    let limit;
    if (req.params.limit) limit = req.params.limit;
    else limit = 10;

    try {
      const printerData = await printerService.fetchAllPrinter(limit);
      const totalPrinterEn = await printerService.countPrinterEn();
      const totalPrinterDis = await printerService.countPrinterDis();

      // const totalPage = Math.ceil(totalPrinter.data[0].total_printers / limit);

      if (!printerData) {
        return res.status(404).json({
          statusCode: 404,
          msg: "No printer ",
          data: null,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        msg: "Fetch all printers",
        data: printerData.data,
        totalPrinterEn: totalPrinterEn,
        totalPrinterDis: totalPrinterDis,
      });
    } catch (err) {
      next(err);
    }
  }

  async getDetail(req, res, next) {
    const printerID = req.params.printerID;
    try {
      const reponse = await printerService.getDetail(printerID);
      if (reponse.status !== 200) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Error in getDetail",
          data: null,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          msg: `Detail of printer ${printerID}`,
          data: reponse.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async changeStatus(req, res, next) {
    const printID = req.params.printerID;
    const status = req.body.status;
    try {
      const reponse = await PrinterService.updatePrinterStatus(printID, status);
      if (reponse.status !== 200) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Error in update",
          data: null,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          msg: "update success",
          data: reponse.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  catch(err) {
    const newErr = new Error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: newErr.stack,
    });
  }
}
module.exports = new PrinterController();
