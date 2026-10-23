import prisma from "../../../../core/databases/prisma.ts"
import InvalidCredentialError from "../../application/exceptions/InvalidCredentialError.ts"
import Database from "../databases/Database.ts"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export type TLoginPayload = {
    email: string,
    password: string
}

type TRawUser = {
    id: number,
    name: string,
    email: string,
    password: string,
    is_active: boolean
}

type TAuthUser = {
    id: number,
    name: string,
    email: string,
    is_active: boolean,
    token: string
}

const loginService = async ({email, password}: TLoginPayload): Promise<TAuthUser> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    // const users = await Database.query<TRawUser[]>(`SELECT * FROM users where email = ?`, [email])

    if (!user) throw new InvalidCredentialError()

    const res = await bcrypt.compare(password, user.password)

    if (!res) throw new InvalidCredentialError()

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    },
        process.env.JWT_SECRET || "secret",
    {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1d"
    })

    return {
        id: user.id,
        email: user.email,
        name: user.email,
        is_active: true,
        token: token
    }
}

export default loginService