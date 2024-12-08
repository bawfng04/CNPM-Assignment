const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const schema = Joi.object({
  model: Joi.string().required().trim().strict(),
  brandname: Joi.string().required().trim().strict(),
  campus_name: Joi.string().required().trim().strict(),
  building_name: Joi.string().required().trim().strict(),
  room_number: Joi.string().required().trim().strict(),
  default_num_pages: Joi.number().required().strict(),
  file_types: Joi.string().required().trim().strict(),
});

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
    });
  }
}
module.exports = { create };
