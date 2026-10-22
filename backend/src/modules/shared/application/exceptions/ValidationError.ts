import type Joi from "joi";
import ApplicationException from "./ApplicationException.ts";

export default class ValidationError extends ApplicationException {
    public error: Joi.ValidationError
    
    constructor(error: Joi.ValidationError) {
        super("Validation Error", 422)

        this.error = error
    }
}