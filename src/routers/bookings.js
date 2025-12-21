import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createBookingController,
  getBookingController,
  deleteBookingController,
  patchBookingController,
} from '../controllers/bookings.js';

import { validateBody } from '../middlewares/validationBody.js';
import {
  createBookingSchema,
  updateBookingSchema,
} from '../validation/bookings.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/my', authenticate, ctrlWrapper(getBookingController));

router.post(
  '/',
  authenticate,
  validateBody(createBookingSchema),
  ctrlWrapper(createBookingController),
);

router.patch(
  '/:id',
  isValidId,
  authenticate,
  validateBody(updateBookingSchema),
  ctrlWrapper(patchBookingController),
);

router.delete(
  '/:id',
  isValidId,
  authenticate,
  ctrlWrapper(deleteBookingController),
);

export default router;
