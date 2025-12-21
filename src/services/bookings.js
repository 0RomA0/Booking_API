import { BookingCollection } from '../db/models/bookings.js';

export const createBooking = async (payload) => {
  const newBooking = await BookingCollection.create(payload);
  return newBooking;
};

export const getBooking = async ({ clientId }) => {
  const booking = await BookingCollection.find({ client: clientId });
  return booking;
};

export const updateBooking = async ({ bookingId, clientId, update }) => {
  const updeteBooking = await BookingCollection.findOneAndUpdate(
    {
      _id: bookingId,
      client: clientId,
    },
    update,
    { new: true, runValidators: true },
  );
  return updeteBooking;
};

export const deleteBooking = async ({ bookingId, clientId }) => {
  const deleteBooking = await BookingCollection.findOneAndDelete({
    _id: bookingId,
    client: clientId,
  });
  return deleteBooking;
};
