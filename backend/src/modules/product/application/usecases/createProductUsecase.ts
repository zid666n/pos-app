import { createProduct, type TProductPayload } from "../../infrastructures/repositories/productRepository.ts"

const createProductUsecase = async (payload: TProductPayload) => {
    const result = await createProduct(payload)

    return result
}

export default createProductUsecase