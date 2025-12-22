import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  logOutUserController,
  logInUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validationBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(logInUserController),
);

router.post('/logout', ctrlWrapper(logOutUserController));

export default router;
