const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
async function login(req, res, next) {
  const schema = Joi.object({
    printerName: Joi.string().required().trim().strict(),
    printerAddress: Joi.string().required().trim().strict(),
  });
}
async function create(req, res, next) {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
      stack: newError.stack,
    });
  }
}
