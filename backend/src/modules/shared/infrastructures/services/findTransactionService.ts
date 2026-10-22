import Database from "../databases/Database.ts"

type TOrder = {
    order_id: number,
    order_number: string,
    payment_method: string,
    tax: number,
    subtotal: number,
    total: number,
}

type TOrderDetail = {
    order_detail_id: number,
    quantity: number,
    price: number
}

type TProduct = {
    product_id: number,
    name: string
}

const findTransactionService = async (id: number) => {
    const res = await Database.query<(TOrder & TOrderDetail & TProduct)[]>(`
        SELECT
            orders.id AS order_id,
            orders.order_number,
            orders.payment_method,
            orders.total,
            orders.subtotal,
            orders.tax,

            order_details.id AS order_detail_id,
            order_details.order_id,
            order_details.product_id,
            order_details.quantity,
            order_details.price,

            products.id AS product_id,
            products.name
        FROM
            ??
        LEFT JOIN
            order_details ON orders.id = order_details.order_id
        LEFT JOIN
            products ON order_details.product_id = products.id
        WHERE
            orders.id = ?
    `,
    [
        'orders',
        id
    ])

    return res.reduce((acc: (TOrder & TOrderDetail & TProduct)[]|any[], row) => {
        let order = acc.find(o => o.order_id === row.order_id);

        if (!order) {
            order = {
                order_id: row.order_id,
                order_number: row.order_number,
                payment_method: row.payment_method,
                total: row.total,
                subtotal: row.subtotal,
                tax: row.tax,
                items: []
            };
            acc.push(order);
        }

        if (row.order_detail_id) {
            order.items.push({
                order_detail_id: row.order_detail_id,
                product_id: row.product_id,
                name: row.name,
                quantity: row.quantity,
                price: row.price
            });
        }

        return acc;
    }, []);
}

export default findTransactionService