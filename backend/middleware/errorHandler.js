import { STATUS_CODES, MESSAGES } from '../config/constants.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const status = err.statusCode || STATUS_CODES.SERVER_ERROR;
  const message = err.message || MESSAGES.SERVER_ERROR;

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
