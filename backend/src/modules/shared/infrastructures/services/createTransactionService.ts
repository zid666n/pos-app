import type { RowDataPacket } from "mysql2"
import Database from "../databases/Database.ts"
import { TProduct } from "../../../product/infrastructures/repositories/productRepository.ts"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError.ts"

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

        const parameter = {
            transaction_details: {
                gross_amount: p.total
            },
            item_details: itemDetails,
            enable_payments: ['gopay']
        }

        // const res = await Database.insert([
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
        //     p.subtotal,
        //     p.tax,
        //     p.total
        // ], 'orders')


        
        await Database.commit()
    } catch (error) {
        await Database.rollback()
    }
}

export default createTransactionService