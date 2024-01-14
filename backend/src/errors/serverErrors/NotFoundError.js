const CustomError = require("../customError");

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404, "serverError");
  }
}

module.exports = NotFoundError;
