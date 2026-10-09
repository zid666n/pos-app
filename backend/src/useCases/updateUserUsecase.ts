import { updateUser, type TUser, type TUserPayload } from "../repositories/userRepository.ts";

const updateUserUsecase = async (id: number, payload: TUserPayload): Promise<TUser> => {
    await updateUser(id, payload)

    return {
        id: id,
        name: payload.name,
        email: payload.email,
        is_active: payload.status === "active" ? true : false
    }
}

export default updateUserUsecase