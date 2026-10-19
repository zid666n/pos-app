import { Router } from "express";
import { store } from "../modules/transaction/infrastructure/controllers/transactionController.ts";

const transactionRouter = Router()

transactionRouter.post('/', store)

export default transactionRouter