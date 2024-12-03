const express = require("express");
const router = express.Router();
const controllers = require("../controllers/SPSO.Controller.js");
const validations = require("../validations/SPSO.Validation.js");
const verify = require("../middleware/auth.js");
// Manage print system
router.use(verify.verifyTokenAdmin);

// router.get("/", controllers.getPrinter);
router.post("/creatprinter", validations.create, controllers.create);
router.get("/test", (req, res, next) => {
  res.send("Hello World");
});
module.exports = router;
