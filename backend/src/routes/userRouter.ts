import { Router } from "express";
import { destroy, index, read, store, update } from "../modules/user/application/controllers/userController.ts";
import { validate } from "../modules/shared/infrastructures/middlewares/validate.ts";
import { createUserSchema } from "../modules/user/infrastructures/validations/createUserValidation.ts";

const userRouter = Router()

userRouter.get('/', index)
userRouter.get('/:id', read)
userRouter.post('/', validate(createUserSchema), store)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)

export default userRouter