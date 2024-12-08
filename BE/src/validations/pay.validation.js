const Joi = require("joi");
const {StatusCodes} = require("http-status-codes");

class payValidation {
    checkBalance(req, res, next) {
        const schema = Joi.object({
            pageNum: Joi.number()
                .required
                .length({min: 0})
                .message("pageNum tối thiểu là 1"),
            pageSide: Joi.number()
                .required
                .message("pageSize phải có giá trị"),
            pageSize: Joi.number()
                .required()
                .message("Yêu cầu giá trị cho pageSide")
                .options(["A1", "A2", "A3", "A4", "A5"])
                .message("Loại giấy không được được hỗ trợ theo hệ thống")
            },
           
        )
    }
}


module.exports = new payValidation;