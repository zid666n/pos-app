import Joi from "joi";

export const createTransactionSchema = Joi.object({
    payment_method: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Payment method must be a number',
            'number.integer': 'Payment method must be an integer',
            'number.min': 'Payment method is required',
            'any.required': 'Payment method is required'
        }),

    tax: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Tax must be a number',
            'number.min': 'Tax cannot be negative',
            'any.required': 'Tax is required'
        }),

    pay: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Pay amount must be a number',
            'number.min': 'Pay amount cannot be negative',
            'any.required': 'Pay amount is required'
        }),

    items: Joi.array()
        .items(
            Joi.object({
                product_id: Joi.number()
                    .integer()
                    .min(1)
                    .required()
                    .messages({
                        'number.base': 'Product ID must be a number',
                        'number.integer': 'Product ID must be an integer',
                        'number.min': 'Product ID must be at least 1',
                        'any.required': 'Product ID is required'
                    }),

                quantity: Joi.number()
                    .integer()
                    .min(1)
                    .required()
                    .messages({
                        'number.base': 'Quantity must be a number',
                        'number.integer': 'Quantity must be an integer',
                        'number.min': 'Quantity must be at least 1',
                        'any.required': 'Quantity is required'
                    })
            })
        )
        .min(1)
        .required()
        .messages({
            'array.base': 'Items must be an array',
            'array.min': 'Order must contain at least 1 item',
            'any.required': 'Items are required'
        })
});