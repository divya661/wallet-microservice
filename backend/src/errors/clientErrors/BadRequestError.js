const CustomError = require("../customError");

class BadRequestError extends CustomError {
    constructor(message) {
        super(message, 400, "ClientError");
    }
}

module.exports = BadRequestError;
