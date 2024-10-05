const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const isAuth = require('../middleware/is-Auth');
const PrinterController = require('../controllers/printer.Controller');

router.get('/orders/:orderId', [
    param('orderId')
        .trim()
        .isLength({ min: 5 })
], PrinterController.getOrderPrint);

router.post('/checkBalance',[
    body('pageNum')
        .trim()
        .isInt({min: 1})
        .withMessage('pageNum MUST BE a number greater than 1'),
    body('pageSize')
        .trim()
        .isLength({min: 1})
        .withMessage('required pageSize')
] , isAuth, PrinterController.checkAccountBalance);

router.get('/', (req, res, next) => {
    res.send("This is printer route");
})

module.exports = router;