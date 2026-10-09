import { deleteUser } from "../repositories/userRepository.ts"

const deleteUserUsecase = async (id: number) => {
    await deleteUser(id)
}

export default deleteUserUsecase