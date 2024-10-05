const express = require('express');
const router = express.Router();
const {body, param} = require('express-validator');
const { v4: uuidv4} = require('uuid');
const isAuth = require('../middleware/is-Auth');
const PayController = require('../controllers/pay.Controller');

router.post('/checkBalance',[
    body('pageNum')
        .trim()
        .isInt({min: 1})
        .withMessage('pageNum MUST BE a number greater than 1'),
    body('pageSize')
        .trim()
        .isLength({min: 1})
        .withMessage('required pageSize')
] , isAuth, PayController.checkAccountBalance);


router.post('/payByAccount',[
    body('oderID')
        .isUUID()
        .withMessage('Invalied orderID')
] ,isAuth, PayController.PayByAccount);

module.exports = router;