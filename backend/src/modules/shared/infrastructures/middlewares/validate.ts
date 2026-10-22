import type { NextFunction, Response, Request } from "express";
import Joi from "joi"
import ValidationError from "../../application/exceptions/ValidationError.ts";

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = schema.validate(req.body, {abortEarly: false})

    if (error) throw new ValidationError(error)

    next()
}