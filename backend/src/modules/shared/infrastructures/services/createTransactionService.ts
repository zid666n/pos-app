import Database from "../databases/Database.ts"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError.ts"
import Midtrans from "../../../../core/payment/Midtrans.ts"
import type { TProduct } from "../../../product/infrastructures/repositories/productRepository.ts"
import ApplicationException from "../../application/exceptions/ApplicationException.ts"

export type TTransactionResult = {
    item_details: {
        product_id: number,
        name: string,
        quantity: number,
        price: number
    }[]
    ,
    payment_details: {
        cashReceive: number,
        changes: number,
        total: number,
    },
    payment_gateway: null | {
        token: string,
        redirect_url: string
    }
}

export type TCreateTransactionPayload = {
    order_number: string
    user_id: number
    payment_method: number
    subtotal: string
    tax: number
    total: number,
    pay: number,
    items: {
        product_id: number,
        quantity: number,
        price: number,
        name: string
    }[]
}

const createTransactionService = async (p: TCreateTransactionPayload): Promise<TTransactionResult> => {
    const connection = await Database.transaction()
    
    try {
        let grossAmount = 0
        let change = 0
        let status = "pending"
        let cashReceive = 0

        const itemDetails: { 
            id: number,
            name: string,
            price: number,
            quantity: number
        }[] = []

        p.items.map(async product => {
            const res = await Database.query<TProduct|null>(`SELECT * FROM products WHERE id = ?`, [product.product_id])

            if(!res) throw new ItemNotFoundError("Product")

            grossAmount+=product.price

            itemDetails.push({
                id: res.id,
                name: res.name,
                price: res.price,
                quantity: res.quantity
            })
        })

        

        if (p.payment_method === 2) {
            cashReceive = Number(p.pay)

            if (cashReceive < grossAmount) throw new ApplicationException("Cash less then the total..", 400)

            change = cashReceive - Number(grossAmount)
            status = 'settlement'
        } else if (p.payment_method === 1) {
            const instance = Midtrans.getInstance()
    
            const param = {
                transaction_details: {
                    gross_amount: grossAmount,
                    order_id: 'trx-0'
                },
                items_details: p.items,
                enable_payments: ['gopay'],
            } as any
    
            const paymentResult = await instance.createTransaction(param)
        }


        // const result = await Database.insert([
        //     'order_number',
        //     'user_id',
        //     'payment_method',
        //     'subtotal',
        //     'tax',
        //     'total'
        // ], [
        //     p.order_number,
        //     p.user_id,
        //     p.payment_method,
        //     res.grossAmount,
        //     p.tax,
        //     res.grossAmount
        // ], 'orders')


        
        await connection.commit()
        await connection.release()

        return {
            item_details: p.items,
            payment_details: {
                cashReceive: cashReceive,
                changes: change,
                total: grossAmount
            },
            payment_gateway: null
        }
    } catch (error) {
        await connection.rollback()

        throw error
    }
}

export default createTransactionService