import type { TResponseAPI } from "../lib/types/response.type"
import api from "./api"

export type TLoginPayload = {
    email: string,
    password: string
} 

export type TAuthUser = {
    user: {
        id: number,
        name: string,
        email: string,
        is_active: boolean,
    }
    token: string
}

export const loginService = async ({email, password}: TLoginPayload): Promise<TResponseAPI<TAuthUser>> => api.post('/auth/login', {
    email: email,
    password: password
})