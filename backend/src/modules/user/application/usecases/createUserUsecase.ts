import hashService from "../../../shared/infrastructures/services/hashService.ts"
import { createUser, type TUser, type TUserPayload } from "../../infrastructures/repositories/userRepository.ts"

const createUserUsecase = async (payload: TUserPayload & {password: string}): Promise<TUser> => {
    payload.password = await hashService(payload.password)

    const result = await createUser(payload)

    return result
}

export default createUserUsecase