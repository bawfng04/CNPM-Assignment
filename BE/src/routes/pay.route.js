const express = require("express");
const router = express.Router();
const { body, param, checkSchema } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const isAuth = require("../middleware/is-Auth");
const PayController = require("../controllers/pay.Controller");

const verify = require("../middleware/auth.js");
// router.use(verify.verifyToken);

const PayValidation = require("../validations/pay.validation");
const payValidation = require("../validations/pay.validation");

router.post(
  "/checkBalance",
  payValidation.checkBalance,
  isAuth,
  PayController.checkAccountBalance
);
router.post("/TotalPage", PayController.TotalPage);
router.post("/BuyPages", PayController.BuyPages);
router.post("/Update", PayController.SuccessBuyPages);
module.exports = router;
