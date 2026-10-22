import Joi from "joi"

export const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.empty': 'Email cannot be empty', // Diubah dari email.empty
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'     // Diubah dari email.required
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password cannot be empty', // Mengganti .message() tunggal
            'any.required': 'Password is required'
        })
});