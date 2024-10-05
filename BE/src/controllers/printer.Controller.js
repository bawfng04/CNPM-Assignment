const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse')
const PrinterService = require('../../database/printerService');
const userService = require('../../database/userService');
const sharp = require('sharp');


class PrinterController {
    async postFile(req, res, next) {
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
        
        let filePath = req.file.path;
        filePath = filePath.replace(/\\/g, '/');
        let pageNum;
        let dataBuffer = fs.readFileSync(filePath);
        pdf(dataBuffer).then(function(data) {
            pageNum = data.numpages;
            console.log(`Number of pages: ${data.numpages}`)
        })
        const orderId = uuidv4();
        // const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileType = req.file.mimetype;

        try {
            const data = await PrinterService.createOrder(orderId, studentID, printerID, fileName, filePath, fileType, pageNum);
            // console.log("Check respone: ", data);
            res.json(data);
        }
        catch(err) {
            next(err);
        }
    }


    async getOrderPrint(req, res, next) {
        const orderID = req.params.orderId;
        if(!orderID) {
            return res.status(400).json({
                statusCode: 400,
                msg: 'Missing orderID',
                data: null
            })
        }
        
        try {
            const response = await PrinterService.findOrderByID(orderID);
            if(!response) {
                return res.status(400).json({
                    statusCode: 400,
                    msg: 'Invalid orderID',
                    data: null
                })
            }
            if(response.statusCode === 200) {
                const fileName = response.data.filename;
                const fileType = response.data.filetype;
                let filePath = response.data.filepath;
                filePath = filePath.replace(/\\/g, '/');
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

    async checkAccountBalance(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            console.log(error);
            throw error;
        }
        res.send('Check Account Balance');
    }

}
module.exports = new PrinterController;

