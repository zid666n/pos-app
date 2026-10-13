import { Router } from "express";
import { destroy, index, read, store, update } from "../modules/product/infrastructures/controllers/productController.ts";

const productRouter = Router()

productRouter.get('/', index)
productRouter.get('/:id', read)
productRouter.post('/', store)
productRouter.put('/:id', update)
productRouter.delete('/:id', destroy)

export default productRouter