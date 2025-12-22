import { logInUser, registerUser } from '../services/auth.js';

export async function registerUserController(req, res) {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
}

export async function logInUserController(req, res) {
  const user = await logInUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged a user!',
    data: user,
  });
}

export async function logOutUserController(req, res) {
  res.status(204).send();
}
