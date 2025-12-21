import { Router } from 'express';
import usersRouter from './users.js';
import bookingRouter from './bookings.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);

router.use('/booking', bookingRouter);

export default router;
