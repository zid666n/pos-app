import { Router } from "express";
import login from "../modules/auth/infrastructures/controllers/authController.ts";
import { validate } from "../modules/shared/infrastructures/middlewares/validate.ts";
import { loginSchema } from "../modules/auth/infrastructures/validations/loginValidation.ts";

const authRouter = Router()

authRouter.post('/login', validate(loginSchema), login)

export default authRouter