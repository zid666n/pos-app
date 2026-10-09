import type { NextFunction, Request, Response } from "express"
import InvalidCredentialError from "../exceptions/InvalidCredentialError.ts"

const usersDummy = [
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

const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body

        const user = usersDummy.find(item => item.email === email && item.password === password)
    
        if (!user) throw new InvalidCredentialError()
    
        return res
            .status(200)
            .json({
                data: {
                    user: {
                        ...user
                    },
                    token: `fake-jwt-token-${Date.now()}`
                }
            })
    } catch (error) {
        next(error)
    }
}

export default login