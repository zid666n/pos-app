import type { Request, Response } from "express"
import useLoginUsecase from "../../application/usecases/useLoginUsecase.ts"

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const authToken = await useLoginUsecase({email: email, password: password})

    return res
        .status(200)
        .json({
            data: {
                user: {
                    id: authToken.id,
                    name: authToken.name,
                    email: authToken.email,
                    is_active: authToken.is_active
                },
                token: authToken.token
            }
        })
}

export default login