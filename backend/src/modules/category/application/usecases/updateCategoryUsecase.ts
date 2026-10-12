import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError.ts";
import { updateCategory, type TCategoryPayload } from "../../infrastructures/repositories/categoryRepository.ts";

const updateCategoryUsecase = async (id: number, payload: TCategoryPayload) => {
    const res = await updateCategory(id, payload)

    if (!res) throw new ItemNotFoundError("Category")

    return res
}

export default updateCategoryUsecase