import type { ResultSetHeader, RowDataPacket } from "mysql2"
import db from "../../../../core/databases/db.ts"
import Database from "../../../shared/infrastructures/databases/Database.ts"
export type TUser = {
    id: number,
    name: string,
    email: string,
    is_active: boolean
}

export type TUserPayload = {
    name: string,
    email: string,
    is_active: boolean,
    password: string|null
}

export const getUsers = async (): Promise<TUser[]> => {
    const rows = await Database.select<TUser[]>(['id', 'name', 'email', 'is_active'], 'users')

    return rows
}

export const findUser = async (id: number): Promise<TUser> => {
    const [user] = await db.query("select * from users where id = ?", [id])

    return (user as unknown) as TUser
}

export const createUser = async (payload: TUserPayload & {password: string}): Promise<TUser> => {
    const res = await Database.insert<TUser>(['name', 'email', 'is_active', 'password'], [payload.name, payload.email, payload.is_active, payload.password], 'users')
    
    return res
}

export const updateUser = async (id: number, payload: TUserPayload): Promise<void> => {
    await db.query(`
        UPDATE users SET
            name = ?,
            email = ?,
            password = IF(? = '' OR ? IS NULL, password, ?),
            is_active = ?
        where id = ?`,
        [
            payload.name,
            payload.email,
            payload.password,
            payload.password,
            payload.password,
            payload.is_active,
            id
        ]
    )
}

export const deleteUser = async (id: number): Promise<void> => {
    await db.query(`delete from users where id = ?`, [id])
}