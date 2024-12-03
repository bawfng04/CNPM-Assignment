const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const UserService = require("../../database/userService");

async function login(data) {
  try {
    const email = data.email;
    const password = data.password;

    const result = await UserService.findByEmail(email);

    if (result.status !== 200) {
      const error = new Error("Wrong email");
      error.statusCode = 401;
      throw error;
    }
    const loadedUser = result.data;
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    return loadedUser;
  } catch (err) {
    throw err;
  }
}

async function register(data) {
  try {
    data.userId = uuidv4();
    console.log(data.role);
    if (!data.role) data.role = "user";
    data.username = data.username || data.email.split("@")[0];

    // console.log("Check email: ", data.email);

    const existUser = await UserService.findByEmail(data.email);
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
    console.log(data);
    if (!user.data) {
      // console.log("BAO");
      await UserService.createUser(
        data.userId,
        data.username,
        data.password,
        data.email,
        data.role
      );
    }
    return data;
  } catch (err) {
    // throw err;
  }
}
module.exports = {
  register,
  login,
  verify,
};
