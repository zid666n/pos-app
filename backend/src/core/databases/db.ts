import dotenv from "dotenv"
import mysql, {type Pool} from "mysql2/promise"

dotenv.config()

const db: Pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

try {
    const connection = await db.getConnection()
    connection.release()

} catch (error) {
    console.log("Connection Failed", error)
}

export default db