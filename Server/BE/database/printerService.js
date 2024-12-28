const { Result } = require("express-validator");
const client = require("./database");
const { v4: uuidv4 } = require("uuid");
class PrinterService {
  constructor() {}

  async fetchAllPrinter() {
    return new Promise((resolve, reject) => {
      client.query(`SELECT * FROM printers ORDER BY id`, (err, res) => {
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
        "SELECT COUNT(*) AS total_printers FROM printers WHERE TRIM(status) = 'available'", // Trim status to avoid whitespace issues
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            const count = res.rows[0]
              ? parseInt(res.rows[0].total_printers)
              : 0;
            resolve({
              msg: "Count of available printers",
              data: count,
            });
          }
        }
      );
    });
  }
  async countPrinterDis() {
    return new Promise((resolve, reject) => {
      client.query(
        "SELECT COUNT(*) AS total_printers FROM printers WHERE TRIM(status) = 'disabled'", // Trim status to avoid whitespace issues
        (err, res) => {
          if (err) {
            console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            const count = res.rows[0]
              ? parseInt(res.rows[0].total_printers)
              : 0;
            resolve({
              msg: "Count of available printers",
              data: count,
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
                 WHERE id = $2
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
  async deletePrinter(printerID) {
    return new Promise((resolve, reject) => {
      client.query(
        `DELETE FROM printers
         WHERE id = $1`,
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
              msg: "Printer deleted successfully",
              data: res.rowCount, // Số hàng bị ảnh hưởng
            });
          }
        }
      );
    });
  }
  async getDetail(printerID) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * FROM printers WHERE id = $1 `,
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
  async countAllOder() {
    return new Promise((resolve, reject) => {
      client.query("SELECT COUNT(*) FROM print_job", (err, res) => {
        if (err) {
          reject({
            status: 400,
            msg: err.message,
            data: null,
          });
        } else {
          resolve({
            status: 200,
            msg: "Count success",
            data: res.rows[0].count, // Lấy số lượng bản ghi từ kết quả
          });
        }
      });
    });
  }
}

module.exports = new PrinterService();
