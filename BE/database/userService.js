const client = require("./database");
const { v4: uuidv4 } = require("uuid");
class UserService {
  constructor() {}
  async createCustomer(studentID) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO customers(stuID) VALUES($1)`,
        [studentID],
        (err, res) => {
          if (err) {
            reject({
              status: 400,
              msg: "Error in create new Student",
              data: null,
            });
          } else {
            resolve({
              status: 200,
              msg: "Create student successfully",
              data: null,
            });
          }
        }
      );
    });
  }

  async createUser(userId, username, password, email, role) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO users( id, username, password, email, role) VALUES ($1, $2, $3, $4, $5)`,
        [userId, username, password, email, role],
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
              data: null,
            });
          }
        }
      );
    });
  }
  async createPrinter(
    printerId,
    printername,
    status,
    printer_model,
    short_description,
    location
  ) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO printers( printerId,
    printername,
    status,
    printer_model,
    short_description,
    location) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          printerId,
          printername,
          status,
          printer_model,
          short_description,
          location,
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
              data: null,
            });
          }
        }
      );
    });
  }

  async fetchUsers(limit = 10) {
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

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      client.query(
        `
                SELECT * FROM users
                WHERE email = $1
            `,
        [email],
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
              data: res.rows[0],
            });
          }
        }
      );
    });
  }
  async findByPrintername(printername) {
    return new Promise((resolve, reject) => {
      client.query(
        `
                SELECT * FROM printers
                WHERE printername = $1
            `,
        [printername],
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
              data: res.rows[0],
            });
          }
        }
      );
    });
  }

  async findByID(id) {
    return new Promise((resolve, reject) => {
      client.query(
        `
                SELECT * FROM students
                WHERE stuID = $1
            `,
        [email],
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
              msg: "Fetch students success",
              data: res.rows[0],
            });
          }
        }
      );
    });
  }
}

module.exports = new UserService();
