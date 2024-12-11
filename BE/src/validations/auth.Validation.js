const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

async function login(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 3,
        tlds: { allow: ["edu", "vn"] },
      })
      .message("Sử dụng email hcmut.edu.vn")
      .trim()
      .strict(),
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

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

async function register(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 3,
        tlds: { allow: ["edu", "vn"] },
      })
      .trim()
      .strict(),
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: Joi.string().optional().valid("student", "SPSO").trim().strict(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    // console.log(arrMessage);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
    });
  }
}

async function updateProfile(req, res, next) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 3,
        tlds: { allow: ["edu", "vn"] },
      })
      .trim()
      .strict(),
    firstname: Joi.string().optional().trim().strict(),
    lastname: Joi.string().optional().trim().strict(),
    phonenumber: Joi.string().optional().min(10).max(11).trim().strict(),
    studentID: Joi.string().optional().trim().strict(),
    faculty: Joi.string().optional().trim().strict(),
    address: Joi.string().optional().trim().strict(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    let newError = new Error(err);
    let arrMessage = [];
    for (let i = 0; i < err.details.length; i++) {
      arrMessage.push(err.details[i].message);
    }
    // console.log(arrMessage);

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: arrMessage,
    });
  }
}

module.exports = { login, register, updateProfile };
