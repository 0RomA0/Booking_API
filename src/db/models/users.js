import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['client', 'business'],
    },

    businessName: {
      type: String,
      required: function () {
        return this.role === 'business';
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('user', userSchema);
