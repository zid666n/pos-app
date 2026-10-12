import type { ResultSetHeader } from "mysql2"
import db from "../../../../core/databases/db.ts"
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
    password: string
}

export const getUsers = async (): Promise<TUser[]> => {
    const [rows] = await db.query("SELECT id, name, email, is_active FROM users")

    return (rows as unknown) as TUser[]
}

export const findUser = async (id: number): Promise<TUser> => {
    const [user] = await db.query("select * from users where id = ?", [id])

    return (user as unknown) as TUser
}

export const createUser = async (payload: TUserPayload): Promise<TUser> => {
    const res = await db.query<ResultSetHeader>(`insert into users (name, email, is_active, password) values (?, ?, ?, ?)`, [payload.name, payload.email, payload.is_active, payload.password])
    
    return {
        id: res[0].insertId,
        ...payload
    }
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