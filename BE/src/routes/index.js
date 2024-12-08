const authRouter = require("./auth.route");
const printerRouter = require("./printer.route");
const payRouter = require("./pay.route");
const SPSORouter = require("./SPSO.route");
const orderRouter = require("./order.route");
const OrderController = require('../controllers/order.Controller')

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { required } = require("joi");
const orderController = require("../controllers/order.Controller");

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

function route(app) {
  // app.use('/order', orderRouter);
  app.post("/createOrder", upload.single("printFile"), orderController.createOrder);
  app.use("/print", printerRouter);
  app.use("/pay", payRouter);
  app.use("/admin", SPSORouter);
  app.use("/", authRouter);
}

module.exports = route;
