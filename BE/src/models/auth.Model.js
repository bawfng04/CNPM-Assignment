const bcrypt = require("bcrypt");
require("dotenv").config();
// const { v4: uuidv4 } = require("uuid");
const UserService = require("../../database/userService");
async function login(data) {
  try {
    const email = data.email;
    const password = data.password;
    let loadedUser;
    UserService.findByEmail(email)
      .then((result) => {
        if (result.status !== 200) {
          const error = new Error("Wrong email");
          error.statusCode = 401;
          throw error;
        }
        loadedUser = result.data;
        return bcrypt.compare(password, loadedUser.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong password");
          error.statusCode = 401;
          throw error;
        }
      });
  } catch (err) {
    throw err;
  }
}

async function register(data) {
  try {
    data.userId = uuidv4();
    let role = data.role || "user";
    let username = data.username || data.email.split("@")[0];

    console.log("Check email: ", data.email);

    const existUser = await UserService.findByEmail(data.email);
    if (existUser.data) {
      throw new Error("This email has already existed");
    }

    const hashPassword = await bcrypt.hash(data.password, 12);
    data.password = hashPassword;

    const newUser = await UserService.createUser(data);
    return newUser;
  } catch (err) {
    throw err;
  }
}
async function verify(data) {
  try {
    const user = await UserService.findByEmail(data.email);
    if (!user) {
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
