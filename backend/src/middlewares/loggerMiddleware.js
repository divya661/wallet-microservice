const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console()
    // You can add more transports like File, Database, etc. based on your requirements
  ]
});

function logRequest (req, res, next) {
  const { method, url, params, query, body, headers } = req;

  logger.info(`Incoming request: ${method} ${url}`, {
    method,
    url,
    params,
    query,
    body,
    headers
  });

  res.on('finish', () => {
    const { statusCode, statusMessage } = res;

    logger.info(`Response sent: ${method} ${url}`, {
      method,
      url,
      statusCode,
      statusMessage
    });
  });

  next();
}

module.exports = logRequest;
