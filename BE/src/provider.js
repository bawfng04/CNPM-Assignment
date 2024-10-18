const nodeMailer = require("nodemailer");
require("dotenv").config();

const mailHost = "smtp.gmail.com";
const mailPort = 587;

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.adminPassword,
    },
  });

  const options = {
    from: process.env.adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(options);
};
module.exports = { sendMail };
