import { Router } from "express";
import { destroy, index, store, update } from "../modules/category/infrastructures/controllers/categoryController.ts";

const categoryRouter = Router()

categoryRouter.get('/', index)
categoryRouter.post('/', store)
categoryRouter.put('/:id', update)
categoryRouter.delete('/:id', destroy)

export default categoryRouter