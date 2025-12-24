import { BookingCollection } from '../db/models/bookings.js';
import '../db/models/users.js';

export const createBooking = async (payload) => {
  const newBooking = await BookingCollection.create(payload);
  return newBooking;
};

export const getBooking = async ({ clientId }) => {
  const booking = await BookingCollection.find({ client: clientId })
    .populate('business', 'name email phoneNumber businessName')
    .populate('client', 'name email phoneNumber');
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
