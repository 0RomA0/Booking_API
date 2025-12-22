import createHttpError from 'http-errors';
import {
  createBooking,
  getBooking,
  deleteBooking,
  updateBooking,
} from '../services/bookings.js';

export async function createBookingController(req, res) {
  const booking = await createBooking({
    client: req.user.id,
    business: req.body.business,
    date: req.body.date,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a booking!',
    data: booking,
  });
}

export async function getBookingController(req, res) {
  const booking = await getBooking({
    clientId: req.user.id,
  });

  res.status(200).json({
    status: 200,
    data: booking,
  });
}

export async function patchBookingController(req, res) {
  const { id } = req.params;
  const updatedBooking = await updateBooking({
    bookingId: id,
    clientId: req.user.id,
    update: req.body,
  });

  if (!updatedBooking) {
    throw createHttpError(404, 'Booking not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a booking!`,
    data: updatedBooking,
  });
}

export async function deleteBookingController(req, res) {
  const { id } = req.params;
  const deletedBooking = await deleteBooking({
    bookingId: id,
    clientId: req.user.id,
  });

  if (deletedBooking === null) {
    throw createHttpError(404, 'Booking not found');
  }

  res.status(204).send();
}
