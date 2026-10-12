import { deleteUser } from "../../infrastructures/repositories/userRepository.ts"

const deleteUserUsecase = async (id: number) => {
    await deleteUser(id)
}

export default deleteUserUsecase