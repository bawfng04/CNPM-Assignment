const { Result } = require('express-validator');
const client = require('./database');
const { v4: uuidv4 } = require('uuid')
class PrinterService {
    constructor() { };


    async createPrinter(printerID, pirnterName, brandName, description, model, campus, building, room, status) {
        return new Promise((resolve, reject) => {
            client.query(
                `INSERT INTO printers(printerID, pirnterName, brandName, description, model, campus, building, room, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [printerID, pirnterName, brandName, description, model, campus, building, room, status],
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            msg: "Create printer successfully!",
                            data: res.rows
                        })
                    }
                }
            )
        });
    }

    async fetchAllPrinter(limit, offset) {
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM printers LIMIT $1 OFFSET $2`, [limit, offset],
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            data: res.rows
                        })
                    }
                }
            )
        });
    }

    async countPrinter() {
        return new Promise((resolve, reject) => {
            client.query(
                "SELECT COUNT(*) AS total_printers FROM printers",
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            msg: "Count printer",
                            data: res.rows
                        })
                    }
                }
            )
        })
    }

    async updatePrinterStatus(printerID, status) {
        return new Promise((resolve, reject) => {
            client.query(
                `UPDATE printers
                 SET status = $1
                 WHERE printerID = $2
                `, [status, printerID],
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            data: res.rows
                        })
                    }
                } 
                )
        })
    }

    async getDetail(printerID) {
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM printers WHERE printerID = $1 `, [printerID],
                (err, res) => {
                    if (err) {
                        console.log(err)
                        reject({
                            status: 400,
                            msg: err.message,
                            data: null
                        })
                    } else {
                        resolve({
                            status: 200,
                            data: res.rows
                        })
                    }
                } 
                )
        })
    }
}



module.exports = new PrinterService;