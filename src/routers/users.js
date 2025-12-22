import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getBusinessUsersController,
  updateUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validationBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createUsersSchema, updateUsersSchema } from '../validation/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllUsersController));
router.post(
  '/',
  authenticate,
  validateBody(createUsersSchema),
  ctrlWrapper(createUserController),
);
router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateUsersSchema),
  ctrlWrapper(updateUserController),
);
router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteUserController),
);

router.get('/business', authenticate, ctrlWrapper(getBusinessUsersController));

export default router;
