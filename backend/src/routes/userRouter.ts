import { Router } from "express";
import { destroy, index, read, store, update } from "../controllers/userController.ts";

const userRouter = Router()

userRouter.get('/', index)
userRouter.get('/:id', read)
userRouter.post('/', store)
userRouter.put('/:id', update)
userRouter.delete('/:id', destroy)

export default userRouter