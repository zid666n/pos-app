import { createUser, type TUser, type TUserPayload } from "../../infrastructures/repositories/userRepository.ts"

const createUserUsecase = async (payload: TUserPayload): Promise<TUser> => {
    const result = await createUser(payload)

    return result
}

export default createUserUsecase