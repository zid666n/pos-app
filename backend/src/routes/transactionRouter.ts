import { Router } from "express";
import { index, read, store } from "../modules/transaction/infrastructure/controllers/transactionController.ts";
import { validate } from "../modules/shared/infrastructures/middlewares/validate.ts";
import { createTransactionSchema } from "../modules/transaction/infrastructure/validations/createTransactionValidation.ts";

const transactionRouter = Router()

transactionRouter.get('/', index)
transactionRouter.get('/:id', read)
transactionRouter.post('/', validate(createTransactionSchema), store)

export default transactionRouter