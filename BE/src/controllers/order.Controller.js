
const PrinterService = require('../../database/printerService');
const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const OrderService = require('../../database/orderService');
const UserService = require('../../database/userService');

class OrderController {
    // [POST] order/create
    // request: printFile (file), userID, printerID, pageSize, doubleSize, numCopy, 
    async createOrder(req, res, next) {
        // console.log("Check file: ", req.file);
        const {email, printerID, pageSize, doubleSize, numCopy} = req.body;
        const userData = await UserService.findByEmail2(email); 
        const userID = userData.data;
        console.log("Check userID: ", userID);
        if (!req.file) {
            return res.status(400).json({
                statusCode: 400,
                msg: "Error in uploaded file!",
                data: null,
            });
        }
    
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
        const fileSize = req.file.size;

        try {
            const documentData = await OrderService.createDocument(fileName, fileType, filePath, fileSize);
            console.log(documentData);
            const docsID = documentData.data;
            console.log("Docs ID: ", docsID);
            const result = await OrderService.createOrder(printerID, docsID, userID, new Date().toISOString().slice(0, 19).replace('T', ' '), new Date().toISOString().slice(0, 19).replace('T', ' '), new Date().toISOString().slice(0, 19).replace('T', ' '), pageSize, pageNum*numCopy, numCopy, doubleSize);
            if(result.status !== 200) {
                res.status(400).json({
                    statusCode: 400,
                    msg: result.msg,
                    data: null
                })
            } else {
                res.status(200).json({
                    statusCode: 200,
                    msg: "Create order successfully!",
                    data: null
                })
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


    // [GET] /order/all by email, sort by tme
    async getAllOrders(req, res, next) {
        const {email} = req.body;
        const userData = await UserService.findByEmail2(email);
        if(userData.data === null) {
            res.status(400).json({
                statusCode: 400,
                msg: "Cannot find user by email",
                data: null
            })
        }
        const userID = userData.data;
        console.log("CHECK userID: ", userID);
        try {
            const result = await OrderService.fetchOrderByUserID(userID);
            // console.log("Check result: ", result);
            if(result.status !== 200) {
                 return res.status(400).json({
                    statusCode: 400,
                    msg: result.msg,
                    data: null
                })
            }
            return res.status(200).json({
                statusCode: 200,
                msg: "Fetch successfully!",
                data: result.data
            })
        } catch(err) {
            next(err);
        }
     }


    async getOrderByRange(req, res, next) {
        const {startDate, endDate, email} = req.body;
        const userData = await UserService.findByEmail2(email);
        if(userData.data === null) {
            res.status(400).json({
                statusCode: 400,
                msg: "Cannot find user by email",
                data: null
            })
        }
        const userID = userData.data;
        const startDateTime = new Date(`${startDate}T00:00:00`);
        const endDateTime = new Date(`${endDate}T23:59:59`);
        try {
            const result = await OrderService.filterOrderTimeRange(userID, startDateTime, endDateTime);
            if(result.status !== 200) {
                res.status(400).json({
                    statusCode: 400,
                    msg: result.msg,
                    data: null
                })
            } else {
                res.status(200).json({
                    statusCode: 200,
                    msg: "Fetch success",
                    data: result.data
                })
            }
        } catch (err) {
            next(err);
        }

    }

    catch(err) {
        console.log("ERROR")
        const newErr = new Error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message,
            stack: newErr.stack,
        });
    }
}

module.exports = new OrderController();