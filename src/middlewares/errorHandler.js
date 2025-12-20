import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.name,
      data: err,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong!',
    error: err.message,
  });
};
