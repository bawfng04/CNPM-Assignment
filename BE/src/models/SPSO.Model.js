const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const UserService = require("../../database/userService");

async function create(data) {
  try {
    data.printerid = uuidv4();
    data.status = "active";
    data.short_description = data.short_description || "Normal";
    const existPrinter = await UserService.findByPrintername(data.printername);
    if (existPrinter.data) {
      throw new Error("This printer has already existed");
    }
    await UserService.createPrinter(
      data.printerid,
      data.printername,
      data.status,
      data.printer_model,
      data.short_description,
      data.location
    );
    return data;
  } catch (err) {
    throw err;
  }
}
module.exports = { create };
