import type {Request, Response} from "express"
import allCategoryUsecase from "../../application/usecases/allCategoryUsecase.ts"
import createCategoryUsecase from "../../application/usecases/createCategoryUsecase.ts"
import type { TCategoryPayload } from "../repositories/categoryRepository.ts"
import updateCategoryUsecase from "../../application/usecases/updateCategoryUsecase.ts"
import deleteCategoryUsecase from "../../application/usecases/deleteCategoryUsecase.ts"

export const index = async (req: Request, res: Response) => {
    const result = await allCategoryUsecase()

    return res
        .status(200)
        .json({
            data: result,
            total: result.length
        })
}

export const store = async (req: Request, res: Response) => {
    const {name, is_active}: TCategoryPayload = req.body

    const result = await createCategoryUsecase({name: name, is_active: is_active ? true : false})

    return res
        .status(200)
        .json({
            data: result
        })
}

export const update = async (req: Request, res: Response) => {
    const id = (req.params.id as unknown) as number
    const {name, is_active}: TCategoryPayload = req.body

    const result = await updateCategoryUsecase(id, {name: name, is_active: is_active ? true : false})

    return res
        .status(200)
        .json({
            data: result
        })
}

export const destroy = async (req: Request, res: Response) => {
    const id = (req.params.id as unknown) as number

    await deleteCategoryUsecase(id)

    return res
        .status(204)
        .json()
}