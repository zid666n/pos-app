import type { TResponseAPI } from "../lib/types/response.type"
import api from "./api"

export type TUserPayload = {
    name: string,
    email: string,
    password: string,
    is_active: boolean
}

export type TUsers = {
    id: number,
    name: string,
    email: string,
    is_active: boolean
}

export const createUserService = async (payload: TUserPayload) => await api.post('users', {...payload})

export const getUserService = async (): Promise<TResponseAPI<TUsers[]>> => await api.get('/users')

export type TDeleteUserPayload = {
    id: number,
    name: string,
    email: string,
    is_active: boolean,
    password: string
}

export const updateUserService = async (id: number, payload: TUserPayload) => await api.put(`/users/${id}`, payload)

export const deleteUserService = async (id: number): Promise<void> => await api.delete(`/users/${id}`)