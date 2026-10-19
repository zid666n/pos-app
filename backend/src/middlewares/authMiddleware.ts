import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../modules/shared/application/exceptions/UnauthorizedError.ts";
import jwt from "jsonwebtoken";
import BadRequestError from "../modules/shared/application/exceptions/BadRequestError.ts";
import type { TUser } from "../modules/user/infrastructures/repositories/userRepository.ts";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new BadRequestError("Missing Authorization: Bearer <token>")
        
    const token = authHeader.split(" ")[1]

    if (!token) throw new UnauthorizedError()

    const decode = jwt.verify(token, (process.env.JWT_SECRET || "secret"))
    req.user = (decode as unknown) as TUser

    next()
}

export default authMiddleware