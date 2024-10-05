const client = require('./database');
const {v4: uuidv4} = require('uuid')
class PayService {
    constructor() {};
    
    async updatedAccountBalance(cusID, newfreePages, newBalance) {
        return new Promise((resolve, reject) => {
            client.query(`
                UPDATE customers
                SET freePageA4=$1, accountBalance=$2
                WHERE cusId=$3
                `, [newfreePages, newBalance, cusID], (err, res) => {
                    if(err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            msg: "Updated AccountBalance successfully!",
                            data: res.rows
                        })
                    }
                })
        })
    }

    async setStatus(orderId, newStatus) {
        client.query(`
            UPDATE orders
            SET status=$1
            WHERE orderID=$2
            `, [newStatus, orderId], (err, res) => {
                if(err) {
                    reject({
                        status: 400,
                        msg: err.message,
                        data: null
                    })
                } else {
                    resolve({
                        status: 200,
                        msg: "Updated order successfully!",
                        data: res.rows
                    })
                }
            })
    }
}



module.exports = new PayService;