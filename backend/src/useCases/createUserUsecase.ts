import { createUser, type TUser, type TUserPayload } from "../repositories/userRepository.ts";

const createUserUsecase = async (payload: TUserPayload): Promise<TUser> => {
    const result = await createUser(payload)

    return {
        id: result,
        name: payload.name,
        email: payload.email,
        is_active: payload.status === "active" ? true : false
    }
}

export default createUserUsecase