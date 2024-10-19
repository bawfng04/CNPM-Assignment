const jwt = require("jsonwebtoken");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  //   console.log(token);
  if (!token)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "You are not login" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    // console.log(verified);
    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token!" });
  }
}

async function verifyTokenAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "You are not login" });

  try {
    // console.log(token);
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    // console.log(verified);
    if (verified.role != "admin")
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You are not admin" });
    req.user = verified;
    next();
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token!" });
  }
}
module.exports = { verifyToken, verifyTokenAdmin };
