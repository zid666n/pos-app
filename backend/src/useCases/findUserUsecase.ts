import ItemNotFoundError from "../exceptions/ItemNotFoundError.ts"
import { findUser } from "../repositories/userRepository.ts"

const findUserUsecase = async (id: number) => {
    const user = await findUser(id)

    if (!user) throw new ItemNotFoundError("User")

    return user
}

export default findUserUsecase