const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const { v4: uuidv4, validate } = require("uuid");
const isAuth = require("../middleware/is-Auth");
const authController = require("../controllers/auth.Controller.js");
const validations = require("../validations/auth.Validation.js");
// [POST] /signUp
const verify = require("../middleware/auth.js");

router.post("/register", validations.register, authController.register);
router.post("/login", validations.login, authController.login);
router.get("/verify/:token", authController.verify);
router.get("/", (req, res, next) => {
  res.send("Hello World");
});

// router.use(verify.verifyToken);
router.post("/getIn4", authController.getIn4);
router.post("/update", validations.updateProfile, authController.updateProfile);
router.get("/logout", authController.logout);

module.exports = router;
