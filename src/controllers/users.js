import createHttpError from 'http-errors';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getBusinessUsers,
  getUserById,
  updateUser,
} from '../services/users.js';

export async function getAllUsersController(req, res) {
  const users = await getAllUsers();

  res.status(200).json({
    data: users,
  });
}

export async function getUserByIdController(req, res) {
  const { id } = req.params;
  const user = await getUserById(id);

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${id}!`,
    data: user,
  });
}

export async function createUserController(req, res) {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a user!',
    data: user,
  });
}

export async function updateUserController(req, res) {
  const { id } = req.params;

  const existingUser = await getUserById(id);

  if (!existingUser) {
    throw createHttpError(404, 'User  not found');
  }

  if (req.body.businessName && existingUser.role !== 'business') {
    throw createHttpError(400, 'Only business users can update businessName');
  }

  const updatedUser = await updateUser(id, req.body);

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: updatedUser,
  });
}

export async function deleteUserController(req, res) {
  const { id } = req.params;

  const deletedUser = await deleteUser(id);

  if (deletedUser === null) {
    throw createHttpError(404, 'User not found');
  }

  res.status(204).send();
}

// Get business users controller

export async function getBusinessUsersController(req, res) {
  const users = await getBusinessUsers();

  res.status(200).json({
    data: users,
  });
}
