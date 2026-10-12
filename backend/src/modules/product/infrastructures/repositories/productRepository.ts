import { type RowDataPacket } from "mysql2"
import db from "../../../../core/databases/db.ts"

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
    const [rows] = await db.query(`
        SELECT products.*, categories.id as categories_id, categories.name
        as category_name FROM products
        LEFT JOIN categories 
        ON products.category_id = categories.id`
    )

    return (rows as unknown) as TProduct[]
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
    
}

// export const updateProduct = ()