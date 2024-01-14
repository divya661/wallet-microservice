class CustomError extends Error {
  constructor(message, statusCode, category) {
    super(message);
    this.statusCode = statusCode;
    this.category = category;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports =  CustomError;
