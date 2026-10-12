import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts"
import { findProductById } from "../../infrastructures/repositories/productRepository.ts"

const findProductUsecase = async (id: number) => {
    const res = await findProductById(id)

    if (!res) throw new ItemNotFoundError("Product")

    return res
} 

export default findProductUsecase