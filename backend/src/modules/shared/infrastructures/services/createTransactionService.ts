import Database from "../databases/Database.ts"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError.ts"
import PaymentAdapter from "../../../../core/payment/PaymentAdapter.ts"
import Midtrans from "../../../../core/payment/Midtrans.ts"
import type { TProduct } from "../../../product/infrastructures/repositories/productRepository.ts"
import MidtransClient from "midtrans-client"

export type TCreateTransactionPayload = {
    order_number: string
    user_id: number
    payment_method: string
    subtotal: string
    tax: number
    total: number,
    items: {
        product_id: number,
        quantity: number
    }[]
}

const createTransactionService = async (p: TCreateTransactionPayload) => {
    try {
        await Database.transaction()
    
        const itemDetails: {id: number, name: string, price: number, quantity: number}[] = []

        p.items.map(async product => {
            const res = await Database.query<TProduct|null>(`SELECT * FROM products WHERE id = ?`, [product.product_id])

            if(!res) throw new ItemNotFoundError("Product")

            itemDetails.push({
                id: res.id,
                name: res.name,
                price: res.price,
                quantity: res.quantity
            })
        }) 

        const paymentAdapter = new PaymentAdapter(Midtrans.getInstance())
        const res = await paymentAdapter.createTransaction<MidtransClient.SnapTransactionResponse>({
            itemDetails: itemDetails,
            transactionDetails: {
                gross_amount: p.total
            }
        })

        const result = await Database.insert([
            'order_number',
            'user_id',
            'payment_method',
            'subtotal',
            'tax',
            'total'
        ], [
            p.order_number,
            p.user_id,
            p.payment_method,
            res.grossAmount,
            p.tax,
            res.grossAmount
        ], 'orders')


        
        await Database.commit()
        await Database.release()

        return res
    } catch (error) {
        await Database.rollback()
    }
}

export default createTransactionService