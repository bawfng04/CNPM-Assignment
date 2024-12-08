const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const UserService = require("../../database/userService");

async function login(data) {
  try {
    const email = data.email;
    const password = data.password;

    // Kiểm tra nếu email và password không được cung cấp
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }
    console.log(email);
    // Tìm người dùng qua email
    const result = await UserService.findByEmail(email);
    // console.log(result); // Log kết quả để kiểm tra
    if (!result || result.status !== 200 || !result.data) {
      const error = new Error("Wrong email");
      error.statusCode = 401;
      throw error;
    }

    const loadedUser = result.data;

    // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    // Trả về người dùng nếu đăng nhập thành công
    return loadedUser;
  } catch (err) {
    // console.log(err.statusCode);
    throw err;
  }
}

async function register(data) {
  try {
    // console.log(data);
    if (!data.role) data.role = "student";
    data.username = data.username || data.email.split("@")[0];
    // console.log(data.email);
    const existUser = await UserService.checkEmail(data.email);
    if (existUser.data) {
      throw new Error("This email has already existed");
    }
    const hashPassword = await bcrypt.hash(data.password, 12);
    data.password = hashPassword;
    return data;
  } catch (err) {
    throw err;
  }
}
async function verify(data) {
  try {
    const user = await UserService.findByEmail(data.email);
    // console.log(data);
    if (!user.data) {
      // console.log("BAO");
      await UserService.createUser(
        data.username,
        data.password,
        data.email,
        data.role
      );
    }
    return data;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  register,
  login,
  verify,
};
