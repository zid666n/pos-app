import type { TResponseAPI } from "../lib/types/response.type"
import api from "./api"

export type TProduct = {
    id: number,
    category_id: number,
    name: "Americano",
    quantity: number,
    price: "10000.00",
    is_active: number,
    category_name: string
}

export const allProductService = async (): Promise<TResponseAPI<TProduct[]>> => await api.get('/products')

export type TCreateProductPayload = {
    category_id: number,
    name: string,
    price: number,
    quantity: number,
    is_active: boolean
}

export const createProductService = async (payload: TCreateProductPayload) => api.post('/products', payload)

export const deleteProductService = async (id: number) => await api.delete(`/products/${id}`)