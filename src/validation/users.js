import Joi from 'joi';

export const createUsersSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `"name" must be a string`,
    'string.min': `"name" should have a minimum length of 3`,
    'any.required': `"name" is a required field`,
  }),

  email: Joi.string()
    .email()
    .messages({ 'string.email': `"email" must be a valid email` }),

  phoneNumber: Joi.string()
    .min(13)
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': `"phoneNumber" must be in the format +380XXXXXXXXX`,
      'any.required': `"phoneNumber" is a required field`,
    }),

  role: Joi.string().valid('client', 'business').required(),

  businessName: Joi.when('role', {
    is: 'business',
    then: Joi.string().min(2).required(),
    otherwise: Joi.forbidden(),
  }),
});

export const updateUsersSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': `"name" must be a string`,
    'string.min': `"name" should have a minimum length of 3`,
  }),

  email: Joi.string()
    .email()
    .messages({ 'string.email': `"email" must be a valid email` }),

  phoneNumber: Joi.string()
    .min(13)
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base': `"phoneNumber" must be in the format +380XXXXXXXXX`,
    }),

  businessName: Joi.string().min(2),
}).min(1);
