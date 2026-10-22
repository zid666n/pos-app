import hashService from "../../../shared/infrastructures/services/hashService.ts"
import { updateUser, type TUser, type TUserPayload } from "../../infrastructures/repositories/userRepository.ts"

const updateUserUsecase = async (id: number, payload: TUserPayload): Promise<TUser> => {
    payload.password = (payload.password) ? await hashService(payload.password) : null

    await updateUser(id, payload)

    return {
        id: id,
        name: payload.name,
        email: payload.email,
        is_active: payload.is_active
    }
}

export default updateUserUsecase