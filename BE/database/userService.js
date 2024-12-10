const client = require("./database");
const { v4: uuidv4 } = require("uuid");
class UserService {
  constructor() {}

  async createUser(username, password, email, role) {
    return new Promise((resolve, reject) => {
      const userQuery = `
      INSERT INTO users (username, password, email, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
      const userValues = [username, password, email, role];

      client.query(userQuery, userValues, (err, userRes) => {
        if (err) {
          console.error("Error inserting user:", err.message);
          reject({
            status: 400,
            msg: err.message,
            data: null,
          });
        } else {
          const userId = userRes.rows[0].id; // Lấy `id` vừa tạo

          if (role === "student") {
            // Lưu vào bảng `students`
            const studentQuery = `
            INSERT INTO students (id, student_id)
            VALUES ($1, $2)
          `;
            const studentValues = [userId, null];

            client.query(studentQuery, studentValues, (studentErr) => {
              if (studentErr) {
                console.error("Error inserting student:", studentErr.message);
                reject({
                  status: 400,
                  msg: studentErr.message,
                  data: null,
                });
              } else {
                resolve({
                  status: 201,
                  msg: "Student created successfully!",
                  data: {
                    id: userId,
                    username,
                    email,
                    role,
                  },
                });
              }
            });
          } else {
            // Lưu vào bảng `SPSO`
            const spsoQuery = `
            INSERT INTO SPSO (id,status) 
            VALUES ($1, $2)
          `;
            const spsoValues = [userId, "active"];

            client.query(spsoQuery, spsoValues, (spsoErr) => {
              if (spsoErr) {
                console.error("Error inserting into SPSO:", spsoErr.message);
                reject({
                  status: 400,
                  msg: spsoErr.message,
                  data: null,
                });
              } else {
                resolve({
                  status: 201,
                  msg: "SPSO created successfully!",
                  data: {
                    id: userId,
                    username,
                    email,
                    role,
                  },
                });
              }
            });
          }
        }
      });
    });
  }
  async createPrinter(
    model,
    brand_name,
    campus_name,
    building_name,
    room_number,
    status,
    default_num_pages,
    file_types
  ) {
    return new Promise((resolve, reject) => {
      client.query(
        `INSERT INTO printers( model,
    brand_name,
    campus_name,
    building_name,
    room_number,
    status,
    default_num_pages,
    file_types) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          model,
          brand_name,
          campus_name,
          building_name,
          room_number,
          status,
          default_num_pages,
          file_types,
        ],
        (err, res) => {
          if (err) {
            // console.log(err);
            reject({
              status: 400,
              msg: err.message,
              data: null,
            });
          } else {
            resolve({
              status: 200,
              msg: "Create printer successfully!",
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
  async countAllUsers() {
    return new Promise((resolve, reject) => {
      client.query("SELECT COUNT(*) FROM users", (err, res) => {
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
  async checkEmail(email) {
    try {
      const res = await client.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );
      // console.log("Query result:", res);s
      if (res.rowCount === 0) {
        return false; // Email không tồn tại
      }

      return true; // Email tồn tại
    } catch (error) {
      // console.error("Error checking email in database:", error.message);
      throw new Error("Database error while checking email");
    }
  }
  async findByEmail(email) {
    try {
      // console.log(email);
      const res = await client.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );
      if (res.rowCount === 0) {
        return {
          status: 400,
          msg: "Wrong email",
          data: null,
        };
      }
      return {
        status: 200,
        msg: "Fetch success",
        data: res.rows[0], // Trả về thông tin người dùng đầu tiên
      };
    } catch (err) {
      throw err;
    }
  }

  async findByEmail2(email) {
    return new Promise((resolve, reject) => {
      client.query(
        ` SELECT * FROM users
          WHERE email = $1
            `,
        [email],
        (err, res) => {
          if (res.rowCount < 1) {
            reject({
              status: 400,
              msg: "no user",
            });
          } else {
            resolve({
              status: 200,
              msg: "find user",
              data: res.rows[0].id,
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
                WHERE id = $1
            `,
        [id],
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
  async updateUser(user) {
    if (!user || !user.id) {
      throw new Error("User object must have an 'id' property");
    }
    try {
      const query = `
        UPDATE users 
        SET 
          first_name = COALESCE($1, first_name), 
          last_name = COALESCE($2, last_name), 
          phone_number = COALESCE($3, phone_number), 
          email = COALESCE($4, email), 
          username = COALESCE($5, username), 
          password = COALESCE($6, password), 
          avatar_encoded = COALESCE($7, avatar_encoded), 
          role = COALESCE($8, role),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
      `;

      const values = [
        user.first_name !== undefined ? user.first_name : null, // Kiểm tra rõ ràng undefined
        user.last_name !== undefined ? user.last_name : null,
        user.phone_number !== undefined ? user.phone_number : null,
        user.email !== undefined ? user.email : null,
        user.username !== undefined ? user.username : null,
        user.password !== undefined ? user.password : null,
        user.avatar_encoded !== undefined ? user.avatar_encoded : null,
        user.role !== undefined ? user.role : null,
        user.id,
      ];

      const result = await client.query(query, values);

      if (result.rowCount === 0) {
        throw new Error("User not found or no changes made");
      }

      // Trả về thông tin phản hồi chi tiết
      return {
        status: 200,
        message: "User updated successfully",
        updatedFields: {
          // Chỉ trả về các trường được cập nhật
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          email: user.email,
          username: user.username,
          password: user.password,
          avatar_encoded: user.avatar_encoded,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("Error updating user:", error.message);

      // Ném lỗi với thông tin cụ thể hơn
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }
  async updateStudent(student) {
    if (!student || !student.id) {
      throw new Error("Student object must have an 'id' property");
    }

    try {
      const query = `
        UPDATE students
        SET 
          student_id = COALESCE($1, student_id),
          account_balance = COALESCE($2, account_balance),
          account_status = COALESCE($3, account_status),
          pages_remaininga4 = COALESCE($4, pages_remaininga4),
          pages_remaininga3 = COALESCE($5, pages_remaininga3),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
      `;
      const values = [
        student.student_id !== undefined ? student.student_id : null, // Kiểm tra rõ ràng giá trị undefined
        student.account_balance !== undefined ? student.account_balance : 0.0,
        student.account_status !== undefined
          ? student.account_status
          : "active",
        student.pages_remaininga4 !== undefined ? student.pages_remaininga4 : 0,
        student.pages_remaininga3 !== undefined ? student.pages_remaininga3 : 0,

        student.id,
      ];

      // Sử dụng async/await và query của pg để lấy kết quả
      const res = await client.query(query, values);

      if (res.rowCount === 0) {
        throw new Error("Student not found or no changes made");
      }

      return {
        status: 200,
        msg: "Student updated successfully",
        data: student,
      };
    } catch (error) {
      console.error("Error updating student:", error.message);
      throw new Error("Failed to update student");
    }
  }
  async getDetail(userID) {
    return new Promise((resolve, reject) => {
      client.query(
        `SELECT * FROM users WHERE id = $1 `,
        [userID],
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

module.exports = new UserService();
