import type { Request, Response } from "express"
import createTransactionUsecase from "../../application/usecases/createTransactionUsecase.ts"
import type { TCreateTransactionPayload } from "../../../shared/infrastructures/services/createTransactionService.ts"
import getAllTransactionUsecase from "../../application/usecases/getAllTransactionUsecase.ts"
import findTransactionUsecase from "../../application/usecases/findTransactionUsecase.ts"

export const index = async (req: Request, res: Response) => {
    const result = await getAllTransactionUsecase()
    
    return res
        .status(200)
        .json({
            data: result
        })
}

export const read = async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await findTransactionUsecase(Number(id))

    return res
        .status(200)
        .json({
            data: result
        })
}

export const store = async (req: Request<{}, {}, TCreateTransactionPayload>, res: Response) => {
    const {
        items,
        order_number,
        payment_method,
        tax,
        pay
    } = req.body

    const result = await createTransactionUsecase({
        items: items,
        order_number: "",
        payment_method: payment_method,
        tax: tax,
        user_id: Number(req.user?.id),
        pay: Number(pay),
    })

    return res
        .status(200)
        .json({
            data: result
        })
}