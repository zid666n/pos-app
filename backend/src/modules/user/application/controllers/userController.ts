import type { NextFunction, Request, Response } from "express"
import MissingParamError from "../../../shared/application/exceptions/MissingParamError.ts"
import type { TUserPayload } from "../../infrastructures/repositories/userRepository.ts"
import findUserUsecase from "../usecases/findUserUsecase.ts"
import createUserUsecase from "../usecases/createUserUsecase.ts"
import updateUserUsecase from "../usecases/updateUserUsecase.ts"
import deleteUserUsecase from "../usecases/deleteUserUsecase.ts"
import getAllUserUsecase from "../usecases/getAllUserUsecase.ts"

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