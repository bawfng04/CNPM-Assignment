const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const OrderController = require('../controllers/order.Controller');

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { required } = require("joi");

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//       cb(null, true);
//     }
//     cb(null, false);
//   }

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, Date.now() + originalName);
  },
});

const upload = multer({
  storage: fileStorage,
  // fileFilter: fileFilter
});

// router.post("/create", upload.single('printFile'), OrderController.createOrder);
// router.post("/all", PayController.BuyPages);
// router.post("/userAll", (req, res, next));


module.exports = router;