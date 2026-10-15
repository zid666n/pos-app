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
    const users = await Database.query<TRawUser[]>(`SELECT * FROM users where email = ?`, [email])

    if (users.length === 0 || users[0] === undefined) throw new InvalidCredentialError()

    const user = users[0]
    const res = await bcrypt.compare(password, user.password)

    if (!res) throw new InvalidCredentialError()

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active
    },
    process.env.JWT_SECRET || "secret",
    {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1d"
    })

    return {
        id: user.id,
        email: user.email,
        name: user.email,
        is_active: user.is_active,
        token: token
    }
}

export default loginService