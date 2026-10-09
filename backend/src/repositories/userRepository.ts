import type { ResultSetHeader, QueryResult } from "mysql2"
import db from "../core/databases/db.ts"
import ItemNotFoundError from "../exceptions/ItemNotFoundError.ts"

const users = [
    {
        id: 1,
        name: "Zidan",
        email: "zidan@example.com",
        status: "active",
        password: "12345"
    },
    {
        id: 2,
        name: "Ratna",
        email: "ratna@example.com",
        status: "active",
        password: "12345"
    },
    {
        id: 3,
        name: "Laras",
        email: "laras@example.com",
        status: "active",
        password: "12345"
    }
]

export type TUser = {
    id: number,
    name: string,
    email: string,
    is_active: boolean
}

export type TUserPayload = {
    name: string,
    email: string,
    status: string,
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

export const createUser = async (payload: TUserPayload): Promise<number> => {
    const res = await db.query<ResultSetHeader>(`insert into users (name, email, is_active, password) values ('${payload.name}', '${payload.email}', ${payload.status}, '${payload.password}')`)
    return res[0].insertId
}

export const updateUser = async (id: number, payload: TUserPayload): Promise<void> => {
    await db.query(`update users set name = ?, email = ?, password = ? where id = ?`, [payload.name, payload.email, payload.password, id])
}

export const deleteUser = async (id: number): Promise<void> => {
    await db.query(`delete from users where id = ?`, [id])
}