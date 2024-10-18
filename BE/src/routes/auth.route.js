const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const isAuth = require("../middleware/is-Auth");
const authController = require("../controllers/auth.Controller");
const validations = require("../validations/auth.Validation.js");
// [POST] /signUp
router.post("/register", validations.register, authController.register);
router.post("/login", validations.login, authController.login);
router.get("/verify/:token", authController.verify);
// router.get("/users", isAuth, authController.fetchAllUsers);

// router.get("/", (req, res, next) => {
//   res.send("Hello World");
// });

module.exports = router;
