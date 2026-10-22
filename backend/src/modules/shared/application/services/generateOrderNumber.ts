import Database from "../../infrastructures/databases/Database.ts"

type TOrderNumber = {
    id: number,
    order_number: string
}

const generateOrderNumber = async (): Promise<string> => {
    const res = await Database.query<[TOrderNumber|null]>(`
        SELECT id, order_number
        FROM ??
        ORDER BY id
        DESC LIMIT 1    
    `, ['orders'])

    const order = res[0]

    if (!order) {
        return 'trx-0001'
    } else {
        const orderNumber = Number(order.order_number.split('-')[1]) + 1.

        return `trx-${String(orderNumber).padStart(4, '0')}`
    }
}

export default generateOrderNumber