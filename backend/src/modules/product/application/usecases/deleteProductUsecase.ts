import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts"
import { deleteProduct } from "../../infrastructures/repositories/productRepository.ts"

const deleteProductUsecase = async (id: number) => {
    const res = await deleteProduct(id)

    if (!res) throw new ItemNotFoundError('Product')
}

export default deleteProductUsecase