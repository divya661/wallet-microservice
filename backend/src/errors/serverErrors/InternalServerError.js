const CustomError = require('../customError');

class InternalServerError extends CustomError {
  constructor (message) {
    super(message, 500, 'serverError');
  }
}

module.exports = InternalServerError;
