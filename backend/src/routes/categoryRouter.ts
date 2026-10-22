import { Router } from "express";
import { destroy, index, store, update } from "../modules/category/infrastructures/controllers/categoryController.ts";
import { validate } from "../modules/shared/infrastructures/middlewares/validate.ts";
import { createCategorySchema } from "../modules/category/infrastructures/validations/createCategoryValidation.ts";
import { updateCategorySchema } from "../modules/category/infrastructures/validations/updateCategoryValidation.ts";

const categoryRouter = Router()

categoryRouter.get('/', index)
categoryRouter.post('/', validate(createCategorySchema), store)
categoryRouter.put('/:id', validate(updateCategorySchema), update)
categoryRouter.delete('/:id', destroy)

export default categoryRouter