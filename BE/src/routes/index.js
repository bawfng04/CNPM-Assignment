const authRouter = require('./auth.route');
const printerRouter = require('./printer.route');
// const adminRouter = require('./admin.route.js');
// const sellerRouter = require('./seller.route.js');
// const productRouter = require('./customer.route.js');

const PrinterController = require('../controllers/printer.Controller');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//       cb(null, true);
//     }
//     cb(null, false);
//   }
  
  const uploadDir = path.join(__dirname, '../../uploads');
  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
  }
  const fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + file.originalname);
      }
  })
  
  const upload = multer({
      storage: fileStorage,
      // fileFilter: fileFilter
  });

function route(app) {
    // app.use('/product', productRouter);
    // app.use('/admin', adminRouter);
    // app.use('/customer', customerRouter);
    // app.use('/seller', sellerRouter);

    app.post('/uploads/', upload.single('printFile'), PrinterController.postFile)
    app.use('/print', printerRouter);
    app.use('/', authRouter)
}

module.exports = route;
