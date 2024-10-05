const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');

const PrinterService = require('../../database/printerService');
const UserService = require('../../database/userService');
const PayService = require('../../database/payService');
const PRICE_PER_PAGE_A4 = 500;

class PayController {
    constructor() {};
    
    changeToA4NumPage(pageSize, numPage, doubleSide = false){
        const temp = + pageSize.slice(1);
        console.log('temp: ', temp);
        const x  = (4 - (+temp));
        const res  = (+numPage)*Math.pow(2, x);
        if(doubleSide) return res/2;
        return res;
    }

    async checkAccountBalance(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            return res.status(400).json({
                statusCode: 400,
                msg: error.data,
                data: null
            })
        }
        const userId = req.userId;
        const role = req.role;
        console.log(`Check id: ${userId}, role: ${role}`);
        if(role !== 'user') {
            return res.status(400).json({
                statusCode: 400,
                msg: 'Admin cannot Print',
                data: null
            })
        }
        const { pageNum, pageSize, pageSide} = req.body;
        const loadedUser = await userService.findByID(userId);
        const freePageA4 = loadedUser.freePageA4;
        const accountBalance = loadedUser.accountBalance;
        const accountBalancePage = loadedUser.accountBalance / PRICE_PER_PAGE_A4;
        const exchangedPages = this.changeToA4NumPage(pageSize, pageNum, pageSize === 'double');
        const paidPage = exchangedPages - freePageA4 - accountBalancePage;
        const price = paidPage*PRICE_PER_PAGE_A4;
        
        if(paidPage <= 0) {
            const temp = freePageA4 - exchangedPages;
            let newFreePageA4;
            let newAccountBalance;
            if(temp >= 0) {
                newFreePageA4 = temp;
                newAccountBalance = accountBalance
            }
            else {
                newFreePageA4 = 0;
                newAccountBalance = accountBalance + (+PRICE_PER_PAGE_A4)*temp;
            }
            return res.status(200).json({
                statusCode: 200,
                msg: 'Enough money',
                data: {
                    newFreePageA4: newFreePageA4,
                    newAccountBalance: newAccountBalance
                }
            })
        } else {
            return res.status(200).json({
                statusCode: 200,
                msg: 'NOT enough money',
                data: {
                    price: price
                }
            })
        }
    }
    async PayByAccount(req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            return res.status(422).json({
                statusCode: 422,
                msg: error.message,
                data: error.data    
            })
        }
        const userID = req.userID;
        const {orderID, newFreePageA4, newAccountBalance} = req.body;
        PayService.updatedAccountBalance(userID,newFreePageA4, newAccountBalance) 
            .then(result => {
                if(result.status !== 200) {
                    return res.status(result.status).json({
                        statusCode: result.status,
                        ... result
                    })
                } else {
                    return PayService.setStatus(orderID, 'accepted')
                }
            })
            .then ((result) => {
                if(result.status !== 200) {
                    return res.status(result.status).json({
                        statusCode: result.status,
                        ... result
                    })
                } else {
                    return res.status(200).json({
                        statusCode: 200,
                        msg: 'Pay by account sucessfully',
                        data: result.data
                    })
                }
            })
            .catch(err => {
                return res.status(400).json({
                    statusCode: 400,
                    msg: 'Pay by account unsucces:' + err.message,
                    data: null
                })
            })
        
    }
}

module.exports = new PayController;