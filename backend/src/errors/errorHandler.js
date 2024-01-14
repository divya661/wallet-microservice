const CustomError = require("./customError");

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    const { statusCode, category, message } = err;

    if (statusCode >= 500) {
      // Log server errors
      console.error(`[${category}] ${message}`);
    }

    return res.status(statusCode).json({ error: message });
  }

  // Handle other types of errors or unexpected errors
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorHandler;
