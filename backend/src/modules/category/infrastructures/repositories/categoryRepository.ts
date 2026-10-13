import type { ResultSetHeader } from "mysql2"
import db from "../../../../core/databases/db.ts"

export type TCategory = {
    id: number,
    name: string,
    is_active: boolean
}

export const allCategory = async (): Promise<TCategory[]> => {
    const [rows] = await db.query("SELECT * FROM categories")

    return (rows as unknown) as TCategory[]
}

export type TCategoryPayload = {
    name: string,
    is_active?: boolean
}

export const createCategory = async (payload: TCategoryPayload): Promise<TCategory> => {
    const res = await db.query<ResultSetHeader>(
        `INSERT INTO categories (name, is_active) VALUES (?, ?)`,
        [payload.name, payload.is_active]
    )
    const resId = res[0].insertId

    return {
        id: resId,
        name: payload.name,
        is_active: payload.is_active ? true : false
    }
}

export const updateCategory = async (id: number, payload: TCategoryPayload): Promise<null|TCategory> => {
    const [res] = await db.query<ResultSetHeader>(
        `UPDATE categories SET name = ?, is_active = ? WHERE id = ?`,
        [payload.name, payload.is_active, id]
    )

    return res.affectedRows === 0 ? null : {
        id: id,
        name: payload.name,
        is_active: payload.is_active ? true : false
    }
}

export const deleteCategory = async (id: number): Promise<boolean> => {
    const [res] = await db.query<ResultSetHeader>(`DELETE FROM categories WHERE id = ?`, [id])

    return res.affectedRows > 0
}