import Joi from "joi";

export const updateCategorySchema = Joi.object({
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