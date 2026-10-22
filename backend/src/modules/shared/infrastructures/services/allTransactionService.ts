import Database from "../databases/Database.ts"
export type TOrder = {
    order_number: string,
    payment_method: string,
    subtotal: number,
    tax: number,
    total: number,
    pay: number,
    status: string
}

const allTransactionService = async (): Promise<TOrder[]> => {
    const res = await Database.query<TOrder[]>(`
        SELECT 
            orders.id AS order_id,
            orders.order_number,
            orders.payment_method,
            orders.subtotal,
            orders.pay,
            orders.tax,
            orders.total,   
            order_details.id AS order_detail_id,
            order_details.quantity,
            order_details.price AS order_detail_price,
            order_details.created_at AS detail_created_at,
            products.id AS product_id,
            products.name AS product_name,
            products.category_id AS product_category_id
        FROM 
            orders
        LEFT JOIN 
            order_details ON orders.id = order_details.order_id
        LEFT JOIN 
            products ON order_details.product_id = products.id
    `, ['orders'])

    return res
}

export default allTransactionService