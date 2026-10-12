import { getUsers } from "../../infrastructures/repositories/userRepository.ts"

const getAllUserUsecase = async () => {
    return await getUsers()
}

export default getAllUserUsecase