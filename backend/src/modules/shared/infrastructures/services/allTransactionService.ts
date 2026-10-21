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
    const res = await Database.query<TOrder[]>('SELET * FROM ??', ['orders'])

    return res
}

export default allTransactionService