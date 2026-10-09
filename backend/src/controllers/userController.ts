import type { NextFunction, Request, Response } from "express"
import getAllUserUsecase from "../useCases/getAllUserUsecase.ts"
import findUserUsecase from "../useCases/findUserUsecase.ts"
import MissingParamError from "../exceptions/MissingParamError.ts"
import type { TUserPayload } from "../repositories/userRepository.ts"
import createUserUsecase from "../useCases/createUserUsecase.ts"
import deleteUserUsecase from "../useCases/deleteUserUsecase.ts"
import updateUserUsecase from "../useCases/updateUserUsecase.ts"

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllUserUsecase()

        return res
            .status(200)
            .json({
                data: result
            })
    } catch (error) {
        next(error)
    }
}

export const read = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (typeof id !== 'string') throw new MissingParamError("id")

        const result = await findUserUsecase(parseInt(id))

        return res
            .status(200)
            .json({
                data: result
            })
    } catch (error) {
        next(error)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: TUserPayload = req.body
        
        const result = await createUserUsecase(body)

        return res
            .status(200)
            .json({
                data: result
            })
    } catch (error) {
        next(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (typeof id !== 'string') throw new MissingParamError("id")
        const body: TUserPayload = req.body

        const result = await updateUserUsecase(parseInt(id), body)

        return res
            .status(200)
            .json({
                data: result
            })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        if (typeof id !== 'string') throw new MissingParamError("id")

        await deleteUserUsecase(parseInt(id))

        return res
            .status(204)
            .json({})
    } catch (error) {
        next(error)
    }
}