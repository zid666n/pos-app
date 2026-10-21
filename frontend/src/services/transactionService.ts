import api from "./api";

export type TCreateTransactionPayload = {
    payment_method: number,
    pay: number,
    items: {
        product_id: number,
        quantity: number
    }[]
}
export const createTransactionService = async (p: TCreateTransactionPayload) => await api.post('/transactions', p)