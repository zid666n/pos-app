import bcrypt from "bcrypt"
import prisma from "../prisma.ts"

export const userSeeder = async () => {
    const password = await bcrypt.hash("1245678", 10)
    await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@example.com',
            password: password
        }
    })

    console.log("User seed!")
}