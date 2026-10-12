import type {NextFunction, Request, Response} from "express"
import getAllProduct from "../../application/usecases/GetAllProduct.ts"
import findProductUsecase from "../../application/usecases/findProductUsecase.ts"

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