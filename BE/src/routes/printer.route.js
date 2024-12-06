const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const isAuth = require('../middleware/is-Auth');
const PrinterController = require('../controllers/printer.Controller');

router.get('/orders/:orderId', PrinterController.getOrderPrint);
// router.post('/create', PrinterController.createNewPrinter);
router.get('/all', PrinterController.fetchAllPrinters);
router.put('/change-status/:printerID', PrinterController.changeStatus);
router.get('/detail/:printerID', PrinterController.getDetail);
router.get('/', (req, res, next) => {
    res.send("This is printer route");
})

module.exports = router;