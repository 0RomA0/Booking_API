import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '1d' },
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const logInUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  console.log(user);
  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  const correctPassword = await bcrypt.compare(password, user.password);

  if (correctPassword !== true) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '1d' },
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};
