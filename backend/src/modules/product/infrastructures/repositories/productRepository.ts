import { type RowDataPacket } from "mysql2"
import db from "../../../../core/databases/db.ts"
import Database from "../../../shared/infrastructures/databases/Database.ts"

export type TProduct = {
    category_id: number,
    category_name: string,
    id: number,
    name: string,
    quantity: number,
    price: number,
    is_active: boolean
}

export const allProduct = async (): Promise<TProduct[]> => {
    const [rows] = await db.query<TProduct[] & RowDataPacket[]>(`
        SELECT products.*, categories.id as categories_id, categories.name
        as category_name FROM products
        LEFT JOIN categories 
        ON products.category_id = categories.id`
    )

    return rows
}

export const findProductById = async (id: number): Promise<TProduct|null> => {
    const [rows] = await db.query<TProduct[] & RowDataPacket[]>(`
        SELECT products.*, categories.id as categories_id, categories.name
        as category_name FROM products
        LEFT JOIN categories 
        ON products.category_id = categories.id WHERE products.id = ?
    `, [id])

    return rows.length ? rows[0] as TProduct : null
}

export type TProductPayload = {
    category_id: number,
    name: string,
    quantity: number,
    price: number,
    is_active?: boolean
}

export const createProduct = async (payload: TProductPayload): Promise<TProduct> => {
    const result = await Database.insert<TProduct>(
        ['category_id', 'name', 'quantity', 'price', 'is_active'],
        [payload.category_id, payload.name, payload.quantity, payload.price, payload.is_active ?? true],
        'products'
    )

    return result
}

export type TProductUpdatePayload = {
    name: string,
    quantity: number,
    price: number,
    is_active?: boolean
}

export const updateProduct = async (id: number, payload: TProductUpdatePayload): Promise<TProduct|null> => {
    const result = await Database.update<TProduct>(
        ['name', 'quantity', 'price', 'is_active'],
        [payload.name, payload.quantity, payload.price, payload.is_active ?? true],
        id,
        'products'
    )

    return result
}

export const deleteProduct = async(id: number): Promise<boolean> => {
    return await Database.delete(id, 'products')
}