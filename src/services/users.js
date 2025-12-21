import { UsersCollection } from '../db/models/users.js';

export const getAllUsers = async () => {
  const users = await UsersCollection.find();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const createUser = async (payload) => {
  const newUser = await UsersCollection.create(payload);
  return newUser;
};

export const updateUser = async (userId, payload) => {
  const updateUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    { new: true, runValidators: true },
  );
  return updateUser;
};

export const deleteUser = async (userId) => {
  const deletedUser = await UsersCollection.findOneAndDelete({ _id: userId });
  return deletedUser;
};

// Get business users

export const getBusinessUsers = async () => {
  const BusinessUsers = await UsersCollection.find({ role: 'business' });
  return BusinessUsers;
};
