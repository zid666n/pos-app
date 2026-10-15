import db from "../../../../core/databases/db.ts"
import type { ResultSetHeader, RowDataPacket } from "mysql2"

class Database 
{
    static pool = db

    static async select<T>(fields: string[], table: string): Promise<T>
    {
        const columns = fields.map(() => '??').join(', ')

        const [res] = await this.pool.query<T & RowDataPacket[]>(`
            SELECT ${columns} FROM ??    
        `, [...fields, table])

        return res
    }

    static async insert<T>(fields: string[], values: (string | boolean|number)[], table: string): Promise<T>
    {
        const columns = fields.map(() => '??').join(', ')
        const vals = values.map(() => '?').join(', ')

        const res = await this.pool.query<ResultSetHeader>(`
            INSERT INTO ?? (${columns}) VALUES (${vals})
        `, [table, ...fields,...values])

        const data = this.#makeData(fields, values)
        data.id = res[0].insertId

        return data as T
    }

    static async insertMany<T>(fields: string[], values: (string|number|boolean)[][], table: string): Promise<T> {
        const [res] = await this.pool.query<ResultSetHeader>(
            `INSERT INTO ?? (??) VALUES ?`,
            [table, fields, values]
        )

        return values.map((item, index) => ({
            ...this.#makeData(fields, item),
            id: res.insertId + index,
        })) as T
    }

    static async update<T>(fields: string[], values: (string | boolean|number)[], id: number, table: string): Promise<T|null>
    {
        const columns = fields.map(col => `${col} = ?`).join(', ')

        const res = await db.query<ResultSetHeader>(
            `UPDATE ?? SET ${columns} WHERE id = ?`
        , [table, ...values, id])

        if (res[0].affectedRows === 0) return null

        const data = this.#makeData(fields, values)
        data.id = id

        return data as T
    }

    static async delete(id: number, table: string): Promise<boolean>
    {
        const [res] = await db.query<ResultSetHeader>(`DELETE FROM ?? WHERE id = ?`, [table, id])

        return res.affectedRows > 0
    }

    static async query<T>(query: string, values: (string|number|boolean)[]): Promise<T> {
        const [res] = await this.pool.query<T & RowDataPacket[]>(query, values)

        return res
    }

    static async transaction() {
        return await this.pool.beginTransaction()
    }

    static async release() {
        return (await this.pool.getConnection()).release()
    }

    static async rollback() {
        return await this.pool.rollback()
    }

    static async commit() {
        return await this.pool.commit()
    }

    static #makeData(fields: string[], values: (string|number|boolean)[])
    {
        const data: Record<string, string|number|boolean> = {}

        for(let i = 0; i < fields.length; i++) {
            const field = fields[i]
            const val = values[i]

            if (field !== undefined && val !== undefined) {
                data[field] = val
            }
        }

        return data
    }
}

export default Database