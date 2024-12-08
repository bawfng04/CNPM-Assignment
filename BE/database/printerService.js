const { Result } = require("express-validator");
const client = require("./database");
const { v4: uuidv4 } = require("uuid");
class PrinterService {
  constructor() {}

  async createOrder(
    orderID,
    cusID,
    printerID,
    fileName,
    filePath,
    fileType,
    pageNum,
    pageSize = "A4",
    pageSide = "single",
    startPTime,
    endPTime
  ) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO orders(orderID, cusID, printerID, fileName, filePath, fileType, pageNum, pageSize, pageSide, startPTime, endPTime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          orderID,
          cusID,
          printerID,
          fileName,
          filePath,
          fileType,
          pageNum,
          pageSize,
          pageSide,
          startPTime,
          endPTime,
        ],
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              msg: "Create successfully!",
              data: res.rows,
            });
          }
        }
      );
    });
  }

  async findOrderByID(orderID) {
    return new Promise((resolve, reject) => {
      client.query(
        `
                SELECT * FROM orders 
                WHERE orderID = $1
                `,
        [orderID],
        (err, res) => {
          if (err) {
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              msg: `File order ${orderID}`,
              data: res.rows[0],
            });
          }
        }
      );
    });
  }

  async fetchOrders(limit = 10) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * FROM users LIMIT $1`, [limit], (err, res) => {
        if (err) {
          reject({
            status: 400,
            msg: err.message,
            data: null,
          });
        } else {
          resolve({
            status: 200,
            msg: "Fetch success",
            data: res.rows,
          });
        }
      });
    });
  }

  async createPrinter(
    printerID,
    pirnterName,
    brandName,
    description,
    model,
    campus,
    building,
    room,
    status
  ) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO printers(printerID, pirnterName, brandName, description, model, campus, building, room, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          printerID,
          pirnterName,
          brandName,
          description,
          model,
          campus,
          building,
          room,
          status,
        ],
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              msg: "Create printer successfully!",
              data: res.rows,
            });
          }
        }
      );
    });
  }

  async fetchPrinter(limit) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * FROM printers LIMIT $1`, [limit], (err, res) => {
        if (err) {
          reject({
            status: 400,
            msg: err.message,
            data: null,
          });
        } else {
          resolve({
            status: 200,
            msg: "Fetch success",
            data: res.rows,
          });
        }
      });
    });
  }

  async countPrinterEn() {
    return new Promise((resolve, reject) => {
      client.query(
        "SELECT COUNT(*) AS total_printers FROM printers WHERE status = 'available'", // Updated query
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              msg: "Count available printers",
              data: res.rows, // Result will now contain count of printers with status 'available'
            });
          }
        }
      );
    });
  }
  async countPrinterEn() {
    return new Promise((resolve, reject) => {
      client.query(
        "SELECT COUNT(*) AS total_printers FROM printers WHERE status = 'disabled'", // Updated query
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              msg: "Count available printers",
              data: res.rows, // Result will now contain count of printers with status 'available'
            });
          }
        }
      );
    });
  }

  async updatePrinterStatus(printerID, status) {
    return new Promise((resolve, reject) => {
      client.query(
        `UPDATE printers
                 SET status = $1
                 WHERE printerID = $2
                `,
        [status, printerID],
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              data: res.rows,
            });
          }
        }
      );
    });
  }

  async getDetail(printerID) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * FROM printers WHERE printerID = $1 `,
        [printerID],
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              data: res.rows,
            });
          }
        }
      );
    });
  }
}

module.exports = new PrinterService();
