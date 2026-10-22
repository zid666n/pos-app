import { Router } from "express";
import { destroy, index, read, store, update } from "../modules/product/infrastructures/controllers/productController.ts";
import { validate } from "../modules/shared/infrastructures/middlewares/validate.ts";
import { createProductSchema } from "../modules/product/infrastructures/validations/createProductValidation.ts";
import { updateProductSchema } from "../modules/product/infrastructures/validations/updateProductValidation.ts";

const productRouter = Router()

productRouter.get('/', index)
productRouter.get('/:id', read)
productRouter.post('/', validate(createProductSchema), store)
productRouter.put('/:id', validate(updateProductSchema), update)
productRouter.delete('/:id', destroy)

export default productRouter