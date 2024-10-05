const { Result } = require('express-validator');
const client = require('./database');
const {v4: uuidv4} = require('uuid')
class PrinterService {
    constructor() {};

    async createOrder(orderID, studentID, printerID, fileName, filePath, fileType, pageNum) {
        return new Promise((resolve, reject) => {
            client.query(
                `INSERT INTO orders(orderID, studentID, printerID, fileName, filePath, fileType, pageNum) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [orderID, studentID, printerID, fileName, filePath, fileType, pageNum],
                (err, res) => {
                    if(err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            msg: "Create successfully!",
                            data: res.rows
                        })
                    }
                } 
            )
        });
    }
    
    async findOrderByID(orderID) {
        return new Promise((resolve, reject) => {
            client.query(`
                SELECT * FROM orders 
                WHERE orderID = $1
                `, [orderID], (err, res) => {
                    if(err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            msg: `File order ${orderID}`,
                            data: res.rows[0]
                        })
                    }
                })
        })
    }

    async fetchOrders(limit = 10) {
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM users LIMIT $1`, 
                [limit],
                (err, res) => {
                    if (err) {
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        });
                    } else {
                        resolve({
                            status: 200,
                            msg: 'Fetch success',
                            data: res.rows
                        });
                    }
                }
            );
        });
    }

   
}



module.exports = new PrinterService;