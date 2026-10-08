import { Router } from "express";
import login from "../controllers/authController.ts";

const authRouter = Router()

authRouter.post('/login', login)

export default authRouter