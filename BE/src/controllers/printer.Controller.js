const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const PDFDocument = require("pdfkit");
const PrinterService = require('../../database/printerService');
const sharp = require('sharp');

class PrinterController {
    async postFile(req, res, next) {
        console.log('Check body: ', req.body);
        console.log('check stuID: ', req.userId);
        console.log('Check file: ', req.file);
        if(!req.file) {
            return res.status(400).json({
                statusCode: 400,
                msg: 'Error in uploaded file!',
                data: null
            })
        }
        const {studentID, printerID} = req.body;
        // const studentID =  "3bbd7dd8-bc13-48ae-9edf-053b6302af17";
        // const printerID = "3bbd7dd8-bc13-48ae-9edf-053b6302af10";
        
        const orderId = uuidv4();
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileType = req.file.mimetype;
        try {
            const data = await PrinterService.createOrder(orderId, studentID, printerID, fileName, filePath, fileType);
            console.log("Check respone: ", data);
            res.json(data);
        }
        catch(err) {
            next(err);
        }
    }


    async getOrderPrint(req, res, next) {
        const orderID = req.params.orderId;
        console.log("Check order ID: ", orderID);
        try {
            const response = await PrinterService.findOrderByID(orderID);
            if(response.statusCode === 200) {
                const fileName = response.data.filename;
                const fileType = response.data.filetype;
                let filePath = response.data.filepath;
                // filePath = "D:\\CODE SPACE\\Printer-BK\\BE\\uploads\\1727883618001ava.png";
                console.log('Check file: ', response.data);
                
                filePath = filePath.replace(/\\/g, '/');
                console.log('Check file: ', filePath);
                // D:/CODE SPACE/Printer-BK/BE/uploads/1727507845168ask.png
                const file = fs.createReadStream(filePath);
                res.setHeader('Content-Type', `${fileType}`);
                res.setHeader(
                    'Content-Disposition',
                    'inline; filename="' + fileName + '"'
                );
                file.pipe(res);
            }
            else {
                return res.status(400).json({
                    statusCode: 200,
                    msg: "Error in load file",
                    data: null
                })
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new PrinterController;

