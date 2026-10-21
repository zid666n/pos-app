import { Router } from "express";
import { index, store } from "../modules/transaction/infrastructure/controllers/transactionController.ts";

const transactionRouter = Router()

transactionRouter.get('/', index)
transactionRouter.post('/', store)

export default transactionRouter