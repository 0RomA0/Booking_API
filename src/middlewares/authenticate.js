import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw createHttpError(401, 'No authorization header');
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    throw createHttpError(401, 'Invalid auth format');
  }

  try {
    const payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
    req.user = payload;
    next();
  } catch {
    throw createHttpError(401, 'Invalid token');
  }
};
