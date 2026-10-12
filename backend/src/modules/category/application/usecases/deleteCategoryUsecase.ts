import {deleteCategory} from "../../infrastructures/repositories/categoryRepository.ts"
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts"

const deleteCategoryUsecase = async (id: number): Promise<void> => {
    const res = await deleteCategory(id)

    if (!res) throw new ItemNotFoundError("Category")
}

export default deleteCategoryUsecase