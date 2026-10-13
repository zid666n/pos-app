import type {NextFunction, Request, Response} from "express"
import getAllProduct from "../../application/usecases/GetAllProduct.ts"
import findProductUsecase from "../../application/usecases/findProductUsecase.ts"
import type { TProductPayload, TProductUpdatePayload } from "../repositories/productRepository.ts"
import createProductUsecase from "../../application/usecases/createProductUsecase.ts"
import updateProductUsecase from "../../application/usecases/updateProductUsecase.ts"
import deleteProductUsecase from "../../application/usecases/deleteProductUsecase.ts"

export const index = async (req: Request, res: Response) => {
    const result = await getAllProduct()

    return res
        .status(200)
        .json({
            data: result
        })
}

export const read = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.params.id as unknown) as number

    const result = await findProductUsecase(id)

    return res
        .status(200)
        .json({
            data: result
        })
}

export const store = async (req: Request, res: Response) => {
    const {name, category_id, price, quantity, is_active}: TProductPayload = req.body

    const result = await createProductUsecase({
        category_id: category_id,
        name: name,
        price: price,
        quantity: quantity,
        is_active: is_active ?? true
    })

    return res
        .status(200)
        .json({
            data: result
        })
}

export const update = async (req: Request, res: Response) => {
    const id = (req.params.id as unknown) as number
    const {name, price, quantity, is_active}: TProductUpdatePayload = req.body

    const result = await updateProductUsecase(id, {
        name: name,
        price: price,
        quantity: quantity,
        is_active: is_active ?? true
    })

    return res
        .status(200)
        .json({
            data: result
        })
}

export const destroy = async (req: Request, res: Response) => {
    const id = (req.params.id as unknown) as number
    
    await deleteProductUsecase(id)

    return res.status(204).json()
}