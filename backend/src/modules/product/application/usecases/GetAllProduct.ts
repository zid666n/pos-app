import { allProduct } from "../../infrastructures/repositories/productRepository.ts"

const getAllProduct = async () => {
    const res = await allProduct()

    return res
}

export default getAllProduct