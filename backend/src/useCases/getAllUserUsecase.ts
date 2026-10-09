import { getUsers } from "../repositories/userRepository.ts"

const getAllUserUsecase = async () => {
    return await getUsers()
}

export default getAllUserUsecase