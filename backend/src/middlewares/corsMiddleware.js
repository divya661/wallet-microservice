const { HTTP_METHODS, CORS_HEADERS } = require('../constants/globalConstant');

function corsMiddleware (req, res, next) {
  res.header(CORS_HEADERS.ALLOW_ORIGIN, '*');
  res.header(CORS_HEADERS.ALLOW_METHODS, 'GET, POST, OPTIONS');
  res.header(
    CORS_HEADERS.ALLOW_HEADERS,
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === HTTP_METHODS.OPTIONS) {
    return res.sendStatus(200);
  }

  next();
}

module.exports = corsMiddleware;
