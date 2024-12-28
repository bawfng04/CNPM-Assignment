const client = require("./database");
const { v4: uuidv4 } = require("uuid");

class OrderService {
  constructor() {}

  async createOrder(
    printer_id,
    document_id,
    user_id,
    start_time,
    end_time,
    upload_time,
    page_size,
    pages_printed,
    num_copies,
    double_sided
  ) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO PRINT_JOB (printer_id, document_id, user_id, start_time, end_time, upload_time, page_size, pages_printed, num_copies, double_sided)
                VALUES
                ($1, $2, $3,$4,$5, $6, $7, $8, $9, $10)`,
        [
          printer_id,
          document_id,
          user_id,
          start_time,
          end_time,
          upload_time,
          page_size,
          pages_printed,
          num_copies,
          double_sided,
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
              data: res.rows[0],
            });
          }
        }
      );
    });
  }

  async createDocument(fileName, fileType, filePath, fileSize) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO DOCUMENTS(file_name, file_type, file_path, file_size) VALUES ($1, $2, $3, $4) RETURNING document_id;`,
        [fileName, fileType, filePath, fileSize],
        (err, res) => {
          // console.log("CHECK DOCS RES: ", res);
          if (err || res.rowCount < 1) {
            reject({
              status: 400,
              msg: err.message ? err.message : "no docus",
            });
          } else {
            console.log("Last inserted ID:", res.rows[0].document_id);

            resolve({
              status: 200,
              msg: "Create document success",
              data: res.rows[0].document_id,
            });
          }
        }
      );
    });
  }

  async getLastDocID() {
    client.query(``);
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

  // NEWEST
  async fetchOrderByUserID(userID) {
    return new Promise((resolve, reject) => {
      client.query(
        `
            SELECT p.*, d.*
            FROM documents d 
            JOIN print_job p ON p.document_id = d.document_id
            WHERE p.user_id = $1 
            ORDER BY start_time DESC
            `,
        [userID],
        (err, res) => {
          if (err) {
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          }
          if (res.rowCount < 1) {
            resolve({
              status: 400,
              msg: "No order",
              data: null,
            });
          }
          resolve({
            status: 200,
            msg: "fetch orders",
            data: res.rows,
          });
        }
      );
    });
  }

  async filterOrderTimeRange(userID, startDateTime, endDateTime) {
    return new Promise((resolve, reject) => {
      client.query(
        `
            SELECT p.*, d.*
            FROM documents d 
            JOIN print_job p ON p.document_id = d.document_id
            WHERE p.user_id = $1 AND start_time BETWEEN $2 AND $3
            ORDER BY start_time DESC
            `,
        [userID, startDateTime, endDateTime],
        (err, res) => {
          if (err) {
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          }
          if (res.rowCount < 1) {
            resolve({
              status: 400,
              msg: "No order",
            });
          } else {
            resolve({
              status: 200,
              msg: "fetch orders",
              data: res.rows,
            });
          }
        }
      );
    });
  }

  async fetchLastOrders() {
    return new Promise((resolve, reject) => {
      client.query(
        `
                SELECT * FROM print_job 
                ORDER BY start_time DESC
                LIMIT 10 OFFSET 0;
            `,
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
              msg: "Fetch success",
              data: res.rows,
            });
          }
        }
      );
    });
  }

  async fetchOrders(limit = 10) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * FROM print_job 
                ORDER BY start_time DESC
                LIMIT $1 OFFSET $2;
                `,
        [limit],
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
              msg: "Fetch success",
              data: res.rows,
            });
          }
        }
      );
    });
  }
}

module.exports = new OrderService();
