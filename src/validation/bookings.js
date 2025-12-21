import Joi from 'joi';

export const createBookingSchema = Joi.object({
  business: Joi.string().hex().length(24).required().messages({
    'string.base': '"business" must be a string',
    'string.length': '"business" must be a valid ObjectId',
    'any.required': '"business" is required',
  }),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'date.base': '"date" must be a valid date',
      'date.greater': '"date" must be in the future',
      'any.required': '"date" is required',
    }),
});

export const updateBookingSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': '"date" must be in YYYY-MM-DD format',
    }),

  status: Joi.string().valid('active', 'cancelled'),
}).min(1);
