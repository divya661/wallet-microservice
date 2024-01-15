const NotFoundError = require('../errors/serverErrors/NotFoundError');
const InternalServerError = require('../errors/serverErrors/InternalServerError');
const BadRequestError = require('../errors/clientErrors/BadRequestError');
const {
  INTERNAL_SERVER_ERROR,
  UNEXPECTED_SERVER_ERROR
} = require('../constants/errorsConstants');
const { ValidationError } = require('yup');
const ForbiddenError = require('../errors/serverErrors/ForbiddenError');

function handleError (error, res) {
  console.error(error);
  if (error instanceof ValidationError) {
    return res.status(422).json({ errors: error.errors });
  } else if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message });
  } else if (error instanceof BadRequestError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof InternalServerError) {
    console.error(error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  } else if (error instanceof ForbiddenError) {
    console.error(error);
    res.status(403).json({ error: error.message });
  } else {
    // console.error(error);
    res.status(500).json({ error: UNEXPECTED_SERVER_ERROR });
  }
}

module.exports = handleError;
