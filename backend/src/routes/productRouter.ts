import { Router } from "express";
import { index, read } from "../modules/product/infrastructures/controllers/productController.ts";

const productRouter = Router()

productRouter.get('/', index)
productRouter.get('/:id', read)

export default productRouter