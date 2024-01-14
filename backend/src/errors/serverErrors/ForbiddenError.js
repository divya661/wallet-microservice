const CustomError = require("../customError");

class ForbiddenError extends CustomError {
    constructor(message) {
        super(message, 403, "serverError");
    }
}

module.exports = ForbiddenError;
