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

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['client', 'business'],
      default: 'client',
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

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('user', userSchema);
