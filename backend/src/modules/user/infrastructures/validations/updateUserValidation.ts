import Joi from "joi";

export const updateUserSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),

    name: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required'
        }),

    is_active: Joi.boolean()
        .default(true),
    
    password: Joi.string()
        .messages({
            'string.empty': 'Password cannot be empty',
        })
})
