import { allCategory } from "../../infrastructures/repositories/categoryRepository.ts"

const allCategoryUsecase = async () => {
    const result = await allCategory()

    return result
}

export default allCategoryUsecase