import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts";
import { updateProduct, type TProductUpdatePayload } from "../../infrastructures/repositories/productRepository.ts";

const updateProductUsecase = async (id: number, payload: TProductUpdatePayload) => {
    const res = await updateProduct(id, payload)

    if (!res) throw new ItemNotFoundError("Product")

    return res
}

export default updateProductUsecase