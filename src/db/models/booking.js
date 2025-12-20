import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    business: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('booking', bookingSchema);
