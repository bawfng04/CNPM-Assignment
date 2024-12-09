const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const UserService = require("../../database/userService");

async function create(data) {
  try {
    data.status = "available";
    await UserService.createPrinter(
      data.model,
      data.brand_name,
      data.campus_name,
      data.building_name,
      data.room_number,
      data.status,
      data.default_num_pages,
      data.file_types
    );
    return data;
  } catch (err) {
    throw err;
  }
}
module.exports = { create };
