
const PrinterService = require('../../database/printerService');
const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

class OrderController {
    // [POST] order/create
    // request: printFile (file), userID, printerID, pageSize, double_sided, numCopy, 
    async createOrder(req, res, next) {
        console.log("Check file: ", req.file);
        if (!req.file) {
            return res.status(400).json({
                statusCode: 400,
                msg: "Error in uploaded file!",
                data: null,
            });
        }
        // const { userID, printerID, pageSize, double_sided, numCopy } = req.body;
        
        // const fileSize = req.file.fileSize;
        let filePath = req.file.path;
        filePath = filePath.replace(/\\/g, "/");
        let pageNum = 1;
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
        const fileName = Buffer.from(req.file.originalname, "latin1").toString(
            "utf8"
        );
        const fileType = req.file.mimetype;
        // try {
        //     // const data = await PrinterService.createOrder(orderId, studentID, printerID, fileName, filePath, fileType, pageNum);
        //     const data = await PrinterService.createOrder(
        //         orderId,
        //         studentID,
        //         printerID,
        //         fileName,
        //         filePath,
        //         fileType,
        //         pageNum,
        //         pageSize,
        //         pageSide,
        //         new Date(),
        //         new Date()
        //     );
        //     console.log("Check respone: ", data);
        //     if (data.status !== 200) {
        //         return res.status(data.status).json({
        //             statusCode: data.status,
        //             ...data,
        //         });
        //     } else {
        //         // const orderData = await 
        //         // return res.status(data.status).json({
        //         // statusCode: data.status,
        //         // ...data,
        //         // });
        //     }
        // } catch (err) {
        //     next(err);
        // }
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


    // [GET] /order/all
    async getAllOrders(req, res, next) { }

    catch(err) {
        const newErr = new Error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message,
            stack: newErr.stack,
        });
    }
}

module.exports = new OrderController();