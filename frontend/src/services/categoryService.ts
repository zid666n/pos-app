import type { TResponseAPI } from "../lib/types/response.type"
import api from "./api"

export type TCategory = {
    id: number,
    name: string,
    is_active: boolean
}

export const allCategoryService = async (): Promise<TResponseAPI<TCategory[]>> => await api.get('/categories')

export type TCreateCategoryPayload = {
    name: string,
    is_active: boolean
}

export const createCategoryService = async (payload: TCreateCategoryPayload) => await api.post('/categories', payload) 

export type TUpdateCategoryPayload = {
    id: number,
    name: string,
    is_active: boolean
}

export const updateCategoryService = async (payload: TUpdateCategoryPayload) => await api.put(`/categories/${payload.id}`, {name: payload.name, is_active: payload.is_active})

export const deleteCategoryService = async (id: number) => await api.delete(`/categories/${id}`)