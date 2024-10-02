const path = require('path')
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const route = require('./routes');

// Config swagger docs
// var options = {
//   swaggerDefinition: {
//     info: {
//       title: "My API",
//       version: "1.0.0",
//       description: "My API for doing cool stuff!",
//     },
//   },
//   apis: [path.join(__dirname, "/routes/*.js")],
// };
// var swaggerSpecs = swaggerJsdoc(options);


const app = express();
const port = 4000;

// app.use(express.urlencoded({
//   extended: true
// }));
// app.use(express.static(path.join(__dirname, '../uploads')))
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
})

// route
route(app);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`)
})
