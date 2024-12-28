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
  async fetchAllPrinters(req, res, next) {
    // let limit;
    // if (req.params.limit) limit = req.params.limit;
    // else limit = 10;

    try {
      const printerData = await printerService.fetchAllPrinter();
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
  async deletePrinter(req, res) {
    const printID = req.params.printerID;
    try {
      const reponse = await PrinterService.deletePrinter(printID);
      if (reponse.status !== 200) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Error in delet",
          data: null,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          msg: "Delete success",
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
