import type { Request, Response } from "express"
import createTransactionUsecase from "../../application/usecases/createTransactionUsecase.ts"
import type { TCreateTransactionPayload } from "../../../shared/infrastructures/services/createTransactionService.ts"
import Midtrans from "../../../../core/payment/Midtrans.ts"

export const store = async (req: Request<{}, {}, TCreateTransactionPayload>, res: Response) => {
    const {
        items,
        order_number,
        payment_method,
        subtotal,
        tax,
        total,
    } = req.body

    // const result = await createTransactionUsecase({
    //     items: items,
    //     order_number: order_number,
    //     payment_method: payment_method,
    //     subtotal: subtotal,
    //     tax: tax,
    //     total: total,
    //     user_id: Number(req.user?.id)
    // })

    return res
        .status(200)
        .json({
            data: {
                item_details: [
                    {

                    }
                ],
                payment_details: {
                    cashReceive: 1000,
                    changes: 0,
                    total: 1000,
                },
                payment_gateway: {
                    token: '',
                    redirect_url: ''
                }
            }
        })
}