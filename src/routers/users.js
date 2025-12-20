import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validationBode.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createUsersSchema, updateUsersSchema } from '../validation/users.js';

const router = Router();

router.get('/', ctrlWrapper(getAllUsersController));
router.post(
  '/',
  validateBody(createUsersSchema),
  ctrlWrapper(createUserController),
);
router.patch(
  '/:id',
  isValidId,
  validateBody(updateUsersSchema),
  ctrlWrapper(updateUserController),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteUserController));

export default router;
