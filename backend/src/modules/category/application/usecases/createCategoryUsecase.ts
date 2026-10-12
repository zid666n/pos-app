import { createCategory, type TCategoryPayload } from "../../infrastructures/repositories/categoryRepository.ts";

const createCategoryUsecase = async (payload: TCategoryPayload) => {
    const res = await createCategory(payload)

    return res
}

export default createCategoryUsecase