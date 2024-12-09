const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const OrderController = require("../controllers/order.Controller");

router.post("/all", OrderController.getAllOrders);
router.post("/all-filter", OrderController.getOrderByRange);
// router.post("/test", OrderController.getAllOrders);


module.exports = router;