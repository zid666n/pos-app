import { Router } from "express";
import login from "../modules/auth/infrastructures/controllers/authController.ts";

const authRouter = Router()

authRouter.post('/login', login)

export default authRouter