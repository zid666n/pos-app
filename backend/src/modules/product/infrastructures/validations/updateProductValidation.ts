import Joi from "joi";

export const updateProductSchema = Joi.object({
    price: Joi.number()
        .min(500)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.min': 'Price must be at least 500',
            'any.required': 'Price is required'
        }),

    quantity: Joi.number()
        .min(1)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required'
        }),

    name: Joi.string()
        .trim()
        .required()
        .messages({
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required'
        }),

    is_active: Joi.boolean()
        .default(true)
})