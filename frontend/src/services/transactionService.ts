import type { TResponseAPI } from "../lib/types/response.type";
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

export type TTransaction = {
    id: number,
    order_number: string,
    payment_method: number,
    subtotal: number,
    tax: number,
    total: number,
    pay: number,
    status: string,
    created_at: string
}
export const getTransactionService = async (): Promise<TResponseAPI<TTransaction[]>> => await api.get('/transactions')