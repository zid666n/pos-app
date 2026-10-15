import Database from "../../../shared/infrastructures/databases/Database.ts"

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

export const createTransaction = async (p: TCreateTransactionPayload) => {
    try {
        await Database.transaction()
        
        const res = await Database.insert([
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
            p.subtotal,
            p.tax,
            p.total
        ], 'orders')



        await Database.commit()
    } catch (error) {
        await Database.rollback()
    } 
}